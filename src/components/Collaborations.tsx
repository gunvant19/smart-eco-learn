import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import { Building2, Leaf, Globe, Users, Handshake, Award } from 'lucide-react';

const Collaborations = () => {
  const { t } = useLanguage();

  const partners = [
    {
      icon: Building2,
      name: { en: 'Municipal Corporation', hi: 'नगर निगम', mr: 'महानगरपालिका' },
      type: { en: 'Government Body', hi: 'सरकारी निकाय', mr: 'सरकारी संस्था' },
      desc: { 
        en: 'Official waste management partner providing collection services and recycling infrastructure.', 
        hi: 'संग्रहण सेवाएं और रीसाइक्लिंग बुनियादी ढांचा प्रदान करने वाला आधिकारिक कचरा प्रबंधन भागीदार।',
        mr: 'संकलन सेवा आणि रिसायकलिंग पायाभूत सुविधा पुरवणारा अधिकृत कचरा व्यवस्थापन भागीदार.'
      },
      color: 'from-blue-500/20 to-blue-600/20',
      iconColor: 'text-blue-500',
    },
    {
      icon: Leaf,
      name: { en: 'Green Earth Foundation', hi: 'हरित पृथ्वी फाउंडेशन', mr: 'ग्रीन अर्थ फाउंडेशन' },
      type: { en: 'Environmental NGO', hi: 'पर्यावरण NGO', mr: 'पर्यावरण NGO' },
      desc: { 
        en: 'Leading environmental organization supporting awareness campaigns and educational programs.', 
        hi: 'जागरूकता अभियान और शैक्षिक कार्यक्रमों का समर्थन करने वाला अग्रणी पर्यावरण संगठन।',
        mr: 'जागरूकता मोहिम आणि शैक्षणिक कार्यक्रमांना समर्थन देणारी अग्रगण्य पर्यावरण संस्था.'
      },
      color: 'from-green-500/20 to-green-600/20',
      iconColor: 'text-green-500',
    },
    {
      icon: Globe,
      name: { en: 'Clean India Mission', hi: 'स्वच्छ भारत मिशन', mr: 'स्वच्छ भारत मिशन' },
      type: { en: 'National Initiative', hi: 'राष्ट्रीय पहल', mr: 'राष्ट्रीय उपक्रम' },
      desc: { 
        en: 'Aligned with government clean initiative to promote sustainable waste management across India.', 
        hi: 'पूरे भारत में टिकाऊ अपशिष्ट प्रबंधन को बढ़ावा देने के लिए सरकारी स्वच्छ पहल के साथ गठबंधन।',
        mr: 'संपूर्ण भारतात शाश्वत कचरा व्यवस्थापनाला प्रोत्साहन देण्यासाठी सरकारी स्वच्छ उपक्रमाशी संरेखित.'
      },
      color: 'from-orange-500/20 to-orange-600/20',
      iconColor: 'text-orange-500',
    },
    {
      icon: Users,
      name: { en: 'Community Recyclers Network', hi: 'सामुदायिक रीसाइक्लर्स नेटवर्क', mr: 'समुदाय रिसायकलर्स नेटवर्क' },
      type: { en: 'Community Organization', hi: 'सामुदायिक संगठन', mr: 'समुदाय संस्था' },
      desc: { 
        en: 'Network of local recyclers and waste collectors ensuring last-mile collection services.', 
        hi: 'स्थानीय रीसाइक्लर्स और कचरा संग्रहकर्ताओं का नेटवर्क जो लास्ट-माइल संग्रहण सेवाएं सुनिश्चित करता है।',
        mr: 'स्थानिक रिसायकलर्स आणि कचरा गोळा करणाऱ्यांचे नेटवर्क जे लास्ट-माईल संकलन सेवा सुनिश्चित करते.'
      },
      color: 'from-purple-500/20 to-purple-600/20',
      iconColor: 'text-purple-500',
    },
    {
      icon: Award,
      name: { en: 'EcoTech Solutions', hi: 'इकोटेक सॉल्यूशंस', mr: 'इकोटेक सोल्यूशन्स' },
      type: { en: 'Technology Partner', hi: 'टेक्नोलॉजी पार्टनर', mr: 'टेक्नोलॉजी पार्टनर' },
      desc: { 
        en: 'AI and technology partner powering our smart waste classification and tracking systems.', 
        hi: 'हमारे स्मार्ट अपशिष्ट वर्गीकरण और ट्रैकिंग सिस्टम को शक्ति प्रदान करने वाला AI और प्रौद्योगिकी भागीदार।',
        mr: 'आमच्या स्मार्ट कचरा वर्गीकरण आणि ट्रॅकिंग सिस्टमला शक्ती देणारा AI आणि तंत्रज्ञान भागीदार.'
      },
      color: 'from-cyan-500/20 to-cyan-600/20',
      iconColor: 'text-cyan-500',
    },
    {
      icon: Handshake,
      name: { en: 'Waste Management Association', hi: 'अपशिष्ट प्रबंधन संघ', mr: 'कचरा व्यवस्थापन संघटना' },
      type: { en: 'Industry Association', hi: 'उद्योग संघ', mr: 'उद्योग संघटना' },
      desc: { 
        en: 'Industry body setting standards and best practices for sustainable waste management.', 
        hi: 'टिकाऊ अपशिष्ट प्रबंधन के लिए मानक और सर्वोत्तम प्रथाओं को स्थापित करने वाला उद्योग निकाय।',
        mr: 'शाश्वत कचरा व्यवस्थापनासाठी मानके आणि सर्वोत्तम पद्धती सेट करणारी उद्योग संस्था.'
      },
      color: 'from-pink-500/20 to-pink-600/20',
      iconColor: 'text-pink-500',
    },
  ];

  const { language } = useLanguage();

  const getLocalizedText = (obj: { en: string; hi: string; mr: string }) => {
    if (language === 'hi') return obj.hi;
    if (language === 'mr') return obj.mr;
    return obj.en;
  };

  return (
    <section id="collaborations" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t('collaborationsTitle')}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t('collaborationsDesc')}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {partners.map((partner, index) => (
            <Card 
              key={index}
              className={`group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br ${partner.color} border-border overflow-hidden`}
            >
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-xl bg-background/80 ${partner.iconColor}`}>
                    <partner.icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      {getLocalizedText(partner.type)}
                    </span>
                    <h3 className="text-lg font-semibold text-foreground mt-1 mb-2">
                      {getLocalizedText(partner.name)}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {getLocalizedText(partner.desc)}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to action */}
        <div className="mt-12 text-center">
          <Card className="inline-block bg-gradient-to-r from-eco-primary/10 to-eco-secondary/10 border-eco-primary/30">
            <CardContent className="p-6 sm:p-8">
              <h3 className="text-xl font-bold text-foreground mb-2">
                {t('becomePartner')}
              </h3>
              <p className="text-muted-foreground mb-4 max-w-md">
                {t('partnerDesc')}
              </p>
              <a 
                href="mailto:partners@ecorecycle.in"
                className="inline-flex items-center gap-2 px-6 py-3 bg-eco-primary hover:bg-eco-primary/90 text-white rounded-lg font-medium transition-colors"
              >
                <Handshake className="w-4 h-4" />
                {t('contactUs')}
              </a>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Collaborations;
