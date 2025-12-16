import { Template, TemplateType, TemplateCategory } from './types';

export const TEMPLATES: Template[] = [
  // --- BUSINESS DOCUMENTS ---
  {
    id: 'tpl_invoice_001',
    type: TemplateType.INVOICE,
    category: TemplateCategory.BUSINESS,
    name: 'Professional Invoice',
    description: 'A clean and modern invoice template designed for freelancers and small businesses. Use this to bill clients for services or products, specifying line items, quantities, and payment terms clearly.',
    color: 'bg-blue-500',
    thumbnail: 'https://picsum.photos/400/300?grayscale',
    fields: [
      { key: 'logo', label: 'Company Logo', type: 'image' },
      { key: 'fromName', label: 'From Name', type: 'text', placeholder: 'Acme Corp' },
      { key: 'fromEmail', label: 'From Email', type: 'text', placeholder: 'billing@acme.com' },
      { key: 'fromPhone', label: 'From Phone', type: 'text', placeholder: '(555) 123-4567' },
      { key: 'fromAddress', label: 'From Address', type: 'textarea', placeholder: '123 Business Rd, Suite 100...' },
      { key: 'toName', label: 'Bill To Name', type: 'text', placeholder: 'John Doe' },
      { key: 'toEmail', label: 'Bill To Email', type: 'text', placeholder: 'client@example.com' },
      { key: 'toPhone', label: 'Bill To Phone', type: 'text', placeholder: '(555) 987-6543' },
      { key: 'toAddress', label: 'Bill To Address', type: 'textarea', placeholder: '456 Client Lane...' },
      { key: 'invoiceDate', label: 'Invoice Date', type: 'date' },
      { key: 'dueDate', label: 'Due Date', type: 'date' },
      { key: 'invoiceNumber', label: 'Invoice Number', type: 'text', placeholder: 'INV-2024-001' },
      { key: 'items', label: 'Line Items', type: 'items' },
      { key: 'notes', label: 'Notes / Terms', type: 'textarea', placeholder: 'Payment due within 30 days.' }
    ]
  },
  {
    id: 'tpl_po_001',
    type: TemplateType.PURCHASE_ORDER,
    category: TemplateCategory.BUSINESS,
    name: 'Purchase Order',
    description: 'Official purchase order document for procurement processes. Ideal for authorizing transactions with suppliers, tracking outgoing orders, and ensuring agreed pricing and quantities.',
    color: 'bg-blue-600',
    thumbnail: 'https://picsum.photos/400/303?grayscale',
    fields: [
      { key: 'logo', label: 'Company Logo', type: 'image' },
      { key: 'fromName', label: 'Buyer Name', type: 'text', placeholder: 'Your Company' },
      { key: 'fromEmail', label: 'Buyer Email', type: 'text' },
      { key: 'fromPhone', label: 'Buyer Phone', type: 'text' },
      { key: 'fromAddress', label: 'Buyer Address', type: 'textarea' },
      { key: 'toName', label: 'Vendor Name', type: 'text', placeholder: 'Supplier Inc' },
      { key: 'toEmail', label: 'Vendor Email', type: 'text' },
      { key: 'toPhone', label: 'Vendor Phone', type: 'text' },
      { key: 'toAddress', label: 'Vendor Address', type: 'textarea' },
      { key: 'poNumber', label: 'PO Number', type: 'text', placeholder: 'PO-001' },
      { key: 'date', label: 'Date', type: 'date' },
      { key: 'items', label: 'Order Items', type: 'items' },
      { key: 'notes', label: 'Shipping Instructions', type: 'textarea' }
    ]
  },
  {
    id: 'tpl_proposal_001',
    type: TemplateType.PROPOSAL,
    category: TemplateCategory.BUSINESS,
    name: 'Business Proposal',
    description: 'A structured proposal designed to win new clients or projects. Perfect for outlining your executive summary, scope of work, and pricing strategy to convince stakeholders.',
    color: 'bg-indigo-500',
    thumbnail: 'https://picsum.photos/400/304?grayscale',
    fields: [
      { key: 'logo', label: 'Company Logo', type: 'image' },
      { key: 'title', label: 'Proposal Title', type: 'text', placeholder: 'Website Redesign' },
      { key: 'clientName', label: 'Client Name', type: 'text' },
      { key: 'preparedBy', label: 'Prepared By', type: 'text' },
      { key: 'date', label: 'Date', type: 'date' },
      { key: 'executiveSummary', label: 'Executive Summary', type: 'textarea' },
      { key: 'scope', label: 'Scope of Work', type: 'textarea' },
      { key: 'pricing', label: 'Pricing / Budget', type: 'textarea' }
    ]
  },
  {
    id: 'tpl_contract_001',
    type: TemplateType.CONTRACT,
    category: TemplateCategory.BUSINESS,
    name: 'Service Agreement',
    description: 'Standard contract for services between two parties. Essential for defining roles, deliverables, payment schedules, and legal protections for freelancers and agencies.',
    color: 'bg-slate-700',
    thumbnail: 'https://picsum.photos/400/305?grayscale',
    fields: [
      { key: 'logo', label: 'Company Logo', type: 'image' },
      { key: 'partyA', label: 'Party A (Provider)', type: 'text' },
      { key: 'partyB', label: 'Party B (Client)', type: 'text' },
      { key: 'effectiveDate', label: 'Effective Date', type: 'date' },
      { key: 'services', label: 'Services Provided', type: 'textarea' },
      { key: 'terms', label: 'Terms & Conditions', type: 'textarea', placeholder: 'Enter payment terms, termination clauses, etc.' },
      { key: 'signatureBlock', label: 'Signatories', type: 'text', placeholder: 'Names of signers' }
    ]
  },
  {
    id: 'tpl_minutes_001',
    type: TemplateType.MEETING_MINUTES,
    category: TemplateCategory.BUSINESS,
    name: 'Meeting Minutes',
    description: 'A formal record of proceedings for business meetings. Best for board meetings, team syncs, and client calls to ensure decisions and action items are tracked.',
    color: 'bg-gray-500',
    thumbnail: 'https://picsum.photos/400/306?grayscale',
    fields: [
      { key: 'logo', label: 'Organization Logo', type: 'image' },
      { key: 'organization', label: 'Organization', type: 'text', placeholder: 'Acme Inc.' },
      { key: 'meetingTitle', label: 'Meeting Title', type: 'text' },
      { key: 'date', label: 'Date & Time', type: 'text' },
      { key: 'attendees', label: 'Attendees', type: 'textarea' },
      { key: 'agenda', label: 'Agenda Items', type: 'textarea' },
      { key: 'decisions', label: 'Decisions Made', type: 'textarea' },
      { key: 'actionItems', label: 'Action Items', type: 'textarea' }
    ]
  },

  // --- PERSONAL DOCUMENTS ---
  {
    id: 'tpl_resume_001',
    type: TemplateType.RESUME,
    category: TemplateCategory.PERSONAL,
    name: 'Professional Resume',
    description: 'Clean resume format designed to highlight experience and skills. Optimized for modern applicant tracking systems (ATS) and professional presentation to recruiters.',
    color: 'bg-teal-600',
    thumbnail: 'https://picsum.photos/400/307?grayscale',
    fields: [
      { key: 'logo', label: 'Profile Picture / Logo', type: 'image' },
      { key: 'fullName', label: 'Full Name', type: 'text' },
      { key: 'contactInfo', label: 'Contact Info (Email/Phone)', type: 'text' },
      { key: 'summary', label: 'Professional Summary', type: 'textarea' },
      { key: 'experience', label: 'Work Experience', type: 'textarea', placeholder: 'List your roles and achievements' },
      { key: 'education', label: 'Education', type: 'textarea' },
      { key: 'skills', label: 'Skills', type: 'textarea' }
    ]
  },
  {
    id: 'tpl_cover_letter_001',
    type: TemplateType.COVER_LETTER,
    category: TemplateCategory.PERSONAL,
    name: 'Cover Letter',
    description: 'Standard cover letter for job applications. Pair this with your resume to tell your professional story and express enthusiasm for the specific role.',
    color: 'bg-teal-500',
    thumbnail: 'https://picsum.photos/400/308?grayscale',
    fields: [
      { key: 'logo', label: 'Header Logo', type: 'image' },
      { key: 'senderName', label: 'Your Name', type: 'text' },
      { key: 'senderContact', label: 'Your Contact Info', type: 'text' },
      { key: 'recipientName', label: 'Hiring Manager Name', type: 'text' },
      { key: 'companyName', label: 'Company Name', type: 'text' },
      { key: 'content', label: 'Letter Content', type: 'textarea', placeholder: 'I am writing to express my interest...' }
    ]
  },
  {
    id: 'tpl_letter_001',
    type: TemplateType.LETTER,
    category: TemplateCategory.PERSONAL,
    name: 'Personal/Formal Letter',
    description: 'General purpose letter format suitable for formal correspondence. Use this for official notices, personal requests, or professional communications requiring a traditional layout.',
    color: 'bg-slate-600',
    thumbnail: 'https://picsum.photos/400/301?grayscale',
    fields: [
      { key: 'logo', label: 'Header Logo', type: 'image' },
      { key: 'senderName', label: 'Sender Name', type: 'text' },
      { key: 'senderAddress', label: 'Sender Address', type: 'text' },
      { key: 'recipientName', label: 'Recipient Name', type: 'text' },
      { key: 'recipientAddress', label: 'Recipient Address', type: 'text' },
      { key: 'date', label: 'Date', type: 'date' },
      { key: 'subject', label: 'Subject', type: 'text' },
      { key: 'content', label: 'Letter Body', type: 'textarea' }
    ]
  },
  {
    id: 'tpl_cert_001',
    type: TemplateType.CERTIFICATE,
    category: TemplateCategory.PERSONAL,
    name: 'Certificate',
    description: 'Award a clean, elegant certificate to recognize accomplishments. Great for course completions, employee of the month awards, or special achievement recognition.',
    color: 'bg-emerald-600',
    thumbnail: 'https://picsum.photos/400/302?grayscale',
    fields: [
      { key: 'logo', label: 'Organization Logo', type: 'image' },
      { key: 'recipientName', label: 'Recipient Name', type: 'text' },
      { key: 'achievementTitle', label: 'Achievement Title', type: 'text' },
      { key: 'description', label: 'Description', type: 'textarea' },
      { key: 'date', label: 'Date Awarded', type: 'date' },
      { key: 'signatureName', label: 'Signed By', type: 'text' }
    ]
  },

  // --- REPORTS ---
  {
    id: 'tpl_project_report_001',
    type: TemplateType.PROJECT_REPORT,
    category: TemplateCategory.REPORTS,
    name: 'Project Report',
    description: 'Status update and summary for ongoing projects. Use this to communicate progress, identify risks, and outline next steps to keeping stakeholders informed.',
    color: 'bg-orange-500',
    thumbnail: 'https://picsum.photos/400/309?grayscale',
    fields: [
      { key: 'logo', label: 'Organization Logo', type: 'image' },
      { key: 'organization', label: 'Organization', type: 'text' },
      { key: 'projectName', label: 'Project Name', type: 'text' },
      { key: 'reportDate', label: 'Report Date', type: 'date' },
      { key: 'status', label: 'Current Status', type: 'text', placeholder: 'On Track / Delayed' },
      { key: 'progress', label: 'Progress Update', type: 'textarea' },
      { key: 'risks', label: 'Risks & Issues', type: 'textarea' },
      { key: 'nextSteps', label: 'Next Steps', type: 'textarea' }
    ]
  },
  {
    id: 'tpl_expense_001',
    type: TemplateType.EXPENSE_REPORT,
    category: TemplateCategory.REPORTS,
    name: 'Expense Report',
    description: 'Track and submit business expenses for reimbursement. A standardized format to organize receipts, categorize spending, and simplify approval processes.',
    color: 'bg-orange-600',
    thumbnail: 'https://picsum.photos/400/310?grayscale',
    fields: [
      { key: 'logo', label: 'Company Logo', type: 'image' },
      { key: 'employeeName', label: 'Employee Name', type: 'text' },
      { key: 'department', label: 'Department', type: 'text' },
      { key: 'reportDate', label: 'Date', type: 'date' },
      { key: 'items', label: 'Expenses', type: 'items' },
      { key: 'notes', label: 'Notes', type: 'textarea' }
    ]
  },
  {
    id: 'tpl_research_001',
    type: TemplateType.RESEARCH_REPORT,
    category: TemplateCategory.REPORTS,
    name: 'Research Report',
    description: 'A formal template for academic or business research findings. Ideal for presenting executive summaries, methodologies, and data-driven conclusions in a professional structure.',
    color: 'bg-orange-700',
    thumbnail: 'https://picsum.photos/400/311?grayscale',
    fields: [
      { key: 'logo', label: 'Institution Logo', type: 'image' },
      { key: 'university', label: 'University / Organization', type: 'text' },
      { key: 'title', label: 'Research Title', type: 'text' },
      { key: 'author', label: 'Author', type: 'text' },
      { key: 'abstract', label: 'Abstract', type: 'textarea' },
      { key: 'methodology', label: 'Methodology', type: 'textarea' },
      { key: 'findings', label: 'Key Findings', type: 'textarea' },
      { key: 'conclusion', label: 'Conclusion', type: 'textarea' }
    ]
  }
];