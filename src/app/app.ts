import { ChangeDetectionStrategy, Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { GoogleGenAI } from "@google/genai";
import { 
  MARKETS, FIELD_GROUPS, COMP_DATA, AUDIT_DATA, JOBS_DATA, SUBMISSIONS_DATA, PROMPTS, SNIPPETS,
  Market, FieldGroup, ComparisonRow, AuditEntry, Job, Submission
} from './services/data';

interface TestResult {
  value: string;
  snippet: string;
  confidence: number;
}

interface ExtractionResult {
  field: string;
  value: string;
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-root',
  imports: [CommonModule, FormsModule, MatIconModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  private _ai: GoogleGenAI | null = null;
  private get ai(): GoogleGenAI {
    if (!this._ai) {
      if (typeof GEMINI_API_KEY === 'undefined' || !GEMINI_API_KEY) {
        throw new Error('GEMINI_API_KEY is not defined. Please set it in your environment/secrets.');
      }
      this._ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });
    }
    return this._ai;
  }

  // Navigation State
  activeTab = signal<string>('overview');
  
  // Data State
  markets = signal<Market[]>(MARKETS);
  fieldGroups = signal<FieldGroup[]>(FIELD_GROUPS);
  compData = signal<ComparisonRow[]>(COMP_DATA);
  auditData = signal<AuditEntry[]>(AUDIT_DATA);
  jobsData = signal<Job[]>(JOBS_DATA);
  
  // Selection State
  activeMarket = signal<Market>(MARKETS.find(m => m.name.includes('NICE')) || MARKETS[0]);
  activeField = signal<string>('Assessment outcome');
  selectedRow = signal<ComparisonRow | null>(null);
  
  // Filter State
  searchQuery = signal<string>('');
  filterRec = signal<'all' | 'keep' | 'replace' | 'review'>('all');
  
  // UI State
  drawerOpen = signal<boolean>(false);
  marketDropdownOpen = signal<boolean>(false);
  htaMarketDropdownOpen = signal<boolean>(false);
  validatorMarketDropdownOpen = signal<boolean>(false);
  notification = signal<{ msg: string; show: boolean }>({ msg: '', show: false });
  testResult = signal<TestResult | null>(null);
  isTesting = signal<boolean>(false);
  
  // Prompt Editor State
  promptText = signal<string>('');
  activeVersion = signal<string>('v3');

  // Input State for Validation
  documentUrl = signal<string>('');
  documentText = signal<string>('');
  assessedPopulation = signal<string>('');
  isExtracting = signal<boolean>(false);
  extractionResults = signal<ExtractionResult[] | null>(null);

  // Results Selection State
  selectedJobId = signal<string | null>(null);
  selectedSubmissionId = signal<string | null>(null);
  submissionsData = signal<Submission[]>(SUBMISSIONS_DATA);

  constructor() {
    this.updatePrompt();
    // Initialize selectedJobId if jobs exist for the default market
    const initialJobs = this.jobsData().filter(j => j.market === this.activeMarket().name);
    if (initialJobs.length > 0) {
      this.selectedJobId.set(initialJobs[0].id);
      const initialSubs = this.submissionsData().filter(s => s.jobId === initialJobs[0].id);
      if (initialSubs.length > 0) {
        this.selectedSubmissionId.set(initialSubs[0].id);
      }
    }
  }

  private getPrompt(marketName: string, fieldName: string): string {
    const marketPrompts = PROMPTS[marketName];
    if (marketPrompts && marketPrompts[fieldName]) {
      return marketPrompts[fieldName];
    }
    return PROMPTS['Default'][fieldName] || `Extract the "${fieldName}" field from the HTA document.\n\nProvide a concise, accurate value based on the document content.\n\n{{DOCUMENT_TEXT}}`;
  }

  public updatePrompt() {
    let prompt = this.getPrompt(this.activeMarket().name, this.activeField());
    
    // Include Assessed Population constraint if provided
    if (this.assessedPopulation()) {
      prompt = `CONTEXT: The user is specifically interested in the assessed population: "${this.assessedPopulation()}". \n\nINSTRUCTION: Extract data ONLY for this specific population. If the document contains multiple populations, ignore others.\n\n` + prompt;
    }
    
    // Ensure English output is explicitly requested for all markets
    const englishRequirement = "\n\nIMPORTANT: Provide the output ONLY in English. If the source text is in another language, translate the extracted information into English accurately.";
    
    if (!prompt.includes("ONLY in English")) {
      prompt += englishRequirement;
    }
    
    // Replace placeholder with actual text if available
    if (this.documentText()) {
      prompt = prompt.replace('{{DOCUMENT_TEXT}}', `DOCUMENT CONTENT:\n${this.documentText()}`);
    } else {
      prompt = prompt.replace('{{DOCUMENT_TEXT}}', '(No document text provided yet)');
    }
    
    this.promptText.set(prompt);
  }

  // Computed Values
  filteredJobs = computed(() => {
    const market = this.activeMarket().name;
    return this.jobsData().filter(j => j.market === market);
  });

  currentSubmissions = computed(() => {
    const jobId = this.selectedJobId();
    if (!jobId) return [];
    return this.submissionsData().filter(s => s.jobId === jobId);
  });

  activeSubmission = computed(() => {
    const subId = this.selectedSubmissionId();
    if (!subId) return null;
    return this.submissionsData().find(s => s.id === subId) || null;
  });

  activeMarketFields = computed(() => {
    const marketName = this.activeMarket().name;
    const baseFields = this.fieldGroups().flatMap(g => g.fields);
    const marketPrompts = PROMPTS[marketName] || {};
    const marketSpecificFields = Object.keys(marketPrompts);
    
    // Combine them and ensure uniqueness
    const combined = Array.from(new Set([...baseFields, ...marketSpecificFields]));
    return combined;
  });

  fullComparisonData = computed(() => {
    const submission = this.activeSubmission();
    const submissionFields = submission?.fields || [];
    
    // Create a map for quick lookup
    const fieldMap = new Map<string, ComparisonRow>();
    submissionFields.forEach(f => fieldMap.set(f.field, f));
    
    const allFields: ComparisonRow[] = [];
    
    this.fieldGroups().forEach(group => {
      group.fields.forEach(fieldName => {
        const existing = fieldMap.get(fieldName);
        if (existing) {
          allFields.push(existing);
        } else {
          // Create a placeholder row for missing fields
          allFields.push({
            field: fieldName,
            group: group.group,
            yours: '—',
            ai: '—',
            conf: 0,
            rec: 'review'
          });
        }
      });
    });
    
    return allFields;
  });

  filteredCompData = computed(() => {
    const query = this.searchQuery().toLowerCase();
    const filter = this.filterRec();
    const data = this.fullComparisonData();
    
    return data.filter(row => {
      const matchesSearch = row.field.toLowerCase().includes(query) || 
                            row.yours.toLowerCase().includes(query) || 
                            row.ai.toLowerCase().includes(query);
      const matchesFilter = filter === 'all' || row.rec === filter;
      return matchesSearch && matchesFilter;
    });
  });

  activeSnippet = computed(() => {
    return SNIPPETS[this.activeField()] || `"The HTA committee reviewed evidence submitted by the manufacturer regarding <mark>${this.activeField().toLowerCase()}</mark> for the assessed product in the indicated population..."`;
  });

  // Actions
  switchTab(tab: string) {
    this.activeTab.set(tab);
  }

  selectMarket(market: Market) {
    this.activeMarket.set(market);
    this.marketDropdownOpen.set(false);
    this.htaMarketDropdownOpen.set(false);
    this.validatorMarketDropdownOpen.set(false);
    this.updatePrompt();
    this.showNotification(`Loaded: ${market.name}`);
  }

  selectMarketByName(name: string) {
    const market = this.markets().find(m => m.name === name);
    if (market) {
      this.selectMarket(market);
      // Reset job selection for the new market
      const marketJobs = this.jobsData().filter(j => j.market === market.name);
      if (marketJobs.length > 0) {
        this.selectJob(marketJobs[0].id);
      } else {
        this.selectedJobId.set(null);
        this.selectedSubmissionId.set(null);
      }
    }
  }

  selectJob(jobId: string) {
    this.selectedJobId.set(jobId);
    const subs = this.submissionsData().filter(s => s.jobId === jobId);
    if (subs.length > 0) {
      this.selectedSubmissionId.set(subs[0].id);
    } else {
      this.selectedSubmissionId.set(null);
    }
  }

  selectSubmission(subId: string) {
    this.selectedSubmissionId.set(subId);
  }

  toggleMarketDropdown() {
    this.marketDropdownOpen.update(v => !v);
  }

  selectField(field: string) {
    this.activeField.set(field);
    this.updatePrompt();
    this.testResult.set(null);
  }

  selectVersion(ver: string) {
    this.activeVersion.set(ver);
    this.showNotification(`Loaded prompt ${ver}`);
  }

  async runPromptTest() {
    if (!this.documentText()) {
      this.showNotification('⚠ Please provide document text to test the prompt');
      return;
    }

    this.isTesting.set(true);
    this.testResult.set(null);
    
    try {
      const response = await this.ai.models.generateContent({
        model: "gemini-flash-latest",
        contents: this.promptText(),
      });
      
      if (!response.text) throw new Error('No response text from Gemini');

      this.testResult.set({
        value: response.text,
        snippet: `AI simulated reasoning: The document text contains explicit mentions of the ${this.activeField()} values which were successfully captured using current prompt configuration.`,
        confidence: 98
      });
      this.showNotification('✓ Prompt test successful');
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      console.error('Test Error:', error);
      this.showNotification(`Error: ${errorMessage}`);
    } finally {
      this.isTesting.set(false);
    }
  }

  openDrawer(row: ComparisonRow) {
    this.selectedRow.set(row);
    this.activeField.set(row.field);
    this.updatePrompt();
    this.drawerOpen.set(true);
  }

  closeDrawer() {
    this.drawerOpen.set(false);
  }

  acceptDecision(type: 'keep' | 'override' | 'replace') {
    this.closeDrawer();
    this.showNotification(type === 'keep' ? '✓ Decision accepted' : '✎ Override saved to audit log');
  }

  acceptRow(row: ComparisonRow) {
    this.showNotification(`✓ Accepted: ${row.field}`);
  }

  showNotification(msg: string) {
    this.notification.set({ msg, show: true });
    setTimeout(() => {
      this.notification.set({ msg: '', show: false });
    }, 3000);
  }

  triggerBulkUpload() {
    this.showNotification('📊 Bulk upload triggered — mapping columns...');
  }

  async startSingleValidation() {
    if (!this.documentText()) {
      this.showNotification('⚠ Please provide document text for extraction');
      return;
    }
    
    this.isExtracting.set(true);
    this.extractionResults.set(null);
    
    const market = this.activeMarket().name;
    const pop = this.assessedPopulation() || 'General Population';
    this.showNotification(`▶ Extracting ${market} data for: ${pop}`);
    
    console.log(`[HTA Extractor] Starting extraction for ${market}...`);
    
    try {
      const fields = this.activeMarketFields();
      if (!fields || fields.length === 0) {
        throw new Error('No fields defined for this market to extract.');
      }

      const results: ExtractionResult[] = [];
      
      const extractionPrompt = `
        You are an expert Health Technology Assessment (HTA) data extractor. 
        Extract the following fields from the provided document text for the market: ${market}.
        Population of interest: ${pop}.
        
        FIELDS TO EXTRACT:
        ${fields.join(', ')}
        
        DOCUMENT TEXT:
        ${this.documentText()}
        
        OUTPUT FORMAT:
        Provide a JSON object where keys are the field names exactly as listed above, and values are the extracted strings. 
        If a field is not found or cannot be determined, use "Not found".
        Return ONLY the raw JSON object. Do not include markdown formatting or extra text.
      `;

      console.log('[HTA Extractor] Sending prompt to Gemini...', { fieldCount: fields.length });

      const response = await this.ai.models.generateContent({
        model: "gemini-flash-latest",
        contents: extractionPrompt,
        config: {
          responseMimeType: "application/json"
        }
      });
      
      const text = response.text;
      if (!text) {
        throw new Error('No response text received from Gemini AI.');
      }

      console.log('[HTA Extractor] Response received:', text.substring(0, 200) + '...');

      // Robust JSON extraction
      let jsonText = text.trim();
      const firstBrace = jsonText.indexOf('{');
      const lastBrace = jsonText.lastIndexOf('}');
      
      if (firstBrace !== -1 && lastBrace !== -1) {
        jsonText = jsonText.substring(firstBrace, lastBrace + 1);
      }
      
      let extractedData: Record<string, string>;
      try {
        extractedData = JSON.parse(jsonText);
      } catch (parseError) {
        console.error('[HTA Extractor] JSON Parse failed. Text:', jsonText);
        throw new Error('Failed to parse AI response as JSON logic. Please try a cleaner document text.');
      }
      
      fields.forEach(field => {
        results.push({
          field,
          value: extractedData[field] || 'Not found'
        });
      });

      console.log(`[HTA Extractor] Successfully mapped ${results.length} fields.`);
      this.extractionResults.set(results);
      this.showNotification('✓ Extraction complete');
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      console.error('[HTA Extractor Error]:', error);
      this.showNotification(`Error: ${errorMessage}`);
      
      // Fallback for demo purposes if it keeps failing with real keys
      // this.extractionResults.set(this.getMockResults()); 
    } finally {
      this.isExtracting.set(false);
    }
  }

  sendToValidator() {
    const results = this.extractionResults();
    if (!results) return;

    const market = this.activeMarket().name;
    const prodField = results.find(r => r.field === 'Brand Name')?.value || 'New Product';
    const popField = results.find(r => r.field === 'Assessed population')?.value || this.assessedPopulation() || 'Target Population';

    // Create a new Job
    const jobId = `job-new-${Date.now()}`;
    const newJob: Job = {
      id: jobId,
      name: `extracted_${market.toLowerCase()}.xlsx`,
      type: 'Bulk',
      market: market,
      prog: 100,
      status: 'review',
      rows: 1,
      time: 'Just now'
    };

    // Create ComparisonRows
    const compRows: ComparisonRow[] = results.map(r => {
      const group = this.fieldGroups().find(g => g.fields.includes(r.field))?.group || 'Uncategorized';
      return {
        field: r.field,
        group: group,
        yours: '—', // In a real app we might have baseline data
        ai: r.value,
        conf: Math.floor(Math.random() * 20) + 80, // Simulation
        rec: 'keep'
      };
    });

    // Create Submission
    const subId = `sub-new-${Date.now()}`;
    const newSubmission: Submission = {
      id: subId,
      jobId: jobId,
      product: prodField,
      population: popField,
      status: 'review',
      matchRate: 94,
      fields: compRows
    };

    // Update global state
    this.jobsData.update(prev => [newJob, ...prev]);
    this.submissionsData.update(prev => [newSubmission, ...prev]);
    
    // Switch to Results tab and select the new job/submission
    this.selectJob(jobId);
    this.selectedSubmissionId.set(subId);
    this.switchTab('results');
    
    this.showNotification('✓ Data promotes to validator successfully');
  }

  exportExtractionResults() {
    const results = this.extractionResults();
    if (!results) return;
    
    const market = this.activeMarket().name;
    const date = new Date().toISOString().split('T')[0];
    const filename = `HTA_Extraction_${market.replace(/\s+/g, '_')}_${date}.csv`;
    
    // Create CSV content
    const header = 'Field Name,AI Generated Output\n';
    const rows = results.map(r => {
      const field = (r.field || '').replace(/"/g, '""');
      const value = (r.value || '').replace(/"/g, '""');
      return `"${field}","${value}"`;
    }).join('\n');
    
    const csvContent = header + rows;
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    this.showNotification(`✓ Exported ${market} template successfully`);
  }

  resetExtraction() {
    this.extractionResults.set(null);
    this.documentUrl.set('');
    this.assessedPopulation.set('');
  }

  exportData() {
    this.showNotification('⬇ Exporting validated dataset...');
  }
}
