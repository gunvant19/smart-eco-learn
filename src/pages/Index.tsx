import { LanguageProvider } from '@/contexts/LanguageContext';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import RecyclableMaterials from '@/components/RecyclableMaterials';
import AIClassifier from '@/components/AIClassifier';
import Tips from '@/components/Tips';
import Dashboard from '@/components/Dashboard';
import Chatbot from '@/components/Chatbot';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-background">
        <Navbar />
        <main>
          <Hero />
          <RecyclableMaterials />
          <AIClassifier />
          <Tips />
          <Dashboard />
        </main>
        <Footer />
        <Chatbot />
      </div>
    </LanguageProvider>
  );
};

export default Index;
