import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface NavbarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export default function Navbar({
  activeSection,
  onNavigate
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'About', id: 'about' },
    { label: 'Menu', id: 'menu' },
    { label: 'Gallery', id: 'gallery' },
    { label: 'Contact', id: 'contact' },
  ];

  const handleNavItemClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-natural-border bg-white/95 backdrop-blur-md">
      {/* Top Banner Accent */}
      <div className="hidden lg:flex justify-between items-center px-8 py-2 border-b border-natural-border/50 text-[11px] font-semibold tracking-wider text-natural-mutedtext uppercase">
        <div>✨ Welcome to Abraham — Savor Authentic Ethiopian Flavors</div>
        <div className="flex gap-6">
          <span>📍 Bole Road, Ward 03, Addis Ababa, Ethiopia</span>
          <span>📞 +251 11 663 ABRAHAM</span>
        </div>
      </div>

      <div className="flex items-center justify-between px-6 py-4 md:px-12">
        {/* Left Links (Desktop) */}
        <div className="hidden md:flex items-center gap-8 text-[12px] font-bold uppercase tracking-widest text-natural-mediumsage">
          {navItems.slice(0, 2).map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavItemClick(item.id)}
              className="hover:text-natural-dark transition-colors duration-200 cursor-pointer relative py-1"
            >
              {item.label}
              {activeSection === item.id && (
                <motion.span
                  layoutId="activeIndicator"
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-natural-sage"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Center Logo - Asta */}
        <div className="flex-1 md:flex-none text-left md:text-center">
          <button
            onClick={() => handleNavItemClick('hero')}
            className="serif-display text-3xl font-black uppercase tracking-tighter hover:opacity-80 transition-opacity cursor-pointer text-natural-moss border-0 bg-transparent"
          >
            abraham<span className="text-natural-sage font-bold font-sans">.</span>
          </button>
        </div>

        {/* Right Links & Mobile Trigger */}
        <div className="flex items-center gap-8 text-[12px] font-bold uppercase tracking-widest text-natural-mediumsage">
          <div className="hidden md:flex items-center gap-8">
            {navItems.slice(2).map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavItemClick(item.id)}
                className="hover:text-natural-dark transition-colors duration-200 cursor-pointer relative py-1"
              >
                {item.label}
                {activeSection === item.id && (
                  <motion.span
                    layoutId="activeIndicator"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-natural-sage"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Menu icon (mobile) */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1 text-natural-dark hover:text-natural-moss transition-colors md:hidden cursor-pointer"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6 stroke-[1.75]" />
            ) : (
              <Menu className="w-6 h-6 stroke-[1.75]" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="md:hidden border-t border-natural-border bg-white overflow-hidden shadow-lg"
          >
            <div className="flex flex-col px-6 py-6 space-y-3 bg-[#F5F2EA]">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavItemClick(item.id)}
                  className={`text-left py-3 px-4 rounded-xl text-xs font-black uppercase tracking-widest transition-all border border-transparent cursor-pointer ${
                    activeSection === item.id 
                      ? 'bg-natural-sage text-white shadow-xs' 
                      : 'text-natural-dark hover:bg-white/55 hover:text-natural-sage'
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <div className="pt-4 border-t border-natural-border/50 text-[10px] text-natural-dark font-bold space-y-2 px-4">
                <p className="flex items-center gap-2">📍 Bole Road, Addis Ababa</p>
                <p className="flex items-center gap-2">📞 +251 11 663 ABRAHAM</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

