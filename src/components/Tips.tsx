import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import { Check, X, Lightbulb } from 'lucide-react';

const dosData = [
  { en: 'Rinse containers before recycling', hi: 'रीसाइक्लिंग से पहले कंटेनर धोएं', mr: 'रिसायकलिंग करण्यापूर्वी कंटेनर धुवा' },
  { en: 'Flatten cardboard boxes to save space', hi: 'जगह बचाने के लिए कार्डबोर्ड बक्सों को समतल करें', mr: 'जागा वाचवण्यासाठी कार्डबोर्ड बॉक्स सपाट करा' },
  { en: 'Separate recyclables by material type', hi: 'सामग्री के प्रकार के अनुसार पुनर्चक्रण योग्य वस्तुओं को अलग करें', mr: 'साहित्याच्या प्रकारानुसार पुनर्वापरयोग्य वस्तू वेगळे करा' },
  { en: 'Check local recycling guidelines', hi: 'स्थानीय रीसाइक्लिंग दिशानिर्देश देखें', mr: 'स्थानिक रिसायकलिंग मार्गदर्शक तत्त्वे तपासा' },
  { en: 'Remove caps and lids from bottles', hi: 'बोतलों से ढक्कन हटाएं', mr: 'बाटल्यांवरील झाकणे काढून टाका' },
  { en: 'Donate usable items instead of discarding', hi: 'फेंकने के बजाय उपयोगी वस्तुएं दान करें', mr: 'फेकून देण्याऐवजी वापरण्यायोग्य वस्तू दान करा' },
];

const dontsData = [
  { en: 'Put food-contaminated items in recycling', hi: 'खाद्य-दूषित वस्तुओं को रीसाइक्लिंग में न डालें', mr: 'अन्न-दूषित वस्तू रिसायकलिंगमध्ये टाकू नका' },
  { en: 'Mix hazardous waste with regular trash', hi: 'खतरनाक कचरे को सामान्य कचरे के साथ न मिलाएं', mr: 'धोकादायक कचरा सामान्य कचऱ्यात मिसळू नका' },
  { en: 'Recycle plastic bags in curbside bins', hi: 'कर्बसाइड बिन में प्लास्टिक बैग न डालें', mr: 'कर्बसाइड डब्यांमध्ये प्लास्टिक पिशव्या टाकू नका' },
  { en: 'Throw electronics in regular garbage', hi: 'इलेक्ट्रॉनिक्स को सामान्य कचरे में न फेंकें', mr: 'इलेक्ट्रॉनिक्स सामान्य कचऱ्यात फेकू नका' },
  { en: 'Bag recyclables in plastic bags', hi: 'पुनर्चक्रण योग्य वस्तुओं को प्लास्टिक बैग में न डालें', mr: 'पुनर्वापरयोग्य वस्तू प्लास्टिक पिशव्यांमध्ये ठेवू नका' },
  { en: 'Ignore recycling symbols on products', hi: 'उत्पादों पर रीसाइक्लिंग चिह्नों को अनदेखा न करें', mr: 'उत्पादनांवरील रिसायकलिंग चिन्हांकडे दुर्लक्ष करू नका' },
];

const aiTips = [
  { en: 'Use AI-powered apps to scan and identify recyclables', hi: 'पुनर्चक्रण योग्य वस्तुओं को स्कैन और पहचानने के लिए AI-संचालित ऐप्स का उपयोग करें', mr: 'पुनर्वापरयोग्य वस्तू स्कॅन आणि ओळखण्यासाठी AI-संचालित अॅप्स वापरा' },
  { en: 'Smart bins with AI can auto-sort your waste', hi: 'AI के साथ स्मार्ट बिन आपके कचरे को स्वचालित रूप से सॉर्ट कर सकते हैं', mr: 'AI सह स्मार्ट डबे तुमचा कचरा स्वयंचलितपणे वर्गीकृत करू शकतात' },
  { en: 'AI helps track your recycling impact over time', hi: 'AI समय के साथ आपके रीसाइक्लिंग प्रभाव को ट्रैक करने में मदद करता है', mr: 'AI कालांतराने तुमच्या रिसायकलिंग प्रभावाचा मागोवा घेण्यास मदत करतो' },
  { en: 'Machine learning optimizes collection routes', hi: 'मशीन लर्निंग संग्रह मार्गों को अनुकूलित करता है', mr: 'मशीन लर्निंग संकलन मार्ग अनुकूल करतो' },
];

const Tips = () => {
  const { language, t } = useLanguage();

  const getLocalizedText = (obj: { en: string; hi: string; mr: string }) => {
    if (language === 'hi') return obj.hi;
    if (language === 'mr') return obj.mr;
    return obj.en;
  };

  return (
    <section id="tips" className="py-20 bg-gradient-to-b from-eco-light/30 to-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t('tipsTitle')}
          </h2>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Do's */}
          <Card className="bg-gradient-to-br from-eco-primary/5 to-eco-primary/10 border-eco-primary/30">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-eco-primary/20">
                  <Check className="w-5 h-5 text-eco-primary" />
                </div>
                <h3 className="text-xl font-bold text-eco-primary">{t('dos')}</h3>
              </div>
              <ul className="space-y-4">
                {dosData.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="mt-1 p-1 rounded-full bg-eco-primary/20">
                      <Check className="w-3 h-3 text-eco-primary" />
                    </div>
                    <span className="text-foreground">{getLocalizedText(item)}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Don'ts */}
          <Card className="bg-gradient-to-br from-destructive/5 to-destructive/10 border-destructive/30">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-destructive/20">
                  <X className="w-5 h-5 text-destructive" />
                </div>
                <h3 className="text-xl font-bold text-destructive">{t('donts')}</h3>
              </div>
              <ul className="space-y-4">
                {dontsData.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="mt-1 p-1 rounded-full bg-destructive/20">
                      <X className="w-3 h-3 text-destructive" />
                    </div>
                    <span className="text-foreground">{getLocalizedText(item)}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* AI Tips */}
          <Card className="bg-gradient-to-br from-eco-secondary/5 to-eco-secondary/10 border-eco-secondary/30">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-eco-secondary/20">
                  <Lightbulb className="w-5 h-5 text-eco-secondary" />
                </div>
                <h3 className="text-xl font-bold text-eco-secondary">AI Tips</h3>
              </div>
              <ul className="space-y-4">
                {aiTips.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="mt-1 p-1 rounded-full bg-eco-secondary/20">
                      <Lightbulb className="w-3 h-3 text-eco-secondary" />
                    </div>
                    <span className="text-foreground">{getLocalizedText(item)}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Tips;
