import React from 'react';
import Navbar from './Navbar';
import { Github, Instagram, Facebook, Heart } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />
      <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
      <footer className="bg-white border-t border-slate-200 py-8 mt-auto">
        <div className="max-w-7xl mx-auto px-4 flex flex-col items-center gap-4 text-center">
          <p className="text-slate-500 text-sm">
            &copy; {new Date().getFullYear()} DocuGen. Built for efficiency.
          </p>
          
          <p className="text-slate-500 text-sm flex items-center justify-center gap-1 flex-wrap">
            Made with <Heart className="w-4 h-4 text-red-500 fill-current" /> by{' '}
            <a 
              href="https://github.com/emnextech" 
              target="_blank" 
              rel="noopener noreferrer"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              emnextech
            </a>
          </p>

          <div className="flex items-center gap-6 mt-2">
            <a 
              href="https://github.com/emnextech" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-slate-800 transition-colors"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5" />
            </a>
            <a 
              href="https://www.instagram.com/emnex31/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-pink-600 transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a 
              href="https://web.facebook.com/profile.php?id=61583652779828" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-blue-600 transition-colors"
              aria-label="Facebook"
            >
              <Facebook className="w-5 h-5" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;