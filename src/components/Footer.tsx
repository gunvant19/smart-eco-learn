import { useLanguage } from '@/contexts/LanguageContext';
import { Leaf, Facebook, Twitter, Instagram, Linkedin, Youtube } from 'lucide-react';

const Footer = () => {
  const { t } = useLanguage();

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Youtube, href: '#', label: 'YouTube' },
  ];

  return (
    <footer className="bg-eco-dark text-white py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center text-center">
          {/* Logo */}
          <div className="flex items-center gap-2 mb-6">
            <div className="p-2 rounded-xl bg-gradient-to-br from-eco-primary to-eco-secondary">
              <Leaf className="w-6 h-6 text-white" />
            </div>
            <span className="font-bold text-xl">EcoRecycle AI</span>
          </div>

          {/* Quote */}
          <blockquote className="text-2xl md:text-3xl font-light italic text-eco-accent mb-8 max-w-2xl">
            "{t('footerQuote')}"
          </blockquote>

          {/* Social Links */}
          <div className="flex items-center gap-4 mb-8">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.href}
                aria-label={social.label}
                className="p-3 rounded-full bg-white/10 hover:bg-eco-primary transition-colors duration-200"
              >
                <social.icon className="w-5 h-5" />
              </a>
            ))}
          </div>

          {/* Made with love */}
          <p className="text-white/60 text-sm mb-4">
            {t('madeWith')}
          </p>

          {/* Divider */}
          <div className="w-full max-w-md h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mb-4" />

          {/* Copyright */}
          <p className="text-white/40 text-xs">
            © {new Date().getFullYear()} EcoRecycle AI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
