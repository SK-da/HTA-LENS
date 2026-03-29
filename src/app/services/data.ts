export interface Market {
  name: string;
  country: string;
  flag: string;
  status: 'ok' | 'warn' | 'err';
  fields: number;
  ver: string;
}

export interface FieldGroup {
  group: string;
  fields: string[];
}

export interface ComparisonRow {
  field: string;
  group: string;
  yours: string;
  ai: string;
  conf: number;
  rec: 'keep' | 'replace' | 'review';
}

export interface AuditEntry {
  ts: string;
  field: string;
  decision: string;
  by: string;
  type: 'accept' | 'override' | 'replace';
}

export interface Job {
  id: string;
  name: string;
  type: 'Bulk' | 'URL';
  market: string;
  prog: number;
  status: 'review' | 'done' | 'running';
  rows: number;
  time: string;
}

export interface Submission {
  id: string;
  jobId: string;
  product: string;
  population: string;
  status: 'review' | 'done';
  matchRate: number;
  fields: ComparisonRow[];
}

export const MARKETS: Market[] = [
  { name: 'AEMPS', country: 'Spain', flag: '🇪🇸', status: 'ok', fields: 60, ver: 'v3.2' },
  { name: 'AIFA', country: 'Italy', flag: '🇮🇹', status: 'ok', fields: 60, ver: 'v3.2' },
  { name: 'INAMI', country: 'Belgium', flag: '🇧🇪', status: 'ok', fields: 60, ver: 'v3.2' },
  { name: 'CDA-AMC', country: 'Canada', flag: '🇨🇦', status: 'ok', fields: 60, ver: 'v3.2' },
  { name: 'CHUIKYO', country: 'Japan', flag: '🇯🇵', status: 'ok', fields: 60, ver: 'v3.2' },
  { name: 'CONITEC', country: 'Brazil', flag: '🇧🇷', status: 'ok', fields: 60, ver: 'v3.2' },
  { name: 'DMC', country: 'Denmark', flag: '🇩🇰', status: 'ok', fields: 60, ver: 'v3.2' },
  { name: 'fimea', country: 'Finland', flag: '🇫🇮', status: 'ok', fields: 60, ver: 'v3.2' },
  { name: 'G-BA', country: 'Germany', flag: '🇩🇪', status: 'ok', fields: 60, ver: 'v3.2' },
  { name: 'HAS', country: 'France', flag: '🇫🇷', status: 'ok', fields: 60, ver: 'v3.2' },
  { name: 'HIRA', country: 'South Korea', flag: '🇰🇷', status: 'ok', fields: 60, ver: 'v3.2' },
  { name: 'ICER', country: 'USA', flag: '🇺🇸', status: 'ok', fields: 60, ver: 'v3.2' },
  { name: 'NCPE', country: 'Ireland', flag: '🇮🇪', status: 'ok', fields: 60, ver: 'v3.2' },
  { name: 'MOH', country: 'Israel', flag: '🇮🇱', status: 'ok', fields: 60, ver: 'v3.2' },
  { name: 'ZINL', country: 'Netherlands', flag: '🇳🇱', status: 'ok', fields: 60, ver: 'v3.2' },
  { name: 'PBAC', country: 'Australia', flag: '🇦🇺', status: 'ok', fields: 60, ver: 'v3.2' },
  { name: 'AOTMIT', country: 'Poland', flag: '🇵🇱', status: 'ok', fields: 60, ver: 'v3.2' },
  { name: 'ACE', country: 'Singapore', flag: '🇸🇬', status: 'ok', fields: 60, ver: 'v3.2' },
  { name: 'NHI', country: 'Taiwan', flag: '🇹🇼', status: 'ok', fields: 60, ver: 'v3.2' },
  { name: 'TLV', country: 'Sweden', flag: '🇸🇪', status: 'ok', fields: 60, ver: 'v3.2' },
  { name: 'NICE', country: 'England', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', status: 'ok', fields: 60, ver: 'v3.2' },
  { name: 'SMC', country: 'Scotland', flag: '🏴󠁧󠁢󠁳󠁣󠁴󠁿', status: 'ok', fields: 60, ver: 'v3.2' },
];

export const FIELD_GROUPS: FieldGroup[] = [
  { group: 'Core Identity', fields: ['Product ID', 'Brand Name', 'INN Name', 'Manufacturer'] },
  { group: 'Assessment Metadata', fields: ['Assessed population (Short form)', 'Assessed population', 'Line of treatment', 'Initial Assessment or Reassessment', 'Assessment Status', 'Date of Assessment', 'Publication date', 'PDF web link', 'Web Link'] },
  { group: 'Outcomes & Recommendations', fields: ['Assessment outcome', 'Recommended population', 'Recommended line of treatment', 'Monotherapy / Combination', 'Comments', 'Patient Organisation Inputs', 'Clinical Experts Inputs', 'Target patient population', 'Decision drivers highlighted by payer', 'Drawbacks or limitations highlighted by payer', 'Other factors involved'] },
  { group: 'Clinical Evidence', fields: ['Clinical evidence submitted summary', 'Pivotal trials included in submission', 'Results Presented/Discussed - Primary Endpoint', 'Results Presented/Discussed Secondary Endpoints', 'Results Presented/Discussed HRQoL', 'Results Presented/Discussed Safety', 'Clinical Comparator presented by company', 'Clinical Comparator accepted by HTA body', 'Was the outcome considered clinically meaningful and how was this viewed in HTA?', 'QoL measure considered?', 'QoL scale/ evidence submitted', 'ITC considered?', 'ITC evidence submitted', 'Systematic review considered?', 'Systematic review Conducted?', 'RWE considered?', 'RWE evidence submitted', 'Additional evidence requested by payer', "Manufacturer Responses on the request for additional data submission/ Manufacturer's comments/ thoughts"] },
  { group: 'Health Economics', fields: ['Price of brand', 'Price to be reduced to become cost-effective', 'Type of economic analysis submitted', 'Type of economic model submitted', 'Economic model description', 'Economic Comparator', 'Model Inputs', 'ICER estimates/ICUR estimates/ Cost per QALY', 'Other Model Outputs', 'Cost Effective (Yes/No)', 'Strengths of economic model', 'Challenges of economic model', 'Key sources of uncertainty', 'Budget Impact'] },
  { group: 'Diagnostics & Biomarkers', fields: ['Mutation', 'Companion Diagnostic', 'Reimbursement status of Companion diagnostic'] },
];

export const COMP_DATA: ComparisonRow[] = [
  { field: 'Brand Name', group: 'Core Identity', yours: 'Pembrolizumab', ai: 'Pembrolizumab', conf: 99, rec: 'keep' },
  { field: 'INN Name', group: 'Core Identity', yours: 'Pembrolizumab', ai: 'Pembrolizumab', conf: 99, rec: 'keep' },
  { field: 'Manufacturer', group: 'Core Identity', yours: 'Merck Sharp & Dohme', ai: 'MSD (Merck Sharp & Dohme)', conf: 88, rec: 'keep' },
  { field: 'Assessment outcome', group: 'Outcomes & Recommendations', yours: 'Recommended', ai: 'Recommended (with restrictions)', conf: 76, rec: 'review' },
  { field: 'Date of Assessment', group: 'Assessment Metadata', yours: '15 Jan 2024', ai: 'January 2024', conf: 72, rec: 'review' },
  { field: 'Clinical evidence submitted summary', group: 'Clinical Evidence', yours: 'KEYNOTE-522 trial...', ai: 'Phase III KEYNOTE-522 RCT; N=1174; pembrolizumab + chemotherapy vs placebo; pCR primary endpoint', conf: 84, rec: 'keep' },
  { field: 'Results Presented/Discussed - Primary Endpoint', group: 'Clinical Evidence', yours: 'pCR 64.8% vs 51.2%', ai: 'pCR: 64.8% (pembro) vs 51.2% (placebo); HR for EFS 0.63 (95% CI 0.48–0.82)', conf: 92, rec: 'replace' },
  { field: 'ICER estimates/ICUR estimates/ Cost per QALY', group: 'Health Economics', yours: '£42,000/QALY', ai: '£48,500–£52,300 per QALY (base case)', conf: 43, rec: 'review' },
  { field: 'QoL measure considered?', group: 'Clinical Evidence', yours: 'Yes', ai: 'Yes — EQ-5D-3L data submitted; some concerns noted by committee', conf: 81, rec: 'keep' },
  { field: 'Clinical Comparator accepted by HTA body', group: 'Clinical Evidence', yours: 'Carboplatin + paclitaxel', ai: 'Nab-paclitaxel + carboplatin ± capecitabine', conf: 67, rec: 'replace' },
  { field: 'Cost Effective (Yes/No)', group: 'Health Economics', yours: 'Yes', ai: 'Yes — with PAS in place', conf: 88, rec: 'keep' },
];

export const AUDIT_DATA: AuditEntry[] = [
  { ts: '2024-01-15 14:32', field: 'Brand Name', decision: 'Accepted Keep', by: 'R. Arora', type: 'accept' },
  { ts: '2024-01-15 14:33', field: 'ICER estimates/ICUR estimates/ Cost per QALY', decision: 'Overridden → £42,000/QALY', by: 'R. Arora', type: 'override' },
  { ts: '2024-01-15 14:35', field: 'Results Presented/Discussed - Primary Endpoint', decision: 'Accepted Replace (AI value)', by: 'R. Arora', type: 'replace' },
  { ts: '2024-01-15 14:38', field: 'Assessment outcome', decision: 'Accepted Keep', by: 'S. Mehta', type: 'accept' },
  { ts: '2024-01-15 14:40', field: 'Clinical Comparator accepted by HTA body', decision: 'Accepted Replace (AI value)', by: 'S. Mehta', type: 'replace' },
  { ts: '2024-01-15 14:45', field: 'Date of Assessment', decision: 'Overridden → 15 Jan 2024', by: 'R. Arora', type: 'override' },
];

export const JOBS_DATA: Job[] = [
  { id: 'job-1', name: 'bulk_oncology_2024.xlsx', type: 'Bulk', market: 'NICE', prog: 78, status: 'review', rows: 234, time: '2h ago' },
  { id: 'job-2', name: 'nice.org.uk/guidance/ta691', type: 'URL', market: 'NICE', prog: 100, status: 'done', rows: 1, time: '5h ago' },
  { id: 'job-3', name: 'g-ba_q3_batch.xlsx', type: 'Bulk', market: 'G-BA', prog: 100, status: 'done', rows: 88, time: '1d ago' },
  { id: 'job-4', name: 'has_batch_2024.xlsx', type: 'Bulk', market: 'HAS', prog: 45, status: 'running', rows: 120, time: 'Just now' },
  { id: 'job-5', name: 'pbac_submissions.xlsx', type: 'Bulk', market: 'PBAC', prog: 100, status: 'done', rows: 56, time: '2d ago' },
  { id: 'job-6', name: 'aifa_oncology_v2.xlsx', type: 'Bulk', market: 'AIFA', prog: 10, status: 'running', rows: 45, time: '10m ago' },
];

export const SUBMISSIONS_DATA: Submission[] = [
  {
    id: 'sub-1',
    jobId: 'job-1',
    product: 'Pembrolizumab',
    population: 'Adults with TNBC',
    status: 'review',
    matchRate: 85,
    fields: COMP_DATA
  },
  {
    id: 'sub-2',
    jobId: 'job-1',
    product: 'Nivolumab',
    population: 'NSCLC 2nd Line',
    status: 'done',
    matchRate: 92,
    fields: [
      { field: 'Brand Name', group: 'Core Identity', yours: 'Opdivo', ai: 'Opdivo', conf: 99, rec: 'keep' },
      { field: 'INN Name', group: 'Core Identity', yours: 'Nivolumab', ai: 'Nivolumab', conf: 99, rec: 'keep' },
      { field: 'Assessment outcome', group: 'Outcomes & Recommendations', yours: 'Recommended', ai: 'Recommended', conf: 95, rec: 'keep' },
    ]
  },
  {
    id: 'sub-3',
    jobId: 'job-3',
    product: 'Trastuzumab',
    population: 'HER2+ Breast Cancer',
    status: 'done',
    matchRate: 98,
    fields: [
      { field: 'Brand Name', group: 'Core Identity', yours: 'Herceptin', ai: 'Herceptin', conf: 99, rec: 'keep' },
    ]
  }
];

export const PROMPTS: Record<string, Record<string, string>> = {
  'Default': {
    'Product ID': `Extract the unique identifier or reference number for the product as assigned by the HTA agency or regulatory body.\n\n{{DOCUMENT_TEXT}}`,
    'Brand Name': `Extract the brand/trade name of the pharmaceutical product under assessment.\n\nLook for the product name used throughout the guidance document, typically appearing in the title and recommendation sections.\n\nReturn ONLY the brand name string. If multiple brand names exist, return the primary one.\n\n{{DOCUMENT_TEXT}}`,
    'INN Name': `Extract the International Nonproprietary Name (INN) of the pharmaceutical product.\n\nLook for the generic name of the active substance.\n\n{{DOCUMENT_TEXT}}`,
    'Manufacturer': `Extract the name of the marketing authorization holder or manufacturer of the product.\n\n{{DOCUMENT_TEXT}}`,
    'Assessed population (Short form)': `Provide a concise summary of the patient population for which the drug was assessed.\n\n{{DOCUMENT_TEXT}}`,
    'Assessed population': `Extract the full description of the patient population evaluated in the HTA submission, including specific indications and patient characteristics.\n\n{{DOCUMENT_TEXT}}`,
    'Line of treatment': `Identify the specific line of therapy (e.g., first-line, second-line) for which the drug is being assessed.\n\n{{DOCUMENT_TEXT}}`,
    'Initial Assessment or Reassessment': `Determine if this is an initial evaluation of the technology or a reassessment/review of a previous decision.\n\n{{DOCUMENT_TEXT}}`,
    'Assessment Status': `Identify the current status of the assessment (e.g., Final, Draft, Suspended).\n\n{{DOCUMENT_TEXT}}`,
    'Date of Assessment': `Extract the date when the assessment was conducted or the committee meeting took place.\n\n{{DOCUMENT_TEXT}}`,
    'Publication date': `Extract the official publication date of the HTA guidance or report.\n\n{{DOCUMENT_TEXT}}`,
    'PDF web link': `Extract the direct URL to the PDF version of the HTA report if available.\n\n{{DOCUMENT_TEXT}}`,
    'Web Link': `Extract the URL to the main landing page for this HTA assessment on the agency's website.\n\n{{DOCUMENT_TEXT}}`,
    'Assessment outcome': `Every health technology assessment (HTA) has an outcome which will be given by the HTA agency. Extract the final recommendation/decision for the drug under assessment.\n\nLook for explicit decision statements such as:
- "The committee recommends..."
- "NICE recommends..."
- "[Drug name] is recommended for..."
- "Not recommended..."

Map the extracted text to one of the accepted values:
• Recommended
• Recommended (with restrictions)
• Not recommended
• Optimised
• Under review

Return the single most applicable value.

{{DOCUMENT_TEXT}}`,
    'Recommended population': `Extract the specific patient population for which the drug has been recommended by the HTA body.\n\n{{DOCUMENT_TEXT}}`,
    'Recommended line of treatment': `Identify the line of therapy for which the drug is recommended.\n\n{{DOCUMENT_TEXT}}`,
    'Monotherapy / Combination': `Specify whether the drug is recommended as a monotherapy or in combination with other treatments.\n\n{{DOCUMENT_TEXT}}`,
    'Comments': `Extract any significant additional comments or caveats provided by the HTA committee regarding their decision.\n\n{{DOCUMENT_TEXT}}`,
    'Patient Organisation Inputs': `Summarize the key points or concerns raised by patient organizations during the assessment process.\n\n{{DOCUMENT_TEXT}}`,
    'Clinical Experts Inputs': `Summarize the key insights or opinions provided by clinical experts during the evaluation.\n\n{{DOCUMENT_TEXT}}`,
    'Target patient population': `Identify the broader target population that the treatment aims to address.\n\n{{DOCUMENT_TEXT}}`,
    'Clinical evidence submitted summary': `Provide details of all the clinical evidence mentioned as part of the HTA evaluation. Include the trial names, phases, reference identifiers, and key design elements such as randomization, comparators, and control groups.\n\nBrief Summary (up to 150 words).\n\n{{DOCUMENT_TEXT}}`,
    'Pivotal trials included in submission': `Provide details of the pivotal trial mentioned as part of the HTA evaluation. Include the trial name, phase, reference identifier, and key design elements such as randomization, comparators, and control groups.\n\nBrief Summary (up to 80 words).\n\n{{DOCUMENT_TEXT}}`,
    'Results Presented/Discussed - Primary Endpoint': `Extract the primary clinical endpoints discussed in the document, highlighting those considered critical by the HTA agency. Include quantitative data such as effect sizes, response rates, hazard ratios, or other relevant metrics.\n\nBrief Summary (up to 60 words).\n\n{{DOCUMENT_TEXT}}`,
    'Results Presented/Discussed Secondary Endpoints': `Extract the secondary clinical endpoints discussed in the document, highlighting those considered critical by the HTA agency. Include quantitative data for each outcome.\n\nBrief Summary (up to 60 words).\n\n{{DOCUMENT_TEXT}}`,
    'Results Presented/Discussed HRQoL': `Summarize the quality of life (QoL) data submitted, including utility scores, patient-reported outcomes, and details of the specific scales or measures used (e.g., EQ-5D, SF-36).\n\nBrief summary (up to 100 words).\n\n{{DOCUMENT_TEXT}}`,
    'Results Presented/Discussed Safety': `Summarize the key safety outcomes from the clinical trials submitted, as reported or assessed by the HTA agency. Include quantitative data for the safety outcome, such as adverse event, serious adverse event, discontinuation rates, etc.\n\nBrief summary (up to 70 words).\n\n{{DOCUMENT_TEXT}}`,
    'Clinical Comparator presented by company': `The clinical comparators submitted by the manufacturer used in the HTA assessment.\n\n{{DOCUMENT_TEXT}}`,
    'Clinical Comparator accepted by HTA body': `The clinical comparators accepted by the payer in the HTA assessment.\n\n{{DOCUMENT_TEXT}}`,
    'Was the outcome considered clinically meaningful and how was this viewed in HTA?': `Implies if the treatment help patients in a way that matters to their health and life? And did the healthcare system consider these improvements valuable enough to recommend or fund the treatment?\n\nBrief summary (up to 100 words).\n\n{{DOCUMENT_TEXT}}`,
    'QoL measure considered?': `Indicate whether the quality of life (QoL) data were accepted or contested by the HTA agency. If applicable, capture any limitations highlighted by the agency.\n\n{{DOCUMENT_TEXT}}`,
    'QoL scale/ evidence submitted': `Extract details about the quality of life (QoL) scales used, and details of the specific scales or measures used (e.g., EQ-5D, SF-36).\n\nBrief summary (up to 50 words).\n\n{{DOCUMENT_TEXT}}`,
    'ITC considered?': `Indicate whether the indirect comparison data were accepted or challenged by the HTA agency.\n\n{{DOCUMENT_TEXT}}`,
    'ITC evidence submitted': `Extract details about indirect comparison data provided as part of the submission, including methodologies or approaches used.\n\nBrief summary (up to 50 words).\n\n{{DOCUMENT_TEXT}}`,
    'Systematic review considered?': `Indicate whether the systematic review data was accepted or challenged by the HTA agency.\n\n{{DOCUMENT_TEXT}}`,
    'Systematic review Conducted?': `Extract details about systematic review data provided as part of the submission, including methodologies or approaches used.\n\nBrief summary (up to 50 words).\n\n{{DOCUMENT_TEXT}}`,
    'RWE considered?': `Specify whether the real-world evidence was accepted or criticized by the HTA agency.\n\n{{DOCUMENT_TEXT}}`,
    'RWE evidence submitted': `Document any real-world evidence (RWE) provided as part of the submission, including sources such as registry data, observational studies, or post-marketing surveillance.\n\nBrief summary (up to 50 words).\n\n{{DOCUMENT_TEXT}}`,
    'Decision drivers highlighted by payer': `Summarize factors or evidence cited as positive drivers for the HTA decision, including improvements on primary or secondary endpoints, subgroup analyses, or specific patient populations.\n\nBrief summary (up to 100 words).\n\n{{DOCUMENT_TEXT}}`,
    'Drawbacks or limitations highlighted by payer': `Extract any challenges or negative factors emphasized by the HTA agency, such as high cost, lack of robust data, safety concerns, or absence of active comparator trials (ACT).\n\nBrief summary (up to 100 words).\n\n{{DOCUMENT_TEXT}}`,
    'Other factors involved': `Mention any other factors involved in payers’ decision making in the HTA document.\n\nBrief summary (up to 50 words).\n\n{{DOCUMENT_TEXT}}`,
    'Additional evidence requested by payer': `Extract details on additional evidence requirements asked by the payer in the HTA assessment document.\n\nBrief summary (up to 50 words).\n\n{{DOCUMENT_TEXT}}`,
    "Manufacturer Responses on the request for additional data submission/ Manufacturer's comments/ thoughts": `For the above, if the manufacturer submitted any additional evidence besides the already submitted evidence.\n\nBrief summary (up to 50 words).\n\n{{DOCUMENT_TEXT}}`,
    'Price of brand': `Extract the reported price of the brand-name drug as mentioned in the HTA document.\n\n{{DOCUMENT_TEXT}}`,
    'Price to be reduced to become cost-effective': `Identify the price reduction required for the drug to meet the HTA agency's cost-effectiveness threshold.\n\n{{DOCUMENT_TEXT}}`,
    'Type of economic analysis submitted': `This implies how we compare the costs of treatments with their results to figure out which treatment gives the most value for money. (e.g., CMA, CEA, CUA, CBA, CCA).\n\n{{DOCUMENT_TEXT}}`,
    'Type of economic model submitted': `Implies to the specific method or framework used to evaluate the costs and health outcomes of a medical treatment or intervention in an economic analysis. (e.g., Markov Model, Decision Tree Model).\n\n{{DOCUMENT_TEXT}}`,
    'Economic model description': `Economic Model Description explains how the economic evaluation was built, what data it uses, and how it predicts the cost-effectiveness of a treatment over time.\n\nBrief summary (up to 100 words).\n\n{{DOCUMENT_TEXT}}`,
    'Economic Comparator': `Capture the alternative treatment(s) or intervention(s) against which a new treatment is compared in an economic evaluation.\n\n{{DOCUMENT_TEXT}}`,
    'Model Inputs': `Provide the details from where clinical, utility, costs, etc. were sourced.\n\nBrief summary (50-100 words).\n\n{{DOCUMENT_TEXT}}`,
    'ICER estimates/ICUR estimates/ Cost per QALY': `Extract the Incremental Cost-Effectiveness Ratio (ICER) or Incremental Cost-Utility Ratio (ICUR) estimates from the health economic analysis.\n\nLook for:
- Base case ICER/ICUR values
- Sensitivity analysis ranges
- Company-submitted vs committee-adjusted estimates

Return values in format: Currency X,XXX per QALY. Include range if multiple scenarios. Limit to 80 words.

{{DOCUMENT_TEXT}}`,
    'Other Model Outputs': `Capture additional outputs from the model such as Life Years gained, survival commentary, comments on incremental costs, etc.\n\nBrief summary (up to 150 words).\n\n{{DOCUMENT_TEXT}}`,
    'Cost Effective (Yes/No)': `This refers to whether an intervention or treatment provides sufficient health benefits relative to its cost, usually in terms of a specified threshold for cost-effectiveness.\n\n{{DOCUMENT_TEXT}}`,
    'Strengths of economic model': `The strengths of an economic model refer to the advantages or positive attributes that make the model useful and effective in analyzing and making decisions about economic issues.\n\nBrief summary (up to 100 words).\n\n{{DOCUMENT_TEXT}}`,
    'Challenges of economic model': `This implies the complexities of using these models in real-world decision-making.\n\nBrief summary (up to 100 words).\n\n{{DOCUMENT_TEXT}}`,
    'Key sources of uncertainty': `Refer to the various factors or elements that introduce doubt or variability into predictions, outcomes, or decision-making processes.\n\nBrief summary (up to 100 words).\n\n{{DOCUMENT_TEXT}}`,
    'Budget Impact': `This implies the details about budget impact analysis – methodology, comparator, price of drug, annual cost, total budget impact on the payer.\n\nBrief summary (up to 100 words).\n\n{{DOCUMENT_TEXT}}`,
    'Mutation': `Indicate the mutation or biomarker against which the product is indicated for. (e.g., PD-L1, PD-1, ROS, EGFR, etc.)\n\n{{DOCUMENT_TEXT}}`,
    'Companion Diagnostic': `Indicate the diagnostic agent/ product which is used to detect the above mutation or biomarker.\n\n{{DOCUMENT_TEXT}}`,
    'Reimbursement status of Companion diagnostic': `Capture the reimbursement status for the above diagnostic agent, if mentioned in the document.\n\n{{DOCUMENT_TEXT}}`,
  },
  'NICE': {
    'Assessment outcome': `Extract the final recommendation from the NICE guidance. Look for phrases like "NICE recommends" or "NICE does not recommend".\n\nMap to:\n• Recommended\n• Recommended (with restrictions)\n• Not recommended\n• Optimised\n\n{{DOCUMENT_TEXT}}`,
    'ICER estimates/ICUR estimates/ Cost per QALY': `Extract the ICER/ICUR values specifically mentioned in the NICE committee discussion sections. Look for "most plausible ICER" or "committee's preferred ICER".\n\n{{DOCUMENT_TEXT}}`,
  },
  'SMC': {
    'Assessment outcome': `Extract the SMC advice. Look for phrases like "SMC advice: recommended" or "not recommended".\n\nMap to:\n• Recommended\n• Recommended (with restrictions)\n• Not recommended\n\n{{DOCUMENT_TEXT}}`,
    'ICER estimates/ICUR estimates/ Cost per QALY': `Extract the ICER/ICUR values from the SMC detailed advice document. Look for "cost per QALY" or "incremental cost-effectiveness ratio".\n\n{{DOCUMENT_TEXT}}`,
  },
  'G-BA': {
    'Assessment outcome': `Extract the "Zusatznutzen" (added benefit) rating from the G-BA resolution. 

Translate the rating to English. Common values are:
• erheblicher Zusatznutzen -> Major added benefit
• beträchtlicher Zusatznutzen -> Considerable added benefit
• geringer Zusatznutzen -> Minor added benefit
• nicht quantifizierbarer Zusatznutzen -> Non-quantifiable added benefit
• kein Zusatznutzen -> No added benefit

{{DOCUMENT_TEXT}}`,
    'Indication as per HTA body': `Extract the "Anwendungsgebiet" (therapeutic indication) from the G-BA resolution document and translate it to English.

{{DOCUMENT_TEXT}}`,
    'Clinical Comparator accepted by HTA body': `Identify the "Zweckmäßige Vergleichstherapie" (ZVT) or appropriate comparator therapy defined by the G-BA and translate it to English.

{{DOCUMENT_TEXT}}`,
  },
  'HAS': {
    'Assessment outcome': `Extract the SMR (Service Médical Rendu) and ASMR (Amélioration du Service Médical Rendu) ratings. Translate the ratings and their meanings to English.

SMR values: Important, Moderate, Low, Insufficient.
ASMR values: I (Major), II (Important), III (Moderate), IV (Minor), V (None).

{{DOCUMENT_TEXT}}`,
    'Indication as per HTA body': `Extract the "Indication remboursable" (reimbursable indication) from the HAS Transparency Committee opinion and translate it to English.

{{DOCUMENT_TEXT}}`,
    'Clinical Comparator accepted by HTA body': `Identify the "Comparateurs" (comparators) mentioned in the HAS assessment and provide their names in English.

{{DOCUMENT_TEXT}}`,
  },
  'PBAC': {
    'Assessment outcome': `Extract the PBAC recommendation. Look for "The PBAC recommended" or "The PBAC did not recommend".\n\nNote if it's based on cost-effectiveness or cost-minimisation.\n\n{{DOCUMENT_TEXT}}`,
    'ICER estimates/ICUR estimates/ Cost per QALY': `Extract the ICER/ICUR values mentioned in the PBAC Public Summary Document. Look for "incremental cost per QALY" or "cost-effectiveness".\n\n{{DOCUMENT_TEXT}}`,
  },
  'AIFA': {
    'Assessment outcome': `Extract the AIFA determination. Translate the status and class to English. Look for "Innovatività" status (Piena/Full, Condizionata/Conditional, No) and reimbursement class (A, H, C).

{{DOCUMENT_TEXT}}`,
  },
  'AEMPS': {
    'Assessment outcome': `Extract the conclusion from the IPT (Informe de Posicionamiento Terapéutico). Translate the therapeutic positioning recommendation to English.

{{DOCUMENT_TEXT}}`,
    'Indication as per HTA body': `Extract the "Indicación terapéutica" (therapeutic indication) from the AEMPS IPT document and translate it to English.

{{DOCUMENT_TEXT}}`,
    'Clinical Comparator accepted by HTA body': `Identify the "Comparador" (comparator) used in the Spanish IPT assessment and provide its name in English.

{{DOCUMENT_TEXT}}`,
  },
  'INAMI': {
    'Assessment outcome': `Extract the CRM/CTG recommendation and translate it to English. Look for the "Avis" (Advice) regarding reimbursement.

{{DOCUMENT_TEXT}}`,
  },
  'CDA-AMC': {
    'Assessment outcome': `Extract the CADTH/CDA recommendation. Look for "Reimburse", "Reimburse with clinical criteria and/or conditions", or "Do not reimburse".\n\n{{DOCUMENT_TEXT}}`,
    'ICER estimates/ICUR estimates/ Cost per QALY': `Extract the ICER values from the CADTH Pharmacoeconomic Review Report. Look for "incremental cost-effectiveness ratio" or "ICER".\n\n{{DOCUMENT_TEXT}}`,
  },
  'CHUIKYO': {
    'Assessment outcome': `Extract the MHLW/Chuikyo reimbursement decision and price listing status.\n\n{{DOCUMENT_TEXT}}`,
  },
  'CONITEC': {
    'Assessment outcome': `Extract the CONITEC recommendation for incorporation into SUS. Translate the recommendation to English. Look for "Favorável à incorporação" (Favorable) or "Não favorável" (Not favorable).

{{DOCUMENT_TEXT}}`,
  },
  'DMC': {
    'Assessment outcome': `Extract the Medicinrådet recommendation. Translate the recommendation to English. Look for "Anbefaler" (Recommends) or "Anbefaler ikke" (Does not recommend).

{{DOCUMENT_TEXT}}`,
  },
  'fimea': {
    'Assessment outcome': `Extract the Fimea assessment summary regarding therapeutic value and cost-effectiveness. Provide the summary in English.

{{DOCUMENT_TEXT}}`,
  },
  'HIRA': {
    'Assessment outcome': `Extract the HIRA/Drug Benefit Coverage Committee decision on reimbursement eligibility. Provide the decision in English.

{{DOCUMENT_TEXT}}`,
  },
  'NCPE': {
    'Assessment outcome': `Extract the NCPE recommendation. Look for "Recommended for reimbursement", "Recommended at a lower price", or "Not recommended".\n\n{{DOCUMENT_TEXT}}`,
    'ICER estimates/ICUR estimates/ Cost per QALY': `Extract the ICER values from the NCPE summary. Look for "incremental cost-effectiveness ratio" or "cost per QALY".\n\n{{DOCUMENT_TEXT}}`,
  },
  'MOH': {
    'Assessment outcome': `Extract the Health Basket Committee decision regarding the inclusion of the drug in the national list of health services. Provide the decision in English.

{{DOCUMENT_TEXT}}`,
  },
  'ZINL': {
    'Assessment outcome': `Extract the Zorginstituut Nederland (ZIN) advice. Translate the "Pakketadvies" (Package advice) to English.

{{DOCUMENT_TEXT}}`,
  },
  'AOTMIT': {
    'Assessment outcome': `Extract the AOTMiT President's recommendation. Translate the recommendation to English. Look for "rekomendacja pozytywna" (positive recommendation) or "rekomendacja negatywna" (negative recommendation).

{{DOCUMENT_TEXT}}`,
  },
  'ACE': {
    'Assessment outcome': `Extract the ACE Drug Guidance recommendation. Look for "Subsidised" or "Not subsidised".\n\n{{DOCUMENT_TEXT}}`,
  },
  'NHI': {
    'Assessment outcome': `Extract the NHIA decision on listing and reimbursement in the National Health Insurance. Provide the decision in English.

{{DOCUMENT_TEXT}}`,
  },
  'TLV': {
    'Assessment outcome': `Extract the TLV decision on subsidy. Translate the decision to English. Look for "Ingår i högkostnadsskyddet" (Included in the high-cost protection) or "Avslås" (Rejected).

{{DOCUMENT_TEXT}}`,
  },
  'ICER': {
    'Assessment outcome': `Extract the ICER evidence rating and value-based price benchmark conclusion.\n\n{{DOCUMENT_TEXT}}`,
  }
};

export const SNIPPETS: Record<string, string> = {
  'Brand Name': `"This guidance covers <mark>pembrolizumab</mark> (Keytruda, MSD) for treating advanced urothelial carcinoma in adults whose tumours express PD-L1 and who have not had platinum-containing chemotherapy."`,
  'Assessment outcome': `"The committee concluded that <mark>pembrolizumab is recommended</mark> as an option for treating locally advanced or metastatic non-small-cell lung cancer in adults whose tumours express PD-L1 with a 50% or more tumour proportion score..."`,
  'ICER estimates/ICUR estimates/ Cost per QALY': `"The committee considered the company's base-case ICER of <mark>£48,500 per QALY gained</mark> for pembrolizumab compared with chemotherapy. Scenario analyses ranged from £45,200 to £52,300 per QALY."`,
  'Results Presented/Discussed - Primary Endpoint': `"The primary endpoint was pathological complete response (pCR). The trial showed pCR of <mark>64.8% with pembrolizumab</mark> versus 51.2% with placebo (odds ratio 1.72, 1.36 to 2.17)."`,
};
