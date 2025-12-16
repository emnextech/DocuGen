import React from 'react';
import { Link } from 'react-router-dom';
import { TEMPLATES } from '../constants';
import { TemplateCategory } from '../types';
import { ArrowRight } from 'lucide-react';

const TemplateSelector: React.FC = () => {
  // Group templates by category
  const categories = Object.values(TemplateCategory);
  
  return (
    <div className="space-y-12">
      <div>
        <h2 className="text-3xl font-bold text-slate-900">Document Templates</h2>
        <p className="text-slate-500 mt-2">Choose from our professional collection of templates.</p>
      </div>

      {categories.map(category => {
        const categoryTemplates = TEMPLATES.filter(t => t.category === category);
        
        if (categoryTemplates.length === 0) return null;

        return (
          <div key={category} className="space-y-6">
            <h3 className="text-xl font-bold text-slate-800 border-b border-slate-200 pb-2">
              {category}
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categoryTemplates.map((template) => (
                <Link key={template.id} to={`/create/${template.id}`} className="group">
                  <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow duration-300 flex flex-col h-full">
                    <div className={`h-40 ${template.color} flex items-center justify-center`}>
                       <span className="text-white text-opacity-70 font-bold text-2xl uppercase tracking-wider text-center px-4">
                         {template.name}
                       </span>
                    </div>
                    <div className="p-6 flex flex-col flex-grow">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-bold text-lg text-slate-900 group-hover:text-indigo-600 transition-colors">
                          {template.name}
                        </h3>
                      </div>
                      <p className="text-slate-500 text-sm mb-4 flex-grow">
                        {template.description}
                      </p>
                      <div className="flex items-center text-indigo-600 font-medium text-sm mt-auto">
                        Start Creating <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TemplateSelector;