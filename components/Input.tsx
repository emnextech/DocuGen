import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
}

export const Input: React.FC<InputProps> = ({ label, className = '', ...props }) => {
  return (
    <div className="w-full">
      <label className="block text-sm font-bold text-slate-800 mb-1">{label}</label>
      <input
        className={`shadow-sm focus:ring-indigo-600 focus:border-indigo-600 block w-full sm:text-sm border-slate-400 rounded-md p-2.5 border bg-white text-slate-900 placeholder:text-slate-400 ${className}`}
        {...props}
      />
    </div>
  );
};

export const TextArea: React.FC<TextAreaProps> = ({ label, className = '', ...props }) => {
  return (
    <div className="w-full">
      <label className="block text-sm font-bold text-slate-800 mb-1">{label}</label>
      <textarea
        className={`shadow-sm focus:ring-indigo-600 focus:border-indigo-600 block w-full sm:text-sm border-slate-400 rounded-md p-2.5 border bg-white text-slate-900 placeholder:text-slate-400 ${className}`}
        rows={4}
        {...props}
      />
    </div>
  );
};