import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, Link, useSearchParams } from 'react-router-dom';
import { Template, DocumentData } from '../types';
import { TEMPLATES } from '../constants';
import Button from '../components/Button';
import { Download, ArrowLeft, Loader2, ExternalLink } from 'lucide-react';
import { generatePDF } from '../services/documentGenerator';

// Helper to decode data from URL
const decodeData = (str: string) => {
  try {
    return JSON.parse(decodeURIComponent(escape(window.atob(str))));
  } catch (e) {
    console.error('Decoding error', e);
    return null;
  }
};

const PreviewPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  
  // Local state for template and data (can come from router state OR URL params)
  const [template, setTemplate] = useState<Template | null>(null);
  const [data, setData] = useState<DocumentData | null>(null);
  
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize Data
  useEffect(() => {
    const routerState = location.state as { template: Template; data: DocumentData } | null;

    if (routerState?.template && routerState?.data) {
      setTemplate(routerState.template);
      setData(routerState.data);
    } else {
      // Try to read from URL query param 'q'
      const q = searchParams.get('q');
      if (q) {
        const decoded = decodeData(q);
        if (decoded && decoded.t && decoded.d) {
          const foundTemplate = TEMPLATES.find(t => t.id === decoded.t);
          if (foundTemplate) {
            setTemplate(foundTemplate);
            setData(decoded.d);
            return;
          }
        }
      }
      // If neither, redirect
      navigate('/templates');
    }
  }, [location.state, searchParams, navigate]);

  // Generate Preview whenever template/data is set
  useEffect(() => {
    if (!template || !data) return;

    const generatePreview = async () => {
      setIsLoading(true);
      try {
        const blob = await generatePDF(template, data);
        const url = URL.createObjectURL(blob);
        setPdfUrl(url);
      } catch (err) {
        console.error(err);
        alert("Error generating preview. Please check console.");
      } finally {
        setIsLoading(false);
      }
    };

    generatePreview();

    return () => {
      // Clean up blob URL
      if (pdfUrl) URL.revokeObjectURL(pdfUrl);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [template, data]); 

  const handleDownload = async () => {
    if (!template || !data) return;
    
    const filename = `${template.name.replace(/\s+/g, '_')}_${Date.now()}.pdf`;
    const blob = await generatePDF(template, data);

    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleOpenNewTab = () => {
    if (pdfUrl) {
      window.open(pdfUrl, '_blank');
    }
  };

  if (!template || !data) return (
    <div className="flex justify-center items-center min-h-screen">
      <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
           {/* If we came from create, show back to edit. If from share link, show create new */}
           {location.state ? (
             <Link to={`/create/${template.id}`} className="text-slate-500 hover:text-indigo-600 flex items-center mb-2 text-sm">
               <ArrowLeft className="w-4 h-4 mr-1" /> Back to Edit
             </Link>
           ) : (
             <Link to="/templates" className="text-slate-500 hover:text-indigo-600 flex items-center mb-2 text-sm">
               <ArrowLeft className="w-4 h-4 mr-1" /> Create New
             </Link>
           )}
           <h2 className="text-2xl font-bold text-slate-900">Document Preview</h2>
        </div>
        <div className="flex flex-wrap gap-3">
           {pdfUrl && (
            <Button onClick={handleOpenNewTab} variant="outline">
              <ExternalLink className="w-4 h-4 mr-2" />
              Open in New Tab
            </Button>
           )}
          <Button onClick={handleDownload}>
            <Download className="w-4 h-4 mr-2" />
            PDF
          </Button>
        </div>
      </div>

      <div className="bg-slate-200 rounded-xl p-4 sm:p-8 min-h-[600px] flex items-center justify-center border border-slate-300 shadow-inner">
        {isLoading ? (
          <div className="flex flex-col items-center text-slate-500">
            <Loader2 className="w-8 h-8 animate-spin mb-2" />
            <p>Generating Preview...</p>
          </div>
        ) : (
          pdfUrl ? (
            <object 
              data={pdfUrl} 
              type="application/pdf"
              className="w-full h-[800px] rounded shadow-lg bg-white"
            >
              <div className="flex flex-col items-center justify-center h-full text-slate-500 gap-4 p-4 text-center">
                <p>Unable to display PDF directly in this frame.</p>
                <Button onClick={handleOpenNewTab} variant="primary">
                   Open PDF in New Tab
                </Button>
              </div>
            </object>
          ) : (
            <div className="text-red-500">Failed to load preview</div>
          )
        )}
      </div>
    </div>
  );
};

export default PreviewPage;