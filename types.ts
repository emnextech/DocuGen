export enum TemplateType {
  INVOICE = 'invoice',
  PURCHASE_ORDER = 'purchase_order',
  PROPOSAL = 'proposal',
  CONTRACT = 'contract',
  MEETING_MINUTES = 'meeting_minutes',
  RESUME = 'resume',
  COVER_LETTER = 'cover_letter',
  LETTER = 'letter',
  CERTIFICATE = 'certificate',
  PROJECT_REPORT = 'project_report',
  EXPENSE_REPORT = 'expense_report',
  SALES_REPORT = 'sales_report',
  RESEARCH_REPORT = 'research_report'
}

export enum TemplateCategory {
  BUSINESS = 'Business Documents',
  PERSONAL = 'Personal Documents',
  REPORTS = 'Reports'
}

export interface FormField {
  key: string;
  label: string;
  type: 'text' | 'date' | 'number' | 'textarea' | 'items' | 'image';
  placeholder?: string;
  defaultValue?: any;
}

export interface Template {
  id: string;
  type: TemplateType;
  category: TemplateCategory;
  name: string;
  description: string;
  thumbnail: string;
  fields: FormField[];
  color: string;
}

export interface DocumentData {
  [key: string]: any;
}

// Specific data structures for safety
export interface InvoiceItem {
  description: string;
  quantity: number;
  price: number;
}

export interface GeneratedDocument {
  blob: Blob;
  filename: string;
}