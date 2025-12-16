import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TEMPLATES } from '../constants';
import { Template, InvoiceItem } from '../types';
import Button from '../components/Button';
import { Input, TextArea, ImageUpload } from '../components/Input';
import { Trash2, Plus, ArrowRight } from 'lucide-react';

const FormPage: React.FC = () => {
  const { templateId } = useParams();
  const navigate = useNavigate();
  const [template, setTemplate] = useState<Template | null>(null);
  const [formData, setFormData] = useState<any>({});
  
  useEffect(() => {
    const found = TEMPLATES.find(t => t.id === templateId);
    if (found) {
      setTemplate(found);
      // Initialize items array if invoice
      if (found.type === 'invoice' || found.type === 'purchase_order' || found.type === 'expense_report' || found.type === 'sales_report') {
        setFormData({ items: [{ description: '', quantity: 1, price: 0 }] });
      }
    } else {
      navigate('/templates');
    }
  }, [templateId, navigate]);

  const handleInputChange = (key: string, value: any) => {
    setFormData((prev: any) => ({ ...prev, [key]: value }));
  };

  const handleItemChange = (index: number, field: keyof InvoiceItem, value: any) => {
    const newItems = [...(formData.items || [])];
    newItems[index] = { ...newItems[index], [field]: value };
    setFormData((prev: any) => ({ ...prev, items: newItems }));
  };

  const addItem = () => {
    setFormData((prev: any) => ({
      ...prev,
      items: [...(prev.items || []), { description: '', quantity: 1, price: 0 }]
    }));
  };

  const removeItem = (index: number) => {
    const newItems = [...(formData.items || [])];
    newItems.splice(index, 1);
    setFormData((prev: any) => ({ ...prev, items: newItems }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Pass data to preview page via state or context
    navigate('/preview', { state: { template, data: formData } });
  };

  // Reusing the same classes as Input component for consistency
  const inputClasses = "block w-full rounded-md border border-slate-300 bg-white py-2.5 px-3 text-slate-900 placeholder-slate-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm";

  if (!template) return <div>Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <div>
           <h2 className="text-2xl font-bold text-slate-900">{template.name}</h2>
           <p className="text-slate-500 mt-1">Fill in the details below to generate your document.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-sm border border-slate-200 space-y-6">
        {template.fields.map((field) => {
          if (field.type === 'items') {
             return (
               <div key={field.key} className="space-y-4 pt-6 mt-2 border-t border-slate-100">
                 <div className="flex justify-between items-center mb-2">
                   <label className="block text-sm font-semibold text-slate-700">Items List</label>
                 </div>
                 
                 {/* Item List Headers - Visible on larger screens */}
                 <div className="hidden sm:flex gap-3 px-1 mb-1">
                    <label className="flex-grow text-xs font-semibold text-slate-500 uppercase tracking-wider">Description</label>
                    <label className="w-24 text-xs font-semibold text-slate-500 uppercase tracking-wider">Quantity</label>
                    <label className="w-32 text-xs font-semibold text-slate-500 uppercase tracking-wider">Price</label>
                    <div className="w-10"></div> {/* Spacer for delete button */}
                 </div>

                 {(formData.items || []).map((item: any, idx: number) => (
                   <div key={idx} className="flex gap-3 items-start">
                     <div className="flex-grow">
                        <label className="sm:hidden text-xs font-semibold text-slate-500 uppercase mb-1 block">Description</label>
                        <input
                          placeholder="Description"
                          className={inputClasses}
                          value={item.description}
                          onChange={(e) => handleItemChange(idx, 'description', e.target.value)}
                        />
                     </div>
                     <div className="w-24">
                        <label className="sm:hidden text-xs font-semibold text-slate-500 uppercase mb-1 block">Qty</label>
                        <input
                          type="number"
                          placeholder="Qty"
                          className={inputClasses}
                          value={item.quantity}
                          onChange={(e) => handleItemChange(idx, 'quantity', Number(e.target.value))}
                        />
                     </div>
                     <div className="w-32">
                        <label className="sm:hidden text-xs font-semibold text-slate-500 uppercase mb-1 block">Price</label>
                        <input
                          type="number"
                          placeholder="Price"
                          className={inputClasses}
                          value={item.price}
                          onChange={(e) => handleItemChange(idx, 'price', Number(e.target.value))}
                        />
                     </div>
                     <div className="pt-0 sm:pt-0 self-end sm:self-center">
                        <button type="button" onClick={() => removeItem(idx)} className="p-2.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors">
                          <Trash2 className="w-5 h-5" />
                        </button>
                     </div>
                   </div>
                 ))}
                 <Button type="button" variant="outline" size="sm" onClick={addItem} className="mt-2">
                   <Plus className="w-4 h-4 mr-2" /> Add Item
                 </Button>
               </div>
             )
          }

          if (field.type === 'image') {
            return (
              <ImageUpload
                key={field.key}
                label={field.label}
                value={formData[field.key]}
                onImageSelect={(base64) => handleInputChange(field.key, base64)}
              />
            );
          }

          if (field.type === 'textarea') {
            return (
              <TextArea
                key={field.key}
                label={field.label}
                placeholder={field.placeholder}
                value={formData[field.key] || ''}
                onChange={(e) => handleInputChange(field.key, e.target.value)}
                required={field.key !== 'notes'} 
              />
            );
          }

          return (
            <Input
              key={field.key}
              label={field.label}
              type={field.type}
              placeholder={field.placeholder}
              value={formData[field.key] || ''}
              onChange={(e) => handleInputChange(field.key, e.target.value)}
              required={field.key !== 'notes'}
            />
          );
        })}

        <div className="pt-8 flex justify-end">
          <Button type="submit" size="lg" className="w-full sm:w-auto font-semibold shadow-md">
            Preview Document <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </form>
    </div>
  );
};

export default FormPage;