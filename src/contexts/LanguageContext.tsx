import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'hi' | 'mr';

interface Translations {
  [key: string]: {
    en: string;
    hi: string;
    mr: string;
  };
}

export const translations: Translations = {
  // Navbar
  home: { en: 'Home', hi: 'होम', mr: 'मुख्यपृष्ठ' },
  materials: { en: 'Materials', hi: 'सामग्री', mr: 'साहित्य' },
  classifier: { en: 'AI Classifier', hi: 'AI वर्गीकरण', mr: 'AI वर्गीकरण' },
  tips: { en: 'Tips', hi: 'सुझाव', mr: 'टिप्स' },
  dashboard: { en: 'Dashboard', hi: 'डैशबोर्ड', mr: 'डॅशबोर्ड' },
  
  // Hero
  heroTitle: { 
    en: 'Clean India, Green India', 
    hi: 'स्वच्छ भारत, हरित भारत', 
    mr: 'स्वच्छ भारत, हरित भारत' 
  },
  heroSubtitle: { 
    en: 'Harness the power of artificial intelligence to make recycling easier, smarter, and more impactful. Together, we can build a sustainable future.', 
    hi: 'रीसाइक्लिंग को आसान, स्मार्ट और अधिक प्रभावशाली बनाने के लिए कृत्रिम बुद्धिमत्ता की शक्ति का उपयोग करें।', 
    mr: 'रिसायकलिंग सोपे, स्मार्ट आणि अधिक प्रभावी करण्यासाठी कृत्रिम बुद्धिमत्तेची शक्ती वापरा.' 
  },
  tryClassifier: { en: 'Try AI Classifier', hi: 'AI वर्गीकरण आज़माएं', mr: 'AI वर्गीकरण वापरा' },
  chatWithBot: { en: 'Chat with AI Bot', hi: 'AI बॉट से चैट करें', mr: 'AI बॉट सोबत चॅट करा' },
  
  // Classifier
  classifierTitle: { en: 'AI Waste Classifier', hi: 'AI अपशिष्ट वर्गीकरण', mr: 'AI कचरा वर्गीकरण' },
  classifierDesc: { 
    en: 'Upload an image of your waste item and let our AI identify the correct recycling category.', 
    hi: 'अपनी अपशिष्ट वस्तु की छवि अपलोड करें और हमारी AI को सही रीसाइक्लिंग श्रेणी पहचानने दें।', 
    mr: 'तुमच्या कचऱ्याची प्रतिमा अपलोड करा आणि आमच्या AI ला योग्य रिसायकलिंग श्रेणी ओळखू द्या.' 
  },
  uploadImage: { en: 'Upload Image', hi: 'छवि अपलोड करें', mr: 'प्रतिमा अपलोड करा' },
  dragDrop: { en: 'Drag & drop or click to upload', hi: 'खींचें और छोड़ें या अपलोड करने के लिए क्लिक करें', mr: 'ड्रॅग आणि ड्रॉप करा किंवा अपलोड करण्यासाठी क्लिक करा' },
  analyzing: { en: 'Analyzing...', hi: 'विश्लेषण...', mr: 'विश्लेषण...' },
  category: { en: 'Category', hi: 'श्रेणी', mr: 'श्रेणी' },
  binColor: { en: 'Bin Color', hi: 'बिन का रंग', mr: 'डब्याचा रंग' },
  instructions: { en: 'Instructions', hi: 'निर्देश', mr: 'सूचना' },
  impact: { en: 'Environmental Impact', hi: 'पर्यावरणीय प्रभाव', mr: 'पर्यावरणीय प्रभाव' },
  confidence: { en: 'AI Confidence', hi: 'AI विश्वास', mr: 'AI विश्वास' },
  didYouKnow: { en: 'Did You Know?', hi: 'क्या आप जानते हैं?', mr: 'तुम्हाला माहीत आहे का?' },
  
  // Materials
  materialsTitle: { en: 'Recyclable Materials', hi: 'पुनर्चक्रण योग्य सामग्री', mr: 'पुनर्वापरयोग्य साहित्य' },
  materialsDesc: { 
    en: 'Learn about different types of recyclable materials and how to properly dispose of them.', 
    hi: 'विभिन्न प्रकार की पुनर्चक्रण योग्य सामग्रियों और उन्हें ठीक से निपटाने के तरीके के बारे में जानें।', 
    mr: 'विविध प्रकारच्या पुनर्वापरयोग्य साहित्याबद्दल आणि त्यांची योग्य विल्हेवाट कशी लावायची ते जाणून घ्या.' 
  },
  recycleMethod: { en: 'How to Recycle', hi: 'रीसायकल कैसे करें', mr: 'रिसायकल कसे करावे' },
  benefit: { en: 'Benefit', hi: 'लाभ', mr: 'फायदा' },
  
  // Tips
  tipsTitle: { en: 'Recycling Tips & Guidelines', hi: 'रीसाइक्लिंग टिप्स और दिशानिर्देश', mr: 'रिसायकलिंग टिप्स आणि मार्गदर्शक तत्त्वे' },
  dos: { en: "Do's", hi: 'करें', mr: 'करा' },
  donts: { en: "Don'ts", hi: 'न करें', mr: 'करू नका' },
  
  // Dashboard
  dashboardTitle: { en: 'Environmental Impact Dashboard', hi: 'पर्यावरणीय प्रभाव डैशबोर्ड', mr: 'पर्यावरणीय प्रभाव डॅशबोर्ड' },
  energySaved: { en: 'Energy Saved', hi: 'बचाई गई ऊर्जा', mr: 'वाचवलेली ऊर्जा' },
  wasteReduced: { en: 'Waste Reduced', hi: 'कम किया गया कचरा', mr: 'कमी केलेला कचरा' },
  carbonReduced: { en: 'Carbon Footprint Reduced', hi: 'कार्बन फुटप्रिंट कम', mr: 'कार्बन फूटप्रिंट कमी' },
  treesEquivalent: { en: 'Trees Equivalent', hi: 'पेड़ों के बराबर', mr: 'झाडांच्या समतुल्य' },
  
  // Chatbot
  chatbotGreeting: { 
    en: 'Hi! I\'m EcoBot 🌱 Ask me anything about recycling!', 
    hi: 'नमस्ते! मैं EcoBot हूं 🌱 मुझसे रीसाइक्लिंग के बारे में कुछ भी पूछें!', 
    mr: 'नमस्कार! मी EcoBot आहे 🌱 मला रिसायकलिंग बद्दल काहीही विचारा!' 
  },
  typeMessage: { en: 'Type your message...', hi: 'अपना संदेश लिखें...', mr: 'तुमचा संदेश टाइप करा...' },
  
  // Footer
  footerQuote: { 
    en: 'Small Actions, Big Environmental Impact.', 
    hi: 'छोटी कार्रवाई, बड़ा पर्यावरणीय प्रभाव।', 
    mr: 'लहान कृती, मोठा पर्यावरणीय प्रभाव.' 
  },
  madeWith: { en: 'Made with 💚 for a greener planet', hi: 'हरित ग्रह के लिए 💚 के साथ बनाया गया', mr: 'हिरव्या ग्रहासाठी 💚 ने बनवले' },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[key]?.[language] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
