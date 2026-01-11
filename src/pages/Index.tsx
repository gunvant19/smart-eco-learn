import { LanguageProvider } from '@/contexts/LanguageContext';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import RecyclableMaterials from '@/components/RecyclableMaterials';
import AIClassifier from '@/components/AIClassifier';
import Tips from '@/components/Tips';
import Gamification from '@/components/Gamification';
import Dashboard from '@/components/Dashboard';
import Collaborations from '@/components/Collaborations';
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
          <Gamification />
          <Dashboard />
          <Collaborations />
        </main>
        <Footer />
        <Chatbot />
      </div>
    </LanguageProvider>
  );
};

export default Index;
