import { useState, useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Upload, Sparkles, Trash2, Lightbulb, Leaf, Zap } from 'lucide-react';

interface ClassificationResult {
  category: string;
  categoryHi: string;
  categoryMr: string;
  binColor: string;
  binColorClass: string;
  instructions: string;
  instructionsHi: string;
  instructionsMr: string;
  impact: string;
  impactHi: string;
  impactMr: string;
  confidence: number;
  fact: string;
  factHi: string;
  factMr: string;
  suggestion: string;
  suggestionHi: string;
  suggestionMr: string;
}

const mockResults: ClassificationResult[] = [
  {
    category: 'Plastic',
    categoryHi: 'प्लास्टिक',
    categoryMr: 'प्लास्टिक',
    binColor: 'Blue Bin',
    binColorClass: 'bg-blue-500',
    instructions: 'Rinse, remove labels, and crush before recycling. Ensure it\'s clean and dry.',
    instructionsHi: 'रीसाइक्लिंग से पहले धोएं, लेबल हटाएं और कुचलें। सुनिश्चित करें कि यह साफ और सूखा हो।',
    instructionsMr: 'रिसायकलिंग करण्यापूर्वी स्वच्छ धुवा, लेबल काढा आणि चिरडून टाका.',
    impact: 'Recycling 1 plastic bottle saves enough energy to power a 60W bulb for 6 hours.',
    impactHi: '1 प्लास्टिक की बोतल का पुनर्चक्रण 60W बल्ब को 6 घंटे तक चलाने के लिए पर्याप्त ऊर्जा बचाता है।',
    impactMr: '1 प्लास्टिकची बाटली रिसायकल केल्याने 60W बल्ब 6 तास चालू ठेवण्याइतकी ऊर्जा वाचते.',
    confidence: 94,
    fact: 'Plastic takes 450+ years to decompose in landfills!',
    factHi: 'प्लास्टिक को लैंडफिल में विघटित होने में 450+ साल लगते हैं!',
    factMr: 'प्लास्टिकला कचराभूमीत विघटन होण्यास 450+ वर्षे लागतात!',
    suggestion: 'Consider switching to reusable water bottles to reduce plastic waste.',
    suggestionHi: 'प्लास्टिक कचरा कम करने के लिए पुन: प्रयोज्य पानी की बोतलों पर स्विच करने पर विचार करें।',
    suggestionMr: 'प्लास्टिक कचरा कमी करण्यासाठी पुन्हा वापरता येण्याजोग्या पाण्याच्या बाटल्या वापरण्याचा विचार करा.',
  },
  {
    category: 'Paper',
    categoryHi: 'कागज',
    categoryMr: 'कागद',
    binColor: 'Blue Bin',
    binColorClass: 'bg-blue-500',
    instructions: 'Keep dry, remove staples and plastic covers. Flatten cardboard boxes.',
    instructionsHi: 'सूखा रखें, स्टेपल और प्लास्टिक कवर हटाएं। कार्डबोर्ड बॉक्स को समतल करें।',
    instructionsMr: 'कोरडे ठेवा, स्टेपल आणि प्लास्टिक कव्हर काढून टाका. कार्डबोर्ड बॉक्स सपाट करा.',
    impact: 'Recycling 1 ton of paper saves 17 trees and 7,000 gallons of water.',
    impactHi: '1 टन कागज का पुनर्चक्रण 17 पेड़ों और 7,000 गैलन पानी की बचत करता है।',
    impactMr: '1 टन कागद रिसायकल केल्याने 17 झाडे आणि 7,000 गॅलन पाणी वाचते.',
    confidence: 97,
    fact: 'Paper can be recycled up to 7 times before fibers become too short!',
    factHi: 'कागज को 7 बार तक रीसायकल किया जा सकता है!',
    factMr: 'कागद 7 वेळा पर्यंत रिसायकल केला जाऊ शकतो!',
    suggestion: 'Print on both sides and use digital documents when possible.',
    suggestionHi: 'दोनों तरफ प्रिंट करें और जब संभव हो डिजिटल दस्तावेज़ों का उपयोग करें।',
    suggestionMr: 'दोन्ही बाजूंनी प्रिंट करा आणि शक्य असेल तेव्हा डिजिटल दस्तऐवज वापरा.',
  },
  {
    category: 'Glass',
    categoryHi: 'कांच',
    categoryMr: 'काच',
    binColor: 'Green Bin',
    binColorClass: 'bg-green-500',
    instructions: 'Rinse containers, remove lids. Separate by color if required in your area.',
    instructionsHi: 'कंटेनर को धोएं, ढक्कन हटाएं। अपने क्षेत्र में आवश्यक होने पर रंग के अनुसार अलग करें।',
    instructionsMr: 'कंटेनर स्वच्छ धुवा, झाकण काढून टाका. आवश्यक असल्यास रंगानुसार वेगळे करा.',
    impact: 'Glass is 100% recyclable and can be recycled endlessly without quality loss.',
    impactHi: 'कांच 100% पुनर्चक्रण योग्य है और गुणवत्ता हानि के बिना अंतहीन पुनर्चक्रण किया जा सकता है।',
    impactMr: 'काच 100% पुनर्वापरयोग्य आहे आणि गुणवत्ता न गमावता अमर्यादपणे रिसायकल केले जाऊ शकते.',
    confidence: 91,
    fact: 'A glass bottle takes 1 million years to decompose naturally!',
    factHi: 'एक कांच की बोतल को प्राकृतिक रूप से विघटित होने में 10 लाख साल लगते हैं!',
    factMr: 'काचेची बाटली नैसर्गिकरित्या विघटन होण्यास 10 लाख वर्षे लागतात!',
    suggestion: 'Reuse glass jars for storage before recycling them.',
    suggestionHi: 'कांच के जार को रीसायकल करने से पहले भंडारण के लिए पुन: उपयोग करें।',
    suggestionMr: 'रिसायकल करण्यापूर्वी काचेच्या बरण्या साठवणुकीसाठी पुन्हा वापरा.',
  },
];

