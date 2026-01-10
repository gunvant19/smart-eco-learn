import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';

// Import material images
import paperImg from '@/assets/materials/paper.jpg';
import plasticImg from '@/assets/materials/plastic.jpg';
import glassImg from '@/assets/materials/glass.jpg';
import metalImg from '@/assets/materials/metal.jpg';
import ewasteImg from '@/assets/materials/ewaste.jpg';
import organicImg from '@/assets/materials/organic.jpg';
import textileImg from '@/assets/materials/textile.jpg';
import rubberImg from '@/assets/materials/rubber.jpg';
import woodImg from '@/assets/materials/wood.jpg';
import specialImg from '@/assets/materials/special.jpg';

const materials = [
  {
    image: paperImg,
    name: { en: 'Paper & Cardboard', hi: 'कागज और कार्डबोर्ड', mr: 'कागद आणि कार्डबोर्ड' },
    binColor: 'Blue',
    binClass: 'bg-blue-500',
    method: { 
      en: 'Flatten boxes, keep dry, remove staples', 
      hi: 'बक्सों को समतल करें, सूखा रखें, स्टेपल हटाएं',
      mr: 'बॉक्स सपाट करा, कोरडे ठेवा, स्टेपल काढून टाका'
    },
    benefit: { 
      en: 'Saves trees and reduces landfill waste', 
      hi: 'पेड़ों की बचत और लैंडफिल कचरा कम करता है',
      mr: 'झाडे वाचवतो आणि कचराभूमी कमी करतो'
    },
  },
  {
    image: plasticImg,
    name: { en: 'Plastic', hi: 'प्लास्टिक', mr: 'प्लास्टिक' },
    binColor: 'Blue',
    binClass: 'bg-blue-500',
    method: { 
      en: 'Rinse, crush bottles, check recycling codes', 
      hi: 'धोएं, बोतलें कुचलें, रीसाइक्लिंग कोड देखें',
      mr: 'धुवा, बाटल्या चिरडा, रिसायकलिंग कोड तपासा'
    },
    benefit: { 
      en: 'Reduces ocean pollution and oil consumption', 
      hi: 'समुद्री प्रदूषण और तेल की खपत कम करता है',
      mr: 'समुद्र प्रदूषण आणि तेल वापर कमी करतो'
    },
  },
  {
    image: glassImg,
    name: { en: 'Glass', hi: 'कांच', mr: 'काच' },
    binColor: 'Green',
    binClass: 'bg-green-500',
    method: { 
      en: 'Rinse containers, separate by color', 
      hi: 'कंटेनर धोएं, रंग के अनुसार अलग करें',
      mr: 'कंटेनर धुवा, रंगानुसार वेगळे करा'
    },
    benefit: { 
      en: '100% recyclable infinitely without quality loss', 
      hi: 'गुणवत्ता हानि के बिना 100% अनंत पुनर्चक्रण योग्य',
      mr: 'गुणवत्ता न गमावता 100% अमर्यादपणे पुनर्वापरयोग्य'
    },
  },
  {
    image: metalImg,
    name: { en: 'Metal', hi: 'धातु', mr: 'धातू' },
    binColor: 'Blue',
    binClass: 'bg-blue-500',
    method: { 
      en: 'Rinse cans, crush if possible', 
      hi: 'डिब्बे धोएं, संभव हो तो कुचलें',
      mr: 'डबे धुवा, शक्य असल्यास चिरडा'
    },
    benefit: { 
      en: 'Saves 95% energy compared to new production', 
      hi: 'नए उत्पादन की तुलना में 95% ऊर्जा बचाता है',
      mr: 'नवीन उत्पादनाच्या तुलनेत 95% ऊर्जा वाचवतो'
    },
  },
  {
    image: ewasteImg,
    name: { en: 'E-Waste', hi: 'ई-कचरा', mr: 'ई-कचरा' },
    binColor: 'Special',
    binClass: 'bg-purple-500',
    method: { 
      en: 'Take to certified e-waste centers only', 
      hi: 'केवल प्रमाणित ई-कचरा केंद्रों में ले जाएं',
      mr: 'फक्त प्रमाणित ई-कचरा केंद्रात घेऊन जा'
    },
    benefit: { 
      en: 'Recovers precious metals, prevents toxic pollution', 
      hi: 'कीमती धातुओं की पुनर्प्राप्ति, विषैले प्रदूषण को रोकता है',
      mr: 'मौल्यवान धातू परत मिळवतो, विषारी प्रदूषण टाळतो'
    },
  },
  {
    image: organicImg,
    name: { en: 'Organic / Compostable', hi: 'जैविक / खाद योग्य', mr: 'सेंद्रिय / कंपोस्टेबल' },
    binColor: 'Green',
    binClass: 'bg-green-600',
    method: { 
      en: 'Separate food waste, use compost bins', 
      hi: 'खाद्य अपशिष्ट अलग करें, खाद के डिब्बे का उपयोग करें',
      mr: 'अन्न कचरा वेगळे करा, कंपोस्ट डबे वापरा'
    },
    benefit: { 
      en: 'Creates nutrient-rich soil, reduces methane', 
      hi: 'पोषक तत्वों से भरपूर मिट्टी बनाता है, मीथेन कम करता है',
      mr: 'पोषक तत्वांनी समृद्ध माती तयार करतो, मिथेन कमी करतो'
    },
  },
  {
    image: textileImg,
    name: { en: 'Textile', hi: 'कपड़ा', mr: 'कापड' },
    binColor: 'Special',
    binClass: 'bg-pink-500',
    method: { 
      en: 'Donate or take to textile recycling centers', 
      hi: 'दान करें या कपड़ा रीसाइक्लिंग केंद्रों में ले जाएं',
      mr: 'दान करा किंवा कापड रिसायकलिंग केंद्रात घेऊन जा'
    },
    benefit: { 
      en: 'Reduces water usage and landfill waste', 
      hi: 'पानी के उपयोग और लैंडफिल कचरे को कम करता है',
      mr: 'पाणी वापर आणि कचराभूमी कचरा कमी करतो'
    },
  },
  {
    image: rubberImg,
    name: { en: 'Rubber', hi: 'रबर', mr: 'रबर' },
    binColor: 'Special',
    binClass: 'bg-gray-700',
    method: { 
      en: 'Take old tires to recycling facilities', 
      hi: 'पुराने टायरों को रीसाइक्लिंग सुविधाओं में ले जाएं',
      mr: 'जुने टायर रिसायकलिंग सुविधांमध्ये घेऊन जा'
    },
    benefit: { 
      en: 'Used in playgrounds, roads, and new products', 
      hi: 'खेल के मैदानों, सड़कों और नए उत्पादों में उपयोग किया जाता है',
      mr: 'खेळाचे मैदान, रस्ते आणि नवीन उत्पादनांमध्ये वापरले जाते'
    },
  },
  {
    image: woodImg,
    name: { en: 'Wood', hi: 'लकड़ी', mr: 'लाकूड' },
    binColor: 'Special',
    binClass: 'bg-amber-700',
    method: { 
      en: 'Untreated wood can be composted or recycled', 
      hi: 'अनुपचारित लकड़ी को खाद बनाया या पुनर्चक्रित किया जा सकता है',
      mr: 'उपचार न केलेले लाकूड कंपोस्ट किंवा रिसायकल केले जाऊ शकते'
    },
    benefit: { 
      en: 'Reused in furniture, mulch, and biomass energy', 
      hi: 'फर्नीचर, मल्च और बायोमास ऊर्जा में पुन: उपयोग',
      mr: 'फर्निचर, मल्च आणि बायोमास ऊर्जेमध्ये पुन्हा वापरले जाते'
    },
  },
  {
    image: specialImg,
    name: { en: 'Special Recyclables', hi: 'विशेष पुनर्चक्रण योग्य', mr: 'विशेष पुनर्वापरयोग्य' },
    binColor: 'Special',
    binClass: 'bg-indigo-500',
    method: { 
      en: 'Batteries, CFLs, medicines - special disposal', 
      hi: 'बैटरी, सीएफएल, दवाइयां - विशेष निपटान',
      mr: 'बॅटरी, सीएफएल, औषधे - विशेष विल्हेवाट'
    },
    benefit: { 
      en: 'Prevents hazardous contamination of environment', 
      hi: 'पर्यावरण के खतरनाक संदूषण को रोकता है',
      mr: 'पर्यावरणाचे धोकादायक प्रदूषण रोखतो'
    },
  },
];

