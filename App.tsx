import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import TemplateSelector from './pages/TemplateSelector';
import FormPage from './pages/FormPage';
import PreviewPage from './pages/PreviewPage';

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/templates" element={<TemplateSelector />} />
          <Route path="/create/:templateId" element={<FormPage />} />
          <Route path="/preview" element={<PreviewPage />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;