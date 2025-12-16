import { jsPDF } from 'jspdf';
import { Document, Packer, Paragraph, TextRun, AlignmentType, HeadingLevel, Table, TableRow, TableCell, WidthType, BorderStyle, ShadingType } from 'docx';
import { Template, TemplateType, DocumentData, InvoiceItem } from '../types';

// Grouping types for shared logic
const TABULAR_TYPES = [
  TemplateType.INVOICE, 
  TemplateType.PURCHASE_ORDER, 
  TemplateType.EXPENSE_REPORT,
  TemplateType.SALES_REPORT
];

const CERTIFICATE_TYPES = [
  TemplateType.CERTIFICATE
];

// Helper to write wrapped text in PDF and return height used
const writeWrappedText = (doc: jsPDF, text: string, x: number, y: number, maxWidth: number, lineHeight: number = 7) => {
    const lines = doc.splitTextToSize(text, maxWidth);
    doc.text(lines, x, y);
    return lines.length * lineHeight;
};

// Helper to guess format
const getImageFormat = (dataUrl: string) => {
    try {
        const result = dataUrl.match(/^data:image\/(\w+);base64,/);
        if (result && result[1]) {
            return result[1].toUpperCase();
        }
    } catch (e) {}
    return 'JPEG';
};

// PDF GENERATION LOGIC
export const generatePDF = async (template: Template, data: DocumentData): Promise<Blob> => {
  const doc = new jsPDF();
  const width = doc.internal.pageSize.getWidth();
  const height = doc.internal.pageSize.getHeight();
  const margin = 20;

  if (TABULAR_TYPES.includes(template.type)) {
    // --- Modern Tabular Design (Invoice/PO) ---
    
    // Header Banner
    const primaryColor = template.color.includes('orange') ? [234, 88, 12] : template.color.includes('blue') ? [79, 70, 229] : [51, 65, 85];
    doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.rect(0, 0, width, 50, 'F');
    
    // Determine Title Text (Override name for Invoice)
    const titleText = template.type === TemplateType.INVOICE ? "INVOICE" : template.name.toUpperCase();
    
    // Logo & Title Logic
    if (data.logo) {
         try {
             // Logo at Top Left
             const format = getImageFormat(data.logo);
             doc.addImage(data.logo, format, margin, 10, 30, 30);
         } catch (e) { console.warn("Logo error", e); }
         
         // Title at Top Right
         doc.setTextColor(255, 255, 255);
         doc.setFont('helvetica', 'bold');
         doc.setFontSize(26);
         doc.text(titleText, width - margin, 25, { align: 'right' });
         
         // Identifier below title
         doc.setFontSize(12);
         doc.setFont('helvetica', 'normal');
         const identifier = data.invoiceNumber || data.poNumber || data.reportDate || 'DRAFT';
         doc.text(`#${identifier}`, width - margin, 35, { align: 'right' });
    } else {
        // No Logo: Standard Left Title
        doc.setTextColor(255, 255, 255);
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(26);
        doc.text(titleText, margin, 35);
        
        doc.setFontSize(12);
        doc.setFont('helvetica', 'normal');
        const identifier = data.invoiceNumber || data.poNumber || data.reportDate || 'DRAFT';
        doc.text(`#${identifier}`, width - margin, 35, { align: 'right' });
    }

    let currentY = 70;
    doc.setTextColor(0, 0, 0);

    // Two Column Layout for Header Info
    const colWidth = (width - (margin * 2)) / 2;

    // Left Column (From)
    doc.setTextColor(100, 116, 139); // Slate 500
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.text("FROM:", margin, currentY);
    
    doc.setTextColor(0, 0, 0);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    currentY += 6;
    const fromVal = data.fromName || data.employeeName || data.author || '';
    currentY += writeWrappedText(doc, String(fromVal), margin, currentY, colWidth - 10);
    
    // Contact Details (Address, Email, Phone)
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.setTextColor(71, 85, 105); // Slate 600

    if (data.fromAddress) {
        currentY += 1;
        currentY += writeWrappedText(doc, String(data.fromAddress), margin, currentY, colWidth - 10, 5);
    }
    if (data.fromEmail) {
        currentY += 1;
        doc.text(String(data.fromEmail), margin, currentY);
        currentY += 5;
    }
    if (data.fromPhone) {
        doc.text(String(data.fromPhone), margin, currentY);
        currentY += 5;
    }
    currentY += 4;

    // Right Column (To)
    let rightY = 70;
    doc.setTextColor(100, 116, 139);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.text("TO:", width / 2 + 10, rightY);
    
    doc.setTextColor(0, 0, 0);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    rightY += 6;
    const toVal = data.toName || data.clientName || data.department || '';
    rightY += writeWrappedText(doc, String(toVal), width / 2 + 10, rightY, colWidth - 10);
    
    // Recipient Details
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.setTextColor(71, 85, 105);

    if (data.toAddress) {
        rightY += 1;
        rightY += writeWrappedText(doc, String(data.toAddress), width / 2 + 10, rightY, colWidth - 10, 5);
    }
    if (data.toEmail) {
        rightY += 1;
        doc.text(String(data.toEmail), width / 2 + 10, rightY);
        rightY += 5;
    }
    if (data.toPhone) {
        doc.text(String(data.toPhone), width / 2 + 10, rightY);
        rightY += 5;
    }

    // Dates Row
    currentY = Math.max(currentY, rightY + 15) + 10;
    const dateFields = template.fields.filter(f => f.type === 'date');
    
    if (dateFields.length > 0) {
        dateFields.forEach((field, i) => {
             const xPos = margin + (i * 50);
             doc.setTextColor(100, 116, 139);
             doc.setFontSize(10);
             doc.setFont('helvetica', 'bold');
             doc.text(field.label.toUpperCase(), xPos, currentY);
             doc.setTextColor(0, 0, 0);
             doc.setFont('helvetica', 'normal');
             doc.text(String(data[field.key] || '-'), xPos, currentY + 5);
        });
        currentY += 20;
    }

    // Items Table Header
    doc.setFillColor(241, 245, 249); // Slate 100
    doc.rect(margin, currentY, width - (margin * 2), 10, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(51, 65, 85);
    
    doc.text("DESCRIPTION", margin + 5, currentY + 6.5);
    doc.text("QTY", width - margin - 50, currentY + 6.5, { align: 'right' });
    doc.text("PRICE", width - margin - 25, currentY + 6.5, { align: 'right' });
    doc.text("TOTAL", width - margin - 5, currentY + 6.5, { align: 'right' });

    currentY += 12;
    
    // Items Rows
    let subtotal = 0;
    const items: InvoiceItem[] = data.items || [];
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(0, 0, 0);

    items.forEach((item, index) => {
        if (currentY > height - 40) {
            doc.addPage();
            currentY = 20;
        }

        const lineTotal = (Number(item.quantity) || 0) * (Number(item.price) || 0);
        subtotal += lineTotal;

        doc.text(String(item.description || ''), margin + 5, currentY + 4);
        doc.text(String(item.quantity || 0), width - margin - 50, currentY + 4, { align: 'right' });
        doc.text(Number(item.price || 0).toFixed(2), width - margin - 25, currentY + 4, { align: 'right' });
        doc.text(lineTotal.toFixed(2), width - margin - 5, currentY + 4, { align: 'right' });

        // Divider
        doc.setDrawColor(226, 232, 240);
        doc.line(margin, currentY + 8, width - margin, currentY + 8);
        currentY += 12;
    });

    // Total
    currentY += 5;
    const totalBoxX = width - margin - 70;
    doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.rect(totalBoxX, currentY, 70, 14, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.text("TOTAL", totalBoxX + 5, currentY + 9);
    doc.text(subtotal.toFixed(2), width - margin - 5, currentY + 9, { align: 'right' });

    // Notes
    const notesField = template.fields.find(f => f.type === 'textarea' && !['fromAddress', 'toAddress'].includes(f.key));
    if (notesField && data[notesField.key]) {
        currentY += 25;
        if (currentY > height - 30) { doc.addPage(); currentY = 20; }
        
        doc.setTextColor(51, 65, 85);
        doc.setFontSize(10);
        doc.setFont('helvetica', 'bold');
        doc.text("NOTES", margin, currentY);
        currentY += 5;
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(0, 0, 0);
        writeWrappedText(doc, data[notesField.key], margin, currentY, width - (margin * 2));
    }

  } else if (CERTIFICATE_TYPES.includes(template.type)) {
     // --- Certificate Design ---
     
     // Decorative Border
     doc.setDrawColor(20, 83, 45); // Emerald
     doc.setLineWidth(1);
     doc.rect(10, 10, width - 20, height - 20);
     doc.setLineWidth(3);
     doc.rect(13, 13, width - 26, height - 26);

     let cy = 60;
     // Icon Placeholder or Logo
     if (data.logo) {
         try {
            const format = getImageFormat(data.logo);
            doc.addImage(data.logo, format, width/2 - 15, 20, 30, 30);
         } catch (e) {
             console.warn(e);
         }
     } else {
        doc.setFillColor(20, 83, 45);
        doc.circle(width/2, 35, 8, 'F');
     }
     
     // Title
     doc.setFont('times', 'bold');
     doc.setFontSize(36);
     doc.setTextColor(20, 83, 45);
     doc.text(template.name.toUpperCase(), width/2, cy, { align: 'center' });
     
     cy += 20;
     doc.setFont('helvetica', 'normal');
     doc.setFontSize(14);
     doc.setTextColor(80, 80, 80);
     doc.text("THIS CERTIFICATE IS PROUDLY PRESENTED TO", width/2, cy, { align: 'center' });

     cy += 35;
     doc.setFont('times', 'italic');
     doc.setFontSize(40);
     doc.setTextColor(0, 0, 0);
     doc.text(data.recipientName || "Recipient Name", width/2, cy, { align: 'center' });
     
     // Name Underline
     doc.setDrawColor(20, 83, 45);
     doc.setLineWidth(0.5);
     doc.line(margin + 40, cy + 3, width - margin - 40, cy + 3);

     cy += 30;
     if (data.achievementTitle) {
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(18);
        doc.setTextColor(20, 83, 45);
        doc.text(data.achievementTitle, width/2, cy, { align: 'center' });
        cy += 15;
     }

     doc.setFont('helvetica', 'normal');
     doc.setFontSize(12);
     doc.setTextColor(60, 60, 60);
     const desc = doc.splitTextToSize(data.description || '', 160);
     doc.text(desc, width/2, cy, { align: 'center' });

     // Signatures
     const bottomY = height - 50;
     doc.setDrawColor(0,0,0);
     doc.line(40, bottomY, 90, bottomY);
     doc.line(width - 90, bottomY, width - 40, bottomY);
     
     doc.setFontSize(11);
     doc.text("Date", 65, bottomY + 8, { align: 'center' });
     doc.text("Signature", width - 65, bottomY + 8, { align: 'center' });

     doc.setFont('times', 'bold');
     doc.text(data.date || new Date().toLocaleDateString(), 65, bottomY - 5, { align: 'center' });
     doc.text(data.signatureName || '', width - 65, bottomY - 5, { align: 'center' });

  } else {
     // --- General Document (Letters, Reports) ---
     let cy = margin + 10;
     
     if (data.logo) {
         try {
             const format = getImageFormat(data.logo);
             doc.addImage(data.logo, format, margin, margin, 25, 25);
             cy += 35; // Push content down
         } catch(e) {}
     }

     // Header Logic
     if (template.type === TemplateType.LETTER || template.type === TemplateType.COVER_LETTER) {
         doc.setFontSize(12);
         doc.setFont('helvetica', 'bold');
         doc.text(String(data.senderName || ''), margin, cy);
         cy += 6;
         doc.setFont('helvetica', 'normal');
         doc.setFontSize(11);
         doc.setTextColor(80, 80, 80);
         cy += writeWrappedText(doc, String(data.senderContact || data.senderAddress || ''), margin, cy, 100);
         cy += 10;
         doc.setDrawColor(200, 200, 200);
         doc.line(margin, cy, width-margin, cy);
         cy += 15;
     } else {
         // Generic Header
         doc.setFont('helvetica', 'bold');
         doc.setFontSize(24);
         doc.setTextColor(0, 0, 0);
         doc.text(template.name, margin, cy);
         cy += 10;
         
         // Subtitle / Organization Name
         const orgName = data.organization || data.university;
         if (orgName) {
             doc.setFontSize(14);
             doc.setTextColor(100, 100, 100);
             doc.text(String(orgName).toUpperCase(), margin, cy);
             cy += 10;
         }

         cy += 5;
         doc.setDrawColor(0, 0, 0);
         doc.setLineWidth(0.5);
         doc.line(margin, cy, width-margin, cy);
         cy += 15;
     }

     doc.setTextColor(0,0,0);
     
     template.fields.forEach(field => {
        // Skip sender fields in body if handled in header
        if (template.type === TemplateType.LETTER && (field.key.includes('sender'))) return;
        // Skip logo field in body
        if (field.type === 'image') return;
        // Skip organization/university if handled in header
        if (field.key === 'organization' || field.key === 'university') return;

        if (cy > height - 30) { doc.addPage(); cy = margin; }

        const val = data[field.key];
        if (!val) return;

        if (field.type === 'textarea') {
            const isMainBody = ['content', 'body', 'summary', 'letter content'].some(k => field.key.toLowerCase().includes(k) || field.label.toLowerCase().includes(k));
            
            if (!isMainBody) {
                doc.setFont('helvetica', 'bold');
                doc.setFontSize(11);
                doc.setTextColor(50, 50, 50);
                doc.text(field.label, margin, cy);
                cy += 6;
            }
            
            doc.setFont('helvetica', 'normal');
            doc.setFontSize(11);
            doc.setTextColor(0, 0, 0);
            cy += writeWrappedText(doc, String(val), margin, cy, width - (margin*2));
            cy += 8;
        } else if (field.type === 'date') {
            doc.setFontSize(11);
            doc.text(String(val), width - margin, margin + 10, { align: 'right' });
        } else if (field.type !== 'items') {
            doc.setFont('helvetica', 'bold');
            doc.setFontSize(11);
            doc.text(`${field.label}:`, margin, cy);
            doc.setFont('helvetica', 'normal');
            doc.text(` ${val}`, margin + 5 + (field.label.length * 2.5), cy);
            cy += 8;
        }
     });
  }

  return doc.output('blob');
};

// WORD GENERATION LOGIC
export const generateWord = async (template: Template, data: DocumentData): Promise<Blob> => {
  let sections = [];

  // Determine Title Text (Override name for Invoice)
  const titleText = template.type === TemplateType.INVOICE ? "INVOICE" : template.name.toUpperCase();

  if (TABULAR_TYPES.includes(template.type)) {
     const items: InvoiceItem[] = data.items || [];
     const total = items.reduce((sum, item) => sum + (item.quantity * item.price), 0);

     // Header Fields - Allow specific textareas like address to appear in header
     const headerPars = template.fields
       .filter(f => f.type !== 'items' && f.type !== 'image' && (f.type !== 'textarea' || ['fromAddress', 'toAddress'].includes(f.key)))
       .map(f => new Paragraph({ 
          children: [
            new TextRun({ text: `${f.label}: `, bold: true }),
            new TextRun({ text: String(data[f.key] || '') })
          ],
          spacing: { after: 120 }
       }));
    
     const footerPars = template.fields
       .filter(f => f.type === 'textarea' && !['fromAddress', 'toAddress'].includes(f.key))
       .flatMap(f => [
          new Paragraph({ text: "" }),
          new Paragraph({ children: [new TextRun({ text: f.label, bold: true, color: "475569" })] }),
          new Paragraph({ text: data[f.key] || '' })
       ]);

     sections.push({
         properties: {},
         children: [
             new Paragraph({ 
               text: titleText, 
               heading: HeadingLevel.HEADING_1, 
               alignment: AlignmentType.RIGHT,
               spacing: { after: 300 }
             }),
             new Paragraph({ 
               children: [new TextRun({ text: "Document Details", bold: true, size: 28 })],
               border: { bottom: { style: BorderStyle.SINGLE, size: 6, space: 1, color: "E2E8F0" } },
               spacing: { after: 200 }
             }),
             ...headerPars,
             new Paragraph({ text: "" }),
             new Table({
                 width: { size: 100, type: WidthType.PERCENTAGE },
                 rows: [
                     new TableRow({
                         tableHeader: true,
                         children: [
                             new TableCell({ 
                               children: [new Paragraph({ children: [new TextRun({ text: "Description", bold: true })] })],
                               shading: { fill: "F1F5F9", type: ShadingType.CLEAR, color: "auto" }
                             }),
                             new TableCell({ 
                               children: [new Paragraph({ children: [new TextRun({ text: "Qty", bold: true })], alignment: AlignmentType.RIGHT })],
                               shading: { fill: "F1F5F9", type: ShadingType.CLEAR, color: "auto" }
                             }),
                             new TableCell({ 
                               children: [new Paragraph({ children: [new TextRun({ text: "Price", bold: true })], alignment: AlignmentType.RIGHT })],
                               shading: { fill: "F1F5F9", type: ShadingType.CLEAR, color: "auto" }
                             }),
                             new TableCell({ 
                               children: [new Paragraph({ children: [new TextRun({ text: "Total", bold: true })], alignment: AlignmentType.RIGHT })],
                               shading: { fill: "F1F5F9", type: ShadingType.CLEAR, color: "auto" }
                             }),
                         ],
                     }),
                     ...items.map(item => new TableRow({
                         children: [
                             new TableCell({ children: [new Paragraph(item.description)] }),
                             new TableCell({ children: [new Paragraph({ text: String(item.quantity), alignment: AlignmentType.RIGHT })] }),
                             new TableCell({ children: [new Paragraph({ text: Number(item.price).toFixed(2), alignment: AlignmentType.RIGHT })] }),
                             new TableCell({ children: [new Paragraph({ text: (Number(item.quantity) * Number(item.price)).toFixed(2), alignment: AlignmentType.RIGHT })] }),
                         ]
                     }))
                 ],
             }),
             new Paragraph({ text: "" }),
             new Paragraph({ 
               children: [
                 new TextRun({ text: "TOTAL: ", bold: true }),
                 new TextRun({ text: total.toFixed(2), bold: true })
               ],
               alignment: AlignmentType.RIGHT,
               spacing: { before: 200 }
             }),
             ...footerPars
         ]
     });
  } else {
     // Generic Text / Letter
     const contentPars = template.fields.flatMap(field => {
        const val = data[field.key];
        if (!val) return [];
        if (field.type === 'image') return [];

        if (field.type === 'textarea') {
           const elements = [];
           if (!['content', 'body', 'summary'].includes(field.key.toLowerCase())) {
             elements.push(new Paragraph({ 
               children: [new TextRun({ text: field.label, bold: true, color: "475569" })],
               spacing: { before: 200 } 
              }));
           }
           elements.push(new Paragraph({ text: val, spacing: { after: 200 } }));
           return elements;
        } else {
           return [new Paragraph({ 
             children: [
               new TextRun({ text: `${field.label}: `, bold: true }),
               new TextRun({ text: String(val) })
             ],
             spacing: { after: 100 }
           })];
        }
     });

     sections.push({
         properties: {},
         children: [
             new Paragraph({ 
               text: template.name, 
               heading: HeadingLevel.HEADING_1,
               border: { bottom: { style: BorderStyle.SINGLE, size: 6, space: 1, color: "000000" } },
               spacing: { after: 400 }
             }),
             ...contentPars
         ]
     });
  }

  const doc = new Document({
      sections: sections
  });

  return Packer.toBlob(doc);
};