const AIClassifier = () => {
  const { language, t } = useLanguage();
  const [image, setImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<ClassificationResult | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target?.result as string);
        analyzeImage();
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeImage = () => {
    setIsAnalyzing(true);
    setResult(null);
    
    // Simulate AI analysis
    setTimeout(() => {
      const randomResult = mockResults[Math.floor(Math.random() * mockResults.length)];
      setResult(randomResult);
      setIsAnalyzing(false);
    }, 2000);
  };

  const resetClassifier = () => {
    setImage(null);
    setResult(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const getLocalizedText = (en: string, hi: string, mr: string) => {
    if (language === 'hi') return hi;
    if (language === 'mr') return mr;
    return en;
  };

  return (
    <section id="classifier" className="py-20 bg-gradient-to-b from-background to-eco-light/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-eco-primary/10 text-eco-primary mb-4">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium">AI-Powered</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t('classifierTitle')}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t('classifierDesc')}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Upload Section */}
          <Card className="border-2 border-dashed border-eco-primary/30 bg-card hover:border-eco-primary/50 transition-colors">
            <CardContent className="p-8">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="image-upload"
              />
              
              {!image ? (
                <label
                  htmlFor="image-upload"
                  className="flex flex-col items-center justify-center min-h-[300px] cursor-pointer group"
                >
                  <div className="p-6 rounded-full bg-eco-light group-hover:bg-eco-primary/20 transition-colors mb-4">
                    <Upload className="w-12 h-12 text-eco-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">{t('uploadImage')}</h3>
                  <p className="text-muted-foreground text-center">{t('dragDrop')}</p>
                </label>
              ) : (
                <div className="space-y-4">
                  <div className="relative rounded-xl overflow-hidden">
                    <img
                      src={image}
                      alt="Uploaded waste"
                      className="w-full h-64 object-cover"
                    />
                    {isAnalyzing && (
                      <div className="absolute inset-0 bg-eco-dark/80 flex items-center justify-center">
                        <div className="text-center text-white">
                          <div className="w-16 h-16 border-4 border-eco-accent border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                          <p className="text-lg font-medium">{t('analyzing')}</p>
                        </div>
                      </div>
                    )}
                  </div>
                  <Button
                    variant="outline"
                    onClick={resetClassifier}
                    className="w-full gap-2 border-destructive/50 text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="w-4 h-4" />
                    Reset
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Results Section */}
          <div className="space-y-6">
            {result ? (
              <>
                {/* Main Result Card */}
                <Card className="bg-gradient-to-br from-eco-primary/10 to-eco-secondary/10 border-eco-primary/30 overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-3">
                        <div className={`w-4 h-4 rounded-full ${result.binColorClass}`} />
                        <div>
                          <p className="text-sm text-muted-foreground">{t('category')}</p>
                          <h3 className="text-2xl font-bold text-foreground">
                            {getLocalizedText(result.category, result.categoryHi, result.categoryMr)}
                          </h3>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">{t('confidence')}</p>
                        <p className="text-2xl font-bold text-eco-primary">{result.confidence}%</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-start gap-3 p-3 rounded-lg bg-background/50">
                        <div className={`w-8 h-8 rounded-lg ${result.binColorClass} flex items-center justify-center`}>
                          <Trash2 className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">{t('binColor')}</p>
                          <p className="text-foreground">{result.binColor}</p>
                        </div>
                      </div>

                      <div className="p-3 rounded-lg bg-background/50">
                        <p className="text-sm font-medium text-muted-foreground mb-1">{t('instructions')}</p>
                        <p className="text-foreground">
                          {getLocalizedText(result.instructions, result.instructionsHi, result.instructionsMr)}
                        </p>
                      </div>

                      <div className="flex items-start gap-3 p-3 rounded-lg bg-eco-accent/10">
                        <Leaf className="w-5 h-5 text-eco-primary mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">{t('impact')}</p>
                          <p className="text-foreground">
                            {getLocalizedText(result.impact, result.impactHi, result.impactMr)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Smart Suggestions */}
                <Card className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 border-amber-500/30">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <Lightbulb className="w-5 h-5 text-amber-500" />
                      <h4 className="font-semibold text-foreground">{t('didYouKnow')}</h4>
                    </div>
                    <p className="text-muted-foreground mb-4">
                      {getLocalizedText(result.fact, result.factHi, result.factMr)}
                    </p>
                    <div className="flex items-start gap-2 p-3 rounded-lg bg-background/50">
                      <Zap className="w-4 h-4 text-eco-primary mt-0.5" />
                      <p className="text-sm text-foreground">
                        {getLocalizedText(result.suggestion, result.suggestionHi, result.suggestionMr)}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </>
            ) : (
              <Card className="bg-muted/30 border-dashed min-h-[400px] flex items-center justify-center">
                <CardContent className="text-center p-8">
                  <Sparkles className="w-12 h-12 text-muted-foreground/50 mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    Upload an image to see AI classification results
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIClassifier;
