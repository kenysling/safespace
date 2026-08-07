import React, { useState } from 'react';
import { mockCompanies } from './data/mockCompanies';
import { CompanyProfile } from './types';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { CompanyDirectory } from './components/CompanyDirectory';
import { CompanyProfileModal } from './components/CompanyProfileModal';
import { SmartMatchWizard } from './components/SmartMatchWizard';
import { QuoteComparator } from './components/QuoteComparator';
import { BudgetCalculator } from './components/BudgetCalculator';
import { HomeownerTrustPortal } from './components/HomeownerTrustPortal';
import { DisputeResolutionSection } from './components/DisputeResolutionSection';
import { BusinessCanvasModal } from './components/BusinessCanvasModal';
import { AiAssistantDrawer } from './components/AiAssistantDrawer';
import { Footer } from './components/Footer';
import { DisqusComments } from './components/DisqusComments';

export function App() {
  const [activeTab, setActiveTab] = useState<'directory' | 'matching' | 'quote' | 'calculator' | 'dispute' | 'portal'>('directory');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCompany, setSelectedCompany] = useState<CompanyProfile | null>(null);
  const [shortlistedIds, setShortlistedIds] = useState<string[]>(['spacesense-interior', 'craftsmen-co']);
  
  // Modals & Drawers
  const [isBusinessCanvasOpen, setIsBusinessCanvasOpen] = useState<boolean>(false);
  const [isAiDrawerOpen, setIsAiDrawerOpen] = useState<boolean>(false);
  const [aiInitialPrompt, setAiInitialPrompt] = useState<string>('');

  const handleToggleShortlist = (companyId: string) => {
    setShortlistedIds((prev) =>
      prev.includes(companyId) ? prev.filter((id) => id !== companyId) : [...prev, companyId]
    );
  };

  const openAiAssistantForCompany = (company: CompanyProfile) => {
    setAiInitialPrompt(`Provide me 3 specific tough questions I should ask ${company.name} (UEN: ${company.uen}) regarding CaseTrust deposit terms and carpentry warranties.`);
    setIsAiDrawerOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased flex flex-col selection:bg-teal-500 selection:text-white">
      
      {/* Top Header Navigation Bar */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        shortlistCount={shortlistedIds.length}
        openBusinessCanvas={() => setIsBusinessCanvasOpen(true)}
        openAiDrawer={() => {
          setAiInitialPrompt('');
          setIsAiDrawerOpen(true);
        }}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {/* Main Content Body */}
      <main className="flex-1">
        
        {/* Render Hero Banner only when on main directory tab */}
        {activeTab === 'directory' && (
          <Hero
            onSearch={(query) => {
              setSearchQuery(query);
              setActiveTab('directory');
            }}
            onOpenMatch={() => setActiveTab('matching')}
            onOpenQuote={() => setActiveTab('quote')}
            onOpenBusinessCanvas={() => setIsBusinessCanvasOpen(true)}
          />
        )}

        {/* Tab 1: Directory */}
        {activeTab === 'directory' && (
          <CompanyDirectory
            companies={mockCompanies}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onSelectCompany={(company) => setSelectedCompany(company)}
            shortlistedIds={shortlistedIds}
            onToggleShortlist={handleToggleShortlist}
          />
        )}

        {/* Tab 2: Smart Match Wizard */}
        {activeTab === 'matching' && (
          <SmartMatchWizard
            companies={mockCompanies}
            onSelectCompany={(company) => setSelectedCompany(company)}
            shortlistedIds={shortlistedIds}
            onToggleShortlist={handleToggleShortlist}
          />
        )}

        {/* Tab 3: Quote Comparator & AI Auditor */}
        {activeTab === 'quote' && <QuoteComparator />}

        {/* Tab 4: Budget Calculator */}
        {activeTab === 'calculator' && <BudgetCalculator />}

        {/* Tab 5: Dispute Resolution & Mediation */}
        {activeTab === 'dispute' && <DisputeResolutionSection />}

        {/* Tab 6: Homeowner Shortlist & Protection Portal */}
        {activeTab === 'portal' && (
          <HomeownerTrustPortal
            companies={mockCompanies}
            shortlistedIds={shortlistedIds}
            onToggleShortlist={handleToggleShortlist}
            onSelectCompany={(company) => setSelectedCompany(company)}
          />
        )}

        {/* Disqus Community Thread on Home Page */}
        {activeTab === 'directory' && (
          <section className="max-w-6xl mx-auto px-4 py-8">
            <DisqusComments
              pageUrl="https://https-safespace-lemon-vercel-app.disqus.com"
              pageIdentifier="safespace-home-discussion"
              title="Singapore Homeowner & Renovation Community Forum"
            />
          </section>
        )}

      </main>

      {/* Footer */}
      <Footer
        onOpenBusinessCanvas={() => setIsBusinessCanvasOpen(true)}
        setActiveTab={setActiveTab}
      />

      {/* Modals & Slide-over Drawers */}
      <CompanyProfileModal
        company={selectedCompany}
        onClose={() => setSelectedCompany(null)}
        isShortlisted={selectedCompany ? shortlistedIds.includes(selectedCompany.id) : false}
        onToggleShortlist={handleToggleShortlist}
        openAiAssistantForCompany={openAiAssistantForCompany}
      />

      <BusinessCanvasModal
        isOpen={isBusinessCanvasOpen}
        onClose={() => setIsBusinessCanvasOpen(false)}
      />

      <AiAssistantDrawer
        isOpen={isAiDrawerOpen}
        onClose={() => setIsAiDrawerOpen(false)}
        initialPrompt={aiInitialPrompt}
      />

    </div>
  );
}

export default App;
