import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TEMPLATES } from '../constants';
import { Template, InvoiceItem } from '../types';
import Button from '../components/Button';
import { Input, TextArea } from '../components/Input';
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
    // Pass data to preview page via state or context (simple passing via history state here)
    navigate('/preview', { state: { template, data: formData } });
  };

  if (!template) return <div>Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <div>
           <h2 className="text-2xl font-bold text-slate-900">{template.name}</h2>
           <p className="text-slate-500">Fill in the details below to generate your document.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-sm border border-slate-200 space-y-6">
        {template.fields.map((field) => {
          if (field.type === 'items') {
             return (
               <div key={field.key} className="space-y-4 pt-4 border-t border-slate-200">
                 <div className="flex justify-between items-center">
                   <label className="block text-sm font-bold text-slate-800">Items</label>
                 </div>
                 {(formData.items || []).map((item: any, idx: number) => (
                   <div key={idx} className="flex gap-2 items-start">
                     <div className="flex-grow">
                        <input
                          placeholder="Description"
                          className="w-full shadow-sm focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm border-slate-400 rounded-md p-2.5 border"
                          value={item.description}
                          onChange={(e) => handleItemChange(idx, 'description', e.target.value)}
                        />
                     </div>
                     <div className="w-20">
                        <input
                          type="number"
                          placeholder="Qty"
                          className="w-full shadow-sm focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm border-slate-400 rounded-md p-2.5 border"
                          value={item.quantity}
                          onChange={(e) => handleItemChange(idx, 'quantity', Number(e.target.value))}
                        />
                     </div>
                     <div className="w-24">
                        <input
                          type="number"
                          placeholder="Price"
                          className="w-full shadow-sm focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm border-slate-400 rounded-md p-2.5 border"
                          value={item.price}
                          onChange={(e) => handleItemChange(idx, 'price', Number(e.target.value))}
                        />
                     </div>
                     <button type="button" onClick={() => removeItem(idx)} className="p-2 text-red-500 hover:bg-red-50 rounded-md">
                       <Trash2 className="w-4 h-4" />
                     </button>
                   </div>
                 ))}
                 <Button type="button" variant="outline" size="sm" onClick={addItem}>
                   <Plus className="w-4 h-4 mr-2" /> Add Item
                 </Button>
               </div>
             )
          }

          if (field.type === 'textarea') {
            return (
              <TextArea
                key={field.key}
                label={field.label}
                placeholder={field.placeholder}
                value={formData[field.key] || ''}
                onChange={(e) => handleInputChange(field.key, e.target.value)}
                required={field.key !== 'notes'} // simplistic validation
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

        <div className="pt-6 flex justify-end">
          <Button type="submit" size="lg" className="w-full sm:w-auto">
            Preview Document <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </form>
    </div>
  );
};

export default FormPage;