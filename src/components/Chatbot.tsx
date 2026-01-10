import { useState, useRef, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { MessageCircle, X, Send, Bot, User, Sparkles } from 'lucide-react';

interface Message {
  id: number;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

interface ChatResponse {
  en: string;
  hi: string;
  mr: string;
}

const chatResponses: { [key: string]: ChatResponse } = {
  plastic: {
    en: '♻️ Yes, most plastics are recyclable! Look for recycling symbols (1-7) on the bottom. Clean and dry them before placing in the blue bin. Avoid recycling plastic bags in curbside bins - take them to special collection points.',
    hi: '♻️ हां, अधिकांश प्लास्टिक पुनर्चक्रण योग्य हैं! तली में रीसाइक्लिंग प्रतीक (1-7) देखें। उन्हें नीले बिन में डालने से पहले साफ और सूखा करें।',
    mr: '♻️ होय, बहुतेक प्लास्टिक पुनर्वापरयोग्य आहेत! तळाशी रिसायकलिंग चिन्हे (1-7) पहा. निळ्या डब्यात टाकण्यापूर्वी ते स्वच्छ आणि कोरडे करा.',
  },
  bin: {
    en: '🗑️ Here\'s a quick guide:\n• Blue Bin: Paper, plastic, metal, glass\n• Green Bin: Organic waste, food scraps\n• Black/Gray: Non-recyclable waste\n• Special: E-waste, batteries, hazardous items\n\nAlways check local guidelines as they may vary!',
    hi: '🗑️ यहां एक त्वरित मार्गदर्शिका है:\n• नीला बिन: कागज, प्लास्टिक, धातु, कांच\n• हरा बिन: जैविक कचरा, खाद्य स्क्रैप\n• काला/ग्रे: गैर-पुनर्चक्रण योग्य कचरा',
    mr: '🗑️ येथे एक द्रुत मार्गदर्शक आहे:\n• निळा डबा: कागद, प्लास्टिक, धातू, काच\n• हिरवा डबा: सेंद्रिय कचरा, अन्न\n• काळा/राखाडी: पुनर्वापर न होणारा कचरा',
  },
  ai: {
    en: '🤖 AI is revolutionizing recycling in many ways:\n\n1. Smart Waste Sorting: AI-powered robots can sort recyclables 2x faster than humans\n2. Contamination Detection: Cameras + AI identify contaminated items\n3. Route Optimization: AI plans efficient collection routes\n4. Material Recognition: Apps use AI to identify recyclable items\n5. Predictive Analytics: Forecasting waste patterns for better management',
    hi: '🤖 AI कई तरीकों से रीसाइक्लिंग में क्रांति ला रहा है:\n\n1. स्मार्ट अपशिष्ट छंटाई\n2. संदूषण पता लगाना\n3. मार्ग अनुकूलन\n4. सामग्री पहचान\n5. भविष्य कहनेवाला विश्लेषण',
    mr: '🤖 AI अनेक प्रकारे रिसायकलिंगमध्ये क्रांती घडवत आहे:\n\n1. स्मार्ट कचरा वर्गीकरण\n2. दूषित पदार्थ शोधणे\n3. मार्ग अनुकूलन\n4. साहित्य ओळख\n5. भविष्यवाणी विश्लेषण',
  },
  tips: {
    en: '💡 Top recycling tips:\n\n1. Rinse containers before recycling\n2. Flatten cardboard boxes\n3. Remove caps from bottles\n4. Never put plastic bags in recycling bins\n5. Check recycling symbols\n6. When in doubt, leave it out!',
    hi: '💡 शीर्ष रीसाइक्लिंग टिप्स:\n\n1. रीसाइक्लिंग से पहले कंटेनर धोएं\n2. कार्डबोर्ड बक्सों को समतल करें\n3. बोतलों से ढक्कन हटाएं\n4. प्लास्टिक बैग को रीसाइक्लिंग बिन में कभी न डालें',
    mr: '💡 शीर्ष रिसायकलिंग टिप्स:\n\n1. रिसायकलिंग करण्यापूर्वी कंटेनर धुवा\n2. कार्डबोर्ड बॉक्स सपाट करा\n3. बाटल्यांवरील झाकणे काढा\n4. प्लास्टिक पिशव्या रिसायकलिंग डब्यात टाकू नका',
  },
  ewaste: {
    en: '📱 E-waste requires special handling!\n\n• Never put electronics in regular trash\n• Take to certified e-waste recycling centers\n• Many electronics stores offer take-back programs\n• E-waste contains valuable metals that can be recovered\n• Improper disposal causes toxic pollution',
    hi: '📱 ई-कचरे को विशेष हैंडलिंग की आवश्यकता है!\n\n• इलेक्ट्रॉनिक्स को कभी भी सामान्य कचरे में न डालें\n• प्रमाणित ई-कचरा रीसाइक्लिंग केंद्रों में ले जाएं',
    mr: '📱 ई-कचऱ्याला विशेष हाताळणी आवश्यक आहे!\n\n• इलेक्ट्रॉनिक्स कधीही सामान्य कचऱ्यात टाकू नका\n• प्रमाणित ई-कचरा रिसायकलिंग केंद्रांवर घेऊन जा',
  },
  default: {
    en: '🌱 Great question! I\'m here to help with recycling queries. You can ask me about:\n\n• Which materials are recyclable\n• How to properly sort waste\n• Which bin to use\n• How AI helps in recycling\n• E-waste disposal\n• Recycling tips and guidelines\n\nWhat would you like to know?',
    hi: '🌱 बढ़िया सवाल! मैं रीसाइक्लिंग प्रश्नों में मदद करने के लिए यहां हूं। आप मुझसे पूछ सकते हैं:\n\n• कौन सी सामग्री पुनर्चक्रण योग्य है\n• कचरे को ठीक से कैसे सॉर्ट करें',
    mr: '🌱 छान प्रश्न! मी रिसायकलिंग प्रश्नांमध्ये मदत करण्यासाठी येथे आहे. तुम्ही मला विचारू शकता:\n\n• कोणते साहित्य पुनर्वापरयोग्य आहे\n• कचरा योग्यरित्या कसा वर्गीकृत करावा',
  },
};

const Chatbot = () => {
  const { language, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          id: 1,
          text: t('chatbotGreeting'),
          isBot: true,
          timestamp: new Date(),
        },
      ]);
    }
  }, [isOpen, t]);

  const getResponse = (input: string): string => {
    const lowerInput = input.toLowerCase();
    let response: ChatResponse;

    if (lowerInput.includes('plastic') || lowerInput.includes('प्लास्टिक')) {
      response = chatResponses.plastic;
    } else if (lowerInput.includes('bin') || lowerInput.includes('बिन') || lowerInput.includes('डबा')) {
      response = chatResponses.bin;
    } else if (lowerInput.includes('ai') || lowerInput.includes('artificial') || lowerInput.includes('कृत्रिम')) {
      response = chatResponses.ai;
    } else if (lowerInput.includes('tip') || lowerInput.includes('टिप') || lowerInput.includes('सुझाव')) {
      response = chatResponses.tips;
    } else if (lowerInput.includes('e-waste') || lowerInput.includes('electronic') || lowerInput.includes('ई-कचरा')) {
      response = chatResponses.ewaste;
    } else {
      response = chatResponses.default;
    }

    return response[language];
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: input,
      isBot: false,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI response delay
    setTimeout(() => {
      const botMessage: Message = {
        id: messages.length + 2,
        text: getResponse(input),
        isBot: true,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <>
      {/* Floating Button */}
      <button
        id="chatbot-trigger"
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-50 p-4 rounded-full bg-gradient-to-r from-eco-primary to-eco-secondary text-white shadow-eco hover:shadow-eco-lg transition-all duration-300 hover:scale-110 ${
          isOpen ? 'hidden' : 'flex'
        }`}
      >
        <MessageCircle className="w-6 h-6" />
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-eco-accent rounded-full animate-pulse" />
      </button>

      {/* Chat Window */}
      {isOpen && (
        <Card className="fixed bottom-6 right-6 z-50 w-[380px] h-[500px] flex flex-col bg-card border-border shadow-2xl animate-scale-in overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between p-4 bg-gradient-to-r from-eco-primary to-eco-secondary text-white">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-white/20">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold">EcoBot</h3>
                <p className="text-xs text-white/80 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-eco-accent animate-pulse" />
                  Online
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-white/20"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-muted/20">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex items-start gap-2 ${
                  message.isBot ? '' : 'flex-row-reverse'
                }`}
              >
                <div
                  className={`p-2 rounded-full ${
                    message.isBot
                      ? 'bg-eco-primary/20 text-eco-primary'
                      : 'bg-muted text-foreground'
                  }`}
                >
                  {message.isBot ? (
                    <Bot className="w-4 h-4" />
                  ) : (
                    <User className="w-4 h-4" />
                  )}
                </div>
                <div
                  className={`max-w-[75%] p-3 rounded-2xl ${
                    message.isBot
                      ? 'bg-card border border-border rounded-tl-none'
                      : 'bg-eco-primary text-white rounded-tr-none'
                  }`}
                >
                  <p className="text-sm whitespace-pre-line">{message.text}</p>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-start gap-2">
                <div className="p-2 rounded-full bg-eco-primary/20 text-eco-primary">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="bg-card border border-border p-3 rounded-2xl rounded-tl-none">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 rounded-full bg-eco-primary animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 rounded-full bg-eco-primary animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 rounded-full bg-eco-primary animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-border bg-card">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-2"
            >
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={t('typeMessage')}
                className="flex-1 border-border focus:ring-eco-primary"
              />
              <Button
                type="submit"
                size="icon"
                disabled={!input.trim()}
                className="bg-eco-primary hover:bg-eco-secondary text-white"
              >
                <Send className="w-4 h-4" />
              </Button>
            </form>
            <p className="text-xs text-muted-foreground text-center mt-2 flex items-center justify-center gap-1">
              <Sparkles className="w-3 h-3" />
              Powered by AI
            </p>
          </div>
        </Card>
      )}
    </>
  );
};

export default Chatbot;
