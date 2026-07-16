import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="bg-[#F5F2EA] border-t border-natural-border/80 pt-16 pb-8 px-6 md:px-12 mt-0">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand info */}
        <div className="lg:col-span-2 space-y-4">
          <button
            onClick={() => onNavigate('hero')}
            className="serif-display text-3xl font-black lowercase tracking-tight hover:opacity-80 transition-opacity cursor-pointer text-natural-dark border-0 bg-transparent"
          >
            abraham<span className="text-natural-sage font-bold font-sans">.</span>
          </button>
          <p className="text-xs text-natural-dark leading-relaxed max-w-sm font-medium">
            Abraham is a premium wood-fired and charcoal culinary destination in Addis Ababa. We prepare and serve authentic, gourmet Ethiopian recipes crafted with attention to artistic quality and fresh local ingredients.
          </p>
          <div className="space-y-2 text-xs text-natural-dark font-bold">
            <div className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-natural-sage" />
              <span>Bole Road, Ward 03, Addis Ababa, Ethiopia</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-natural-sage" />
              <span>+251 11 663 ABRAHAM</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-natural-sage" />
              <span>welcome@abraham-addis.com</span>
            </div>
          </div>
        </div>

        {/* Links Column 1 */}
        <div className="space-y-4">
          <h4 className="text-[11px] font-black uppercase tracking-widest text-natural-dark border-b border-natural-border pb-1">Navigation</h4>
          <ul className="space-y-2 text-xs text-natural-dark font-bold">
            <li><button onClick={() => onNavigate('about')} className="hover:text-natural-sage transition-colors cursor-pointer border-0 bg-transparent p-0 text-left">About Us</button></li>
            <li><button onClick={() => onNavigate('menu')} className="hover:text-natural-sage transition-colors cursor-pointer border-0 bg-transparent p-0 text-left">Interactive Menu</button></li>
            <li><button onClick={() => onNavigate('gallery')} className="hover:text-natural-sage transition-colors cursor-pointer border-0 bg-transparent p-0 text-left">Visual Gallery</button></li>
            <li><button onClick={() => onNavigate('contact')} className="hover:text-natural-sage transition-colors cursor-pointer border-0 bg-transparent p-0 text-left">Contact & Hours</button></li>
          </ul>
        </div>

        {/* Links Column 3 */}
        <div className="space-y-4">
          <h4 className="text-[11px] font-black uppercase tracking-widest text-natural-dark border-b border-natural-border pb-1">Social Connections</h4>
          <ul className="space-y-2 text-xs text-natural-dark font-bold">
            <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-natural-sage transition-colors">Instagram</a></li>
            <li><a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-natural-sage transition-colors">Facebook</a></li>
            <li><a href="https://telegram.org" target="_blank" rel="noopener noreferrer" className="hover:text-natural-sage transition-colors">Telegram Channel</a></li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto border-t border-natural-border mt-16 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] font-bold text-natural-dark uppercase tracking-widest">
        <div>© {new Date().getFullYear()} Abraham | Addis Ababa, Ethiopia</div>
        <div className="flex gap-6">
          <span className="text-natural-sage">Savor the Experience</span>
        </div>
      </div>
    </footer>
  );
}
