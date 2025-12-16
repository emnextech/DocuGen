import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import { FileCheck, Layout, Download } from 'lucide-react';

const HomePage: React.FC = () => {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="text-center space-y-6 pt-10">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
          Create professional documents <br />
          <span className="text-indigo-600">in seconds, not hours.</span>
        </h1>
        <p className="text-xl text-slate-500 max-w-2xl mx-auto">
          Generate Invoices, Letters, and Certificates with our easy-to-use templates. 
          Fill out simple forms and export to PDF instantly.
        </p>
        <div className="flex justify-center gap-4">
          <Link to="/templates">
            <Button size="lg" className="px-8 py-3 text-base">Browse Templates</Button>
          </Link>
        </div>
      </section>

      {/* Features Grid */}
      <section className="grid md:grid-cols-3 gap-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 text-center">
          <div className="bg-blue-50 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
            <FileCheck className="text-blue-600 w-6 h-6" />
          </div>
          <h3 className="font-bold text-lg text-slate-900 mb-2">Professional Templates</h3>
          <p className="text-slate-500">Choose from a variety of handcrafted templates designed for business needs.</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 text-center">
          <div className="bg-purple-50 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
            <Layout className="text-purple-600 w-6 h-6" />
          </div>
          <h3 className="font-bold text-lg text-slate-900 mb-2">Smart Formatting</h3>
          <p className="text-slate-500">Automatically formats your data into professional layouts suitable for any business context.</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 text-center">
          <div className="bg-green-50 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
            <Download className="text-green-600 w-6 h-6" />
          </div>
          <h3 className="font-bold text-lg text-slate-900 mb-2">Instant Export</h3>
          <p className="text-slate-500">Download your documents in PDF format with a single click.</p>
        </div>
      </section>
    </div>
  );
};

export default HomePage;