const RecyclableMaterials = () => {
  const { language, t } = useLanguage();

  const getLocalizedText = (obj: { en: string; hi: string; mr: string }) => {
    if (language === 'hi') return obj.hi;
    if (language === 'mr') return obj.mr;
    return obj.en;
  };

  return (
    <section id="materials" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t('materialsTitle')}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t('materialsDesc')}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {materials.map((material, index) => (
            <Card
              key={index}
              className="group hover:shadow-eco transition-all duration-300 hover:-translate-y-1 bg-card border-border overflow-hidden"
            >
              {/* Material Image */}
              <div className="relative h-40 overflow-hidden">
                <img 
                  src={material.image} 
                  alt={getLocalizedText(material.name)}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className={`absolute top-3 right-3 px-3 py-1 rounded-full text-white text-xs font-medium ${material.binClass}`}>
                  {material.binColor}
                </div>
              </div>

              <CardContent className="p-5">
                <h3 className="text-lg font-semibold text-foreground mb-3">
                  {getLocalizedText(material.name)}
                </h3>

                <div className="space-y-3">
                  <div>
                    <p className="text-xs font-medium text-eco-primary uppercase tracking-wide mb-1">
                      {t('recycleMethod')}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {getLocalizedText(material.method)}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-border">
                    <p className="text-xs font-medium text-eco-secondary uppercase tracking-wide mb-1">
                      {t('benefit')}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {getLocalizedText(material.benefit)}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecyclableMaterials;
