import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
}

interface ImageUploadProps {
  label: string;
  value?: string;
  onImageSelect: (base64: string) => void;
  className?: string;
}

const inputClasses = "block w-full rounded-md border border-slate-300 bg-white py-2.5 px-3 text-slate-900 placeholder-slate-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm";
const labelClasses = "block text-sm font-semibold text-slate-700 mb-1.5";

export const Input: React.FC<InputProps> = ({ label, className = '', ...props }) => {
  return (
    <div className="w-full">
      <label className={labelClasses}>{label}</label>
      <input
        className={`${inputClasses} ${className}`}
        {...props}
      />
    </div>
  );
};

export const TextArea: React.FC<TextAreaProps> = ({ label, className = '', ...props }) => {
  return (
    <div className="w-full">
      <label className={labelClasses}>{label}</label>
      <textarea
        className={`${inputClasses} ${className}`}
        rows={4}
        {...props}
      />
    </div>
  );
};

export const ImageUpload: React.FC<ImageUploadProps> = ({ label, value, onImageSelect, className = '' }) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          onImageSelect(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="w-full">
      <label className={labelClasses}>{label}</label>
      <div className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-slate-300 border-dashed rounded-md hover:border-indigo-500 transition-colors bg-slate-50 ${className}`}>
        <div className="space-y-1 text-center">
          {value ? (
            <div className="relative">
                <img src={value} alt="Preview" className="mx-auto h-32 object-contain mb-4 rounded-md bg-white shadow-sm p-2 border border-slate-200" />
                <button 
                    type="button" 
                    onClick={(e) => {
                        e.preventDefault();
                        onImageSelect('');
                    }}
                    className="text-xs text-red-600 hover:text-red-800 font-medium bg-white px-2 py-1 rounded shadow-sm border border-red-100"
                >
                    Remove Logo
                </button>
            </div>
          ) : (
            <>
              <svg className="mx-auto h-12 w-12 text-slate-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <div className="flex text-sm text-slate-600 justify-center">
                <label className="relative cursor-pointer bg-slate-50 rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                  <span>Upload a file</span>
                  <input type="file" className="sr-only" accept="image/*" onChange={handleFileChange} />
                </label>
              </div>
              <p className="text-xs text-slate-500">PNG, JPG, GIF up to 5MB</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};