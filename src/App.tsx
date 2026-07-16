import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowUpRight, 
  Instagram, 
  Facebook, 
  Send, 
  Star, 
  Clock, 
  Flame, 
  MapPin, 
  Phone, 
  Mail, 
  Compass, 
  Sparkles, 
  Check,
  ArrowUp
} from 'lucide-react';
import { Dish } from './types';
import { DISHES } from './data';
import Navbar from './components/Navbar';
import DishDetailModal from './components/DishDetailModal';
import MenuGallery from './components/MenuGallery';
import Footer from './components/Footer';
import GMap from './components/GMap';

export default function App() {
  const [selectedDish, setSelectedDish] = useState<Dish | null>(null);
  const [activeSection, setActiveSection] = useState('hero'); // Functions as currentPage router: 'hero'/'home', 'about', 'menu', 'gallery', 'contact'
  const [userName, setUserName] = useState('');
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Smooth scroll to top on page navigation
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [activeSection]);

  // Handle scroll event to show/hide "Back to Top" button
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigate = (id: string) => {
    // If navigating to 'hero' or 'home', we treat both as the home view
    if (id === 'hero' || id === 'home') {
      setActiveSection('hero');
    } else {
      setActiveSection(id);
    }
  };

  // Helper to open details modal of a dish by ID
  const openDishById = (id: string) => {
    const found = DISHES.find(d => d.id === id);
    if (found) setSelectedDish(found);
  };

  return (
    <div className="min-h-screen bg-natural-paper selection:bg-natural-sage selection:text-white flex flex-col overflow-x-hidden text-natural-dark">
      {/* Navigation */}
      <Navbar
        activeSection={activeSection}
        onNavigate={handleNavigate}
      />

      {/* Main Page Area with Route transitions */}
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            {/* HOME VIEW (activeSection === 'hero' or 'home') */}
            {(activeSection === 'hero' || activeSection === 'home') && (
              <div className="space-y-16">
                {/* SECTION 1: HERO */}
                <section className="relative px-6 md:px-12 py-16 md:py-24 max-w-7xl mx-auto overflow-hidden">
                  <div className="text-center space-y-10">
                    {/* Main Hero Header with infinite spinning salad decorative bowl */}
                    <h1 className="serif-display text-[10vw] sm:text-[8vw] lg:text-[6.5vw] font-black uppercase text-natural-moss leading-none tracking-tighter">
                      SIMPLE 
                      <motion.img
                        src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=600"
                        alt="Gourmet Shiro Bowl Decor"
                        referrerPolicy="no-referrer"
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 25, ease: 'linear' }}
                        className="inline-block h-[9vw] w-[9vw] sm:h-[7vw] sm:w-[7vw] rounded-full mx-2 sm:mx-4 border border-natural-border shadow-xl align-middle cursor-pointer"
                        onClick={() => openDishById('4')}
                      /> 
                      AND <br />
                      TASTY ETHIOPIAN RECIPES
                    </h1>

                    {/* Sub-hero layout elements */}
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center pt-8 md:pt-12">
                      {/* Left element: Circular plate overlay graphic */}
                      <div className="md:col-span-4 flex justify-center md:justify-start">
                        <div className="relative w-48 h-48 md:w-64 md:h-64 flex items-center justify-center">
                          <div className="absolute inset-0 bg-natural-sage rounded-full scale-[0.9] -translate-x-3 translate-y-2 opacity-10" />
                          <div className="absolute inset-0 border border-natural-border rounded-full" />
                          <motion.img
                            src="https://images.unsplash.com/photo-1606787366850-de6330128bfc?auto=format&fit=crop&q=80&w=600"
                            alt="Traditional Platter Feast"
                            referrerPolicy="no-referrer"
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.3 }}
                            className="relative z-10 w-4/5 h-4/5 object-cover rounded-full shadow-2xl cursor-pointer"
                            onClick={() => openDishById('1')}
                          />
                        </div>
                      </div>

                      {/* Center element: Text & Button */}
                      <div className="md:col-span-4 flex flex-col items-center text-center px-4 space-y-6">
                        <span className="text-sm font-semibold tracking-wider font-mono text-natural-lightsage">EST. 2026</span>
                        
                        <button
                          onClick={() => handleNavigate('menu')}
                          className="w-24 h-24 rounded-full bg-natural-sage hover:bg-natural-moss text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center text-center p-3 leading-tight shadow-xl cursor-pointer hover:scale-105 transition-all duration-300 active:scale-95 border-0"
                        >
                          Explore Menu
                        </button>

                        <p className="text-natural-mutedtext text-xs md:text-sm leading-relaxed max-w-sm font-medium">
                          Abraham is Addis Ababa's premier culinary sanctuary, celebrating rich, authentic Ethiopian recipes crafted with pure local ingredients and served in a warm garden ambience.
                        </p>
                      </div>

                      {/* Right element: Sambusa highlight */}
                      <div className="md:col-span-4 flex flex-col items-center justify-center h-full space-y-3">
                        <div className="relative w-48 h-48 flex items-center justify-center">
                          <div className="absolute inset-0 bg-natural-moss rounded-full scale-[0.8] translate-x-3 -translate-y-1 opacity-10" />
                          <motion.img
                            src="https://images.unsplash.com/photo-1541518763669-27fef04b14ea?auto=format&fit=crop&q=80&w=600"
                            alt="Traditional Sambusa appetizer"
                            referrerPolicy="no-referrer"
                            whileHover={{ scale: 1.05 }}
                            animate={{ rotate: 360 }}
                            transition={{ repeat: Infinity, duration: 40, ease: 'linear' }}
                            className="relative z-10 w-4/5 h-4/5 object-cover rounded-full shadow-lg cursor-pointer"
                            onClick={() => openDishById('2')}
                          />
                        </div>
                        <span className="text-[11px] font-bold uppercase tracking-widest text-natural-lightsage">
                          Traditional Sambusa
                        </span>
                      </div>
                    </div>
                  </div>
                </section>

                {/* NAME INPUT / PERSONALIZED GREETING BAR */}
                <section className="px-6 max-w-7xl mx-auto py-4">
                  <div className="flex flex-col items-center justify-center p-8 bg-[#E5E2D9]/20 border border-natural-border rounded-[36px] shadow-xs max-w-lg mx-auto space-y-4">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-natural-lightsage font-mono flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" /> Gastronomic Welcome
                    </span>
                    <h3 className="serif-display text-lg font-black text-natural-dark text-center">
                      WHO ARE WE COOKING FOR TODAY?
                    </h3>
                    <input 
                      type="text" 
                      placeholder="Enter your name to unlock custom greeting..."
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      className="w-full text-xs bg-white px-5 py-3 rounded-full border border-natural-border focus:border-natural-sage focus:ring-1 focus:ring-natural-sage focus:outline-none transition-all text-center text-natural-dark font-semibold"
                    />
                    {userName && (
                      <motion.p 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-xs text-natural-sage font-bold uppercase tracking-wider text-center"
                      >
                        Melkam Migib, {userName}! Explore our menu to find your perfect pairing. ✨
                      </motion.p>
                    )}
                  </div>
                </section>

                {/* MENU TEASER BENTO SECTION */}
                <section className="bg-[#E5E2D9]/30 border-y border-natural-border pt-16 pb-8 px-6 md:px-12">
                  <div className="max-w-7xl mx-auto space-y-12">
                    <div className="text-center space-y-3">
                      <span className="text-xs font-bold font-mono text-natural-lightsage uppercase tracking-wider">Gourmet Selection Teaser</span>
                      <h2 className="serif-display text-4xl md:text-5xl font-black uppercase text-natural-moss">
                        POPULAR DISHES OF THE HOUSE
                      </h2>
                      <p className="text-natural-mutedtext text-xs max-w-md mx-auto">
                        A quick glance at our highly-rated guest favorites. Click on any card to view its rich ingredients selection.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                      {DISHES.slice(2, 5).map(dish => (
                        <motion.div
                          key={dish.id}
                          whileHover={{ y: -6 }}
                          onClick={() => setSelectedDish(dish)}
                          className="bg-white border border-natural-border p-6 rounded-[32px] flex flex-col items-center text-center shadow-xs hover:border-natural-sage hover:shadow-md transition-all cursor-pointer group"
                        >
                          <div className="relative w-36 h-36 flex items-center justify-center mb-5 overflow-hidden rounded-full border border-natural-border">
                            <motion.img
                              src={dish.image}
                              alt={dish.name}
                              referrerPolicy="no-referrer"
                              animate={{ rotate: 360 }}
                              transition={{ repeat: Infinity, duration: 35, ease: 'linear' }}
                              whileHover={{ scale: 1.05 }}
                              className="w-full h-full object-cover rounded-full"
                            />
                          </div>
                          <span className="text-[9px] font-bold uppercase tracking-widest text-natural-sage">{dish.origin}</span>
                          <h3 className="serif-display text-sm font-black text-natural-dark mt-1 group-hover:text-natural-sage transition-colors line-clamp-1">{dish.name}</h3>
                          <p className="text-natural-mutedtext text-[11px] leading-relaxed line-clamp-2 mt-2 font-medium">{dish.description}</p>
                          <span className="text-xs font-bold text-natural-dark mt-4 bg-natural-paper px-3 py-1 rounded-full border border-natural-border/60">{dish.price} ETB</span>
                        </motion.div>
                      ))}
                    </div>

                    <div className="flex justify-center pt-4">
                      <button
                        onClick={() => handleNavigate('menu')}
                        className="px-6 py-3 bg-natural-sage text-white rounded-full font-bold text-xs uppercase tracking-widest hover:bg-natural-moss transition-all cursor-pointer border-0 shadow-lg flex items-center gap-2"
                      >
                        Discover Our Full Menu <ArrowUpRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </section>
              </div>
            )}

            {/* ABOUT VIEW */}
            {activeSection === 'about' && (
              <div className="px-6 md:px-12 py-16 max-w-7xl mx-auto space-y-20">
                {/* Page Header */}
                <div className="text-center space-y-4 max-w-3xl mx-auto">
                  <span className="text-xs font-bold font-mono text-natural-lightsage uppercase tracking-wider">Our Heritage & Legacy</span>
                  <h1 className="serif-display text-5xl md:text-6xl font-black uppercase text-natural-moss leading-none">
                    THE STORY OF ABRAHAM
                  </h1>
                  <p className="text-natural-mutedtext text-sm md:text-base leading-relaxed font-medium">
                    Passionate curators of traditional, slow-simmered, and flame-grilled Ethiopian culinary heritage since 1994.
                  </p>
                </div>

                {/* Section 1: The Founders' Journey */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                  <div className="lg:col-span-6 space-y-6">
                    <h2 className="serif-display text-3xl font-black uppercase text-natural-dark">
                      OUR HUMBLE BEGINNINGS
                    </h2>
                    <p className="text-natural-mutedtext text-xs md:text-sm leading-relaxed font-medium">
                      Founded in 1994 as a modest garden kitchen in the historic quarters of Addis Ababa, Abraham began with a singular mission: to protect and serve the original recipes of our ancestors.
                    </p>
                    <p className="text-natural-mutedtext text-xs md:text-sm leading-relaxed font-medium">
                      While the city around us transformed, we chose to stand still in our devotion to the craft. We source teff exclusively from the fertile volcanic soils of the Shoa highlands, work alongside multigenerational spices mills, and preserve the communal dining philosophy of the "Gursha" — a traditional gesture of feeding one another as a sign of respect and deep friendship.
                    </p>
                  </div>
                  <div className="lg:col-span-6 flex justify-center">
                    <div className="relative w-80 h-80 md:w-96 md:h-96 bg-white rounded-[48px] border border-natural-border p-6 shadow-xl overflow-hidden">
                      <img 
                        src="https://images.unsplash.com/photo-1606787366850-de6330128bfc?auto=format&fit=crop&q=80&w=800"
                        alt="Communal Feast Gathering"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover rounded-[32px] shadow-inner"
                      />
                    </div>
                  </div>
                </div>

                {/* Section 2: The Three Kitchen Essentials */}
                <div className="bg-[#E5E2D9]/30 rounded-[40px] p-8 md:p-12 border border-natural-border space-y-10">
                  <div className="text-center max-w-xl mx-auto space-y-2">
                    <h3 className="serif-display text-2xl font-black uppercase text-natural-moss">THE THREE KITCHEN ESSENTIALS</h3>
                    <p className="text-natural-mutedtext text-xs font-semibold">The sacred culinary pillars that define the taste of Abraham.</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Essential 1 */}
                    <div className="bg-white p-6 rounded-[32px] border border-natural-border space-y-4">
                      <div className="w-12 h-12 rounded-full bg-natural-sage/10 text-natural-sage flex items-center justify-center font-bold font-mono text-sm">
                        01
                      </div>
                      <h4 className="font-bold text-xs uppercase tracking-wider text-natural-dark">3-Day Sourdough Injera</h4>
                      <p className="text-natural-mutedtext text-xs leading-relaxed font-medium">
                        Our Injera is crafted with 100% pure organic teff flour, fermented naturally for 72 hours. This slow maturation produces the delicate sourdough tang and perfect pocketed eyelet texture (ayen) designed to soak up rich stews.
                      </p>
                    </div>

                    {/* Essential 2 */}
                    <div className="bg-white p-6 rounded-[32px] border border-natural-border space-y-4">
                      <div className="w-12 h-12 rounded-full bg-natural-sage/10 text-natural-sage flex items-center justify-center font-bold font-mono text-sm">
                        02
                      </div>
                      <h4 className="font-bold text-xs uppercase tracking-wider text-natural-dark">Acacia Firewood Searing</h4>
                      <p className="text-natural-mutedtext text-xs leading-relaxed font-medium">
                        We reject the convenience of gas ovens. All our beef and lamb Tibs are seared over glowing acacia wood-fires and charcoal, infusing the meats with an irreplaceable smoky wood aroma.
                      </p>
                    </div>

                    {/* Essential 3 */}
                    <div className="bg-white p-6 rounded-[32px] border border-natural-border space-y-4">
                      <div className="w-12 h-12 rounded-full bg-natural-sage/10 text-natural-sage flex items-center justify-center font-bold font-mono text-sm">
                        03
                      </div>
                      <h4 className="font-bold text-xs uppercase tracking-wider text-natural-dark">Clay-Pot Slow Simmering</h4>
                      <p className="text-natural-mutedtext text-xs leading-relaxed font-medium">
                        Our traditional vegetarian stews (Wat) and velvety Shiro are cooked and served in hand-molded clay pots. Clay heat retention ensures spices fuse slowly and release their therapeutic oils.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Section 3: Meet Our Chefs */}
                <div className="space-y-12">
                  <div className="text-center max-w-2xl mx-auto space-y-3">
                    <span className="text-xs font-bold font-mono text-natural-lightsage uppercase tracking-wider">Heritage Artisans</span>
                    <h2 className="serif-display text-4xl font-black uppercase text-natural-moss">
                      MEET OUR MASTER CHEFS
                    </h2>
                    <p className="text-natural-mutedtext text-xs md:text-sm leading-relaxed font-semibold">
                      Our kitchen is guided by three culinary pioneers who carry decades of family secrets, dedication to wood-fired authenticity, and passion for the rich traditions of Addis Ababa.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Chef Tigist */}
                    <motion.div 
                      whileHover={{ y: -6 }}
                      className="bg-white border border-natural-border p-6 rounded-[32px] flex flex-col items-center text-center shadow-xs"
                    >
                      <div className="relative w-40 h-40 flex items-center justify-center mb-6 overflow-hidden rounded-full border-2 border-natural-border">
                        <img
                          src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=300"
                          alt="Chef Tigist Wolde"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="space-y-2 mt-auto">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-natural-sage">Head Chef • Stew Artisan</span>
                        <h3 className="serif-display text-lg font-bold text-natural-dark">Chef Tigist Wolde</h3>
                        <p className="text-natural-mutedtext text-xs leading-relaxed font-medium">
                          Carrying over 20 years of family lineage, Chef Tigist slow-simmers our iconic Royal Doro Wat chicken stew for hours in wood-fired clay pots.
                        </p>
                      </div>
                    </motion.div>

                    {/* Chef Yonas */}
                    <motion.div 
                      whileHover={{ y: -6 }}
                      className="bg-[#4A4A35] border border-natural-moss p-8 rounded-[40px] flex flex-col items-center text-center relative shadow-xl text-natural-paper"
                    >
                      <span className="absolute top-4 right-4 bg-natural-paper text-natural-moss text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full">
                        Sizzle Master
                      </span>
                      <div className="relative w-44 h-44 flex items-center justify-center mb-6 overflow-hidden rounded-full border-2 border-natural-sage/30">
                        <img
                          src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300"
                          alt="Chef Yonas Kabede"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="space-y-2 mt-auto">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-natural-lightsage">Charcoal & Sizzle Expert</span>
                        <h3 className="serif-display text-xl font-bold text-white">Chef Yonas Kabede</h3>
                        <p className="text-natural-lightsage text-xs leading-relaxed opacity-90 font-medium">
                          The virtuoso of the flame. Chef Yonas controls our glowing brick furnaces and sears our sizzling beef and lamb Tibs over real acacia charcoal wood.
                        </p>
                      </div>
                    </motion.div>

                    {/* Chef Selam */}
                    <motion.div 
                      whileHover={{ y: -6 }}
                      className="bg-white border border-natural-border p-6 rounded-[32px] flex flex-col items-center text-center shadow-xs"
                    >
                      <div className="relative w-40 h-40 flex items-center justify-center mb-6 overflow-hidden rounded-full border-2 border-natural-border">
                        <img
                          src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300"
                          alt="Chef Selam Tesfaye"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="space-y-2 mt-auto">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-natural-sage">Coffee Ceremony & Pastry</span>
                        <h3 className="serif-display text-lg font-bold text-natural-dark">Chef Selam Tesfaye</h3>
                        <p className="text-natural-mutedtext text-xs leading-relaxed font-medium">
                          Crafts our crispy sweet sambusas, and leads the traditional roasting of organic highland coffee beans to produce unmatched after-dinner clay Jebena brews.
                        </p>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>
            )}

            {/* MENU VIEW */}
            {activeSection === 'menu' && (
              <div className="py-6">
                <MenuGallery
                  onSelectDish={(dish) => setSelectedDish(dish)}
                />
              </div>
            )}

            {/* GALLERY VIEW */}
            {activeSection === 'gallery' && (
              <div className="pt-16 pb-2 space-y-16">
                <style dangerouslySetInnerHTML={{ __html: `
                  @keyframes marquee-left {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                  }
                  @keyframes marquee-right {
                    0% { transform: translateX(-50%); }
                    100% { transform: translateX(0); }
                  }
                  .animate-marquee-left {
                    display: flex;
                    width: max-content;
                    animation: marquee-left 45s linear infinite;
                  }
                  .animate-marquee-right {
                    display: flex;
                    width: max-content;
                    animation: marquee-right 45s linear infinite;
                  }
                  .animate-marquee-left:hover, .animate-marquee-right:hover {
                    animation-play-state: paused;
                  }
                `}} />

                <div className="text-center max-w-3xl mx-auto space-y-4 px-6">
                  <span className="text-xs font-bold font-mono text-natural-lightsage uppercase tracking-wider">Visual Cuisine Gallery</span>
                  <h1 className="serif-display text-5xl md:text-6xl font-black uppercase text-natural-moss leading-none">
                    SENSORY CUISINE GALLERY
                  </h1>
                  <p className="text-natural-mutedtext text-sm leading-relaxed font-medium">
                    Scroll and tap to explore an immersive sensory tour of our traditional and global delicacies, crafted with absolute fidelity.
                  </p>
                </div>

                {/* Marquee Row 1: Sizzling Grills & Stews */}
                <div className="space-y-4">
                  <div className="px-6 max-w-7xl mx-auto">
                    <h3 className="serif-display text-xl font-bold uppercase tracking-wider text-natural-dark flex items-center gap-2">
                      <Flame className="w-4 h-4 text-natural-sage animate-pulse" /> Sizzling Grills & Traditional Stews
                    </h3>
                    <p className="text-xs text-natural-mutedtext font-medium">Moving leftwards — Searing hot charcoal flame delicacies</p>
                  </div>
                  
                  <div className="relative w-full overflow-x-auto md:overflow-hidden no-scrollbar bg-natural-sage/5 py-8 border-y border-natural-border/40">
                    <div className="animate-marquee-left gap-8 flex">
                      {[
                        { img: 'https://images.unsplash.com/photo-1603048588665-791ca8aea617?auto=format&fit=crop&q=80&w=600', name: 'Special Beef Tibs', id: '3' },
                        { img: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&q=80&w=600', name: 'Royal Doro Wat', id: '5' },
                        { img: 'https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&q=80&w=600', name: 'Shekla Lamb Tibs', id: '8' },
                        { img: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80&w=600', name: 'Flame Grilled Skewers', id: '16' },
                        { img: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=600', name: 'Zilzil Sizzling Beef', id: '19' },
                        { img: 'https://images.unsplash.com/photo-1541832676-9b763b0239ab?auto=format&fit=crop&q=80&w=600', name: 'Tegabino Shiro Wat', id: '18' },
                      ].map((item, idx) => (
                        <div 
                          key={`g1-${idx}`} 
                          className="flex-shrink-0 w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-white shadow-xl hover:scale-105 hover:border-natural-sage transition-all duration-500 cursor-default mx-4 relative group"
                        >
                          <motion.img
                            src={item.img}
                            alt={item.name}
                            referrerPolicy="no-referrer"
                            animate={{ rotate: 360 }}
                            transition={{ repeat: Infinity, duration: 40, ease: 'linear' }}
                            className="w-full h-full object-cover rounded-full"
                          />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-4 text-center">
                            <span className="text-white font-serif text-lg font-black uppercase tracking-wider">{item.name}</span>
                          </div>
                        </div>
                      ))}
                      {/* Duplicate set for loop */}
                      {[
                        { img: 'https://images.unsplash.com/photo-1603048588665-791ca8aea617?auto=format&fit=crop&q=80&w=600', name: 'Special Beef Tibs', id: '3' },
                        { img: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&q=80&w=600', name: 'Royal Doro Wat', id: '5' },
                        { img: 'https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&q=80&w=600', name: 'Shekla Lamb Tibs', id: '8' },
                        { img: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80&w=600', name: 'Flame Grilled Skewers', id: '16' },
                        { img: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=600', name: 'Zilzil Sizzling Beef', id: '19' },
                        { img: 'https://images.unsplash.com/photo-1541832676-9b763b0239ab?auto=format&fit=crop&q=80&w=600', name: 'Tegabino Shiro Wat', id: '18' },
                      ].map((item, idx) => (
                        <div 
                          key={`g1-dup-${idx}`} 
                          className="flex-shrink-0 w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-white shadow-xl hover:scale-105 hover:border-natural-sage transition-all duration-500 cursor-default mx-4 relative group"
                        >
                          <motion.img
                            src={item.img}
                            alt={item.name}
                            referrerPolicy="no-referrer"
                            animate={{ rotate: 360 }}
                            transition={{ repeat: Infinity, duration: 40, ease: 'linear' }}
                            className="w-full h-full object-cover rounded-full"
                          />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-4 text-center">
                            <span className="text-white font-serif text-lg font-black uppercase tracking-wider">{item.name}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Marquee Row 2: Hearty Breakfasts & Global Favourites */}
                <div className="space-y-4">
                  <div className="px-6 max-w-7xl mx-auto">
                    <h3 className="serif-display text-xl font-bold uppercase tracking-wider text-natural-dark flex items-center gap-2">
                      <Clock className="w-4 h-4 text-natural-sage" /> Breakfast & Global Specialties
                    </h3>
                    <p className="text-xs text-natural-mutedtext font-medium">Moving rightwards — Sourced globally, refined locally</p>
                  </div>

                  <div className="relative w-full overflow-x-auto md:overflow-hidden no-scrollbar bg-natural-sage/5 py-8 border-y border-natural-border/40">
                    <div className="animate-marquee-right gap-8 flex">
                      {[
                        { img: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&q=80&w=600', name: 'Chechebsa Kita Firfir', id: '1' },
                        { img: 'https://images.unsplash.com/photo-1541518763669-27fef04b14ea?auto=format&fit=crop&q=80&w=600', name: 'Crispy Sambusa Duo', id: '2' },
                        { img: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&q=80&w=600', name: 'Eggs Dulet Style', id: '15' },
                        { img: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&q=80&w=600', name: 'Premium Sushi Platter', id: 'world-1' },
                        { img: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=600', name: 'Wood-Fired Pizza', id: 'world-2' },
                        { img: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&q=80&w=600', name: 'Crystal Dim Sum', id: 'world-10' },
                      ].map((item, idx) => (
                        <div 
                          key={`g2-${idx}`} 
                          className="flex-shrink-0 w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-white shadow-xl hover:scale-105 hover:border-natural-sage transition-all duration-500 cursor-default mx-4 relative group"
                        >
                          <motion.img
                            src={item.img}
                            alt={item.name}
                            referrerPolicy="no-referrer"
                            animate={{ rotate: 360 }}
                            transition={{ repeat: Infinity, duration: 40, ease: 'linear' }}
                            className="w-full h-full object-cover rounded-full"
                          />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-4 text-center">
                            <span className="text-white font-serif text-lg font-black uppercase tracking-wider">{item.name}</span>
                          </div>
                        </div>
                      ))}
                      {/* Duplicate set */}
                      {[
                        { img: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&q=80&w=600', name: 'Chechebsa Kita Firfir', id: '1' },
                        { img: 'https://images.unsplash.com/photo-1541518763669-27fef04b14ea?auto=format&fit=crop&q=80&w=600', name: 'Crispy Sambusa Duo', id: '2' },
                        { img: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&q=80&w=600', name: 'Eggs Dulet Style', id: '15' },
                        { img: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&q=80&w=600', name: 'Premium Sushi Platter', id: 'world-1' },
                        { img: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=600', name: 'Wood-Fired Pizza', id: 'world-2' },
                        { img: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&q=80&w=600', name: 'Crystal Dim Sum', id: 'world-10' },
                      ].map((item, idx) => (
                        <div 
                          key={`g2-dup-${idx}`} 
                          className="flex-shrink-0 w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-white shadow-xl hover:scale-105 hover:border-natural-sage transition-all duration-500 cursor-default mx-4 relative group"
                        >
                          <motion.img
                            src={item.img}
                            alt={item.name}
                            referrerPolicy="no-referrer"
                            animate={{ rotate: 360 }}
                            transition={{ repeat: Infinity, duration: 40, ease: 'linear' }}
                            className="w-full h-full object-cover rounded-full"
                          />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-4 text-center">
                            <span className="text-white font-serif text-lg font-black uppercase tracking-wider">{item.name}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Marquee Row 3: Fresh Salads & Luscious Desserts */}
                <div className="space-y-4">
                  <div className="px-6 max-w-7xl mx-auto">
                    <h3 className="serif-display text-xl font-bold uppercase tracking-wider text-natural-dark flex items-center gap-2">
                      <Star className="w-4 h-4 text-natural-sage animate-spin-slow" /> Fresh Salads & Decadent Desserts
                    </h3>
                    <p className="text-xs text-natural-mutedtext font-medium">Moving leftwards — High-contrast healthy salads & sweet masterpieces</p>
                  </div>

                  <div className="relative w-full overflow-x-auto md:overflow-hidden no-scrollbar bg-natural-sage/5 py-8 border-y border-natural-border/40">
                    <div className="animate-marquee-left gap-8 flex">
                      {[
                        { img: 'https://images.unsplash.com/photo-1515516969-d4008cc6241a?auto=format&fit=crop&q=80&w=600', name: 'Tomato Salata', id: '7' },
                        { img: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&q=80&w=600', name: 'Avocado Beetroot Salad', id: '20' },
                        { img: 'https://images.unsplash.com/photo-1505576399279-565b52d4ac71?auto=format&fit=crop&q=80&w=600', name: 'Azifa Mezze Platter', id: '11' },
                        { img: 'https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&q=80&w=600', name: 'Honey Baklava', id: '12' },
                        { img: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&q=80&w=600', name: 'Chocolate Lava Cake', id: 'world-11' },
                        { img: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=600', name: 'Cardamom Fudge Cake', id: '21' },
                      ].map((item, idx) => (
                        <div 
                          key={`g3-${idx}`} 
                          className="flex-shrink-0 w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-white shadow-xl hover:scale-105 hover:border-natural-sage transition-all duration-500 cursor-default mx-4 relative group"
                        >
                          <motion.img
                            src={item.img}
                            alt={item.name}
                            referrerPolicy="no-referrer"
                            animate={{ rotate: 360 }}
                            transition={{ repeat: Infinity, duration: 40, ease: 'linear' }}
                            className="w-full h-full object-cover rounded-full"
                          />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-4 text-center">
                            <span className="text-white font-serif text-lg font-black uppercase tracking-wider">{item.name}</span>
                          </div>
                        </div>
                      ))}
                      {/* Duplicate set */}
                      {[
                        { img: 'https://images.unsplash.com/photo-1515516969-d4008cc6241a?auto=format&fit=crop&q=80&w=600', name: 'Tomato Salata', id: '7' },
                        { img: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&q=80&w=600', name: 'Avocado Beetroot Salad', id: '20' },
                        { img: 'https://images.unsplash.com/photo-1505576399279-565b52d4ac71?auto=format&fit=crop&q=80&w=600', name: 'Azifa Mezze Platter', id: '11' },
                        { img: 'https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&q=80&w=600', name: 'Honey Baklava', id: '12' },
                        { img: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&q=80&w=600', name: 'Chocolate Lava Cake', id: 'world-11' },
                        { img: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=600', name: 'Cardamom Fudge Cake', id: '21' },
                      ].map((item, idx) => (
                        <div 
                          key={`g3-dup-${idx}`} 
                          className="flex-shrink-0 w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-white shadow-xl hover:scale-105 hover:border-natural-sage transition-all duration-500 cursor-default mx-4 relative group"
                        >
                          <motion.img
                            src={item.img}
                            alt={item.name}
                            referrerPolicy="no-referrer"
                            animate={{ rotate: 360 }}
                            transition={{ repeat: Infinity, duration: 40, ease: 'linear' }}
                            className="w-full h-full object-cover rounded-full"
                          />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-4 text-center">
                            <span className="text-white font-serif text-lg font-black uppercase tracking-wider">{item.name}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* CONTACT VIEW */}
            {activeSection === 'contact' && (
              <div className="px-6 md:px-12 py-16 max-w-7xl mx-auto space-y-16 animate-fadeIn">
                {/* Page Header */}
                <div className="text-center space-y-4 max-w-2xl mx-auto">
                  <span className="text-xs font-bold font-mono text-natural-lightsage uppercase tracking-wider">Join Us in Addis Ababa</span>
                  <h1 className="serif-display text-5xl md:text-6xl font-black uppercase text-natural-moss leading-none">
                    LET'S CONNECT
                  </h1>
                  <p className="text-natural-mutedtext text-sm md:text-base leading-relaxed font-medium">
                    Experience genuine, slow-cooked Ethiopian hospitality. Walk in, breathe the firewood aroma, and savor traditional cuisine with us!
                  </p>
                </div>

                {/* Two Column Layout: Info Cards vs Interactive Map */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                  {/* Left Column: Contact Cards */}
                  <div className="lg:col-span-5 space-y-8 flex flex-col justify-start">
                    <div className="space-y-6">
                      <h2 className="serif-display text-2xl font-black uppercase text-natural-dark">
                        OUR CHANNELS
                      </h2>
                      
                      <div className="grid grid-cols-1 gap-4">
                        {/* Address */}
                        <div className="flex gap-4 items-start bg-white p-5 rounded-3xl border border-natural-border shadow-xs">
                          <div className="p-3 rounded-full bg-natural-sage/10 text-natural-sage">
                            <MapPin className="w-5 h-5" />
                          </div>
                          <div>
                            <h4 className="text-xs font-bold uppercase tracking-wider text-natural-dark">Primary Sanctuary</h4>
                            <p className="text-xs text-natural-mutedtext mt-1 leading-relaxed font-medium">
                              Bole Road, Ward 03, Addis Ababa, Ethiopia
                            </p>
                          </div>
                        </div>

                        {/* Phone */}
                        <a href="tel:+25111663" className="flex gap-4 items-start bg-white p-5 rounded-3xl border border-natural-border shadow-xs hover:border-natural-sage transition-all group">
                          <div className="p-3 rounded-full bg-natural-sage/10 text-natural-sage group-hover:bg-natural-sage group-hover:text-white transition-colors">
                            <Phone className="w-5 h-5" />
                          </div>
                          <div>
                            <h4 className="text-xs font-bold uppercase tracking-wider text-natural-dark group-hover:text-natural-sage transition-colors">Call Our Hotline</h4>
                            <p className="text-xs text-natural-mutedtext mt-1 leading-relaxed font-medium">
                              +251 11 663 ABRAHAM
                            </p>
                          </div>
                        </a>

                        {/* Email */}
                        <a href="mailto:welcome@abraham-addis.com" className="flex gap-4 items-start bg-white p-5 rounded-3xl border border-natural-border shadow-xs hover:border-natural-sage transition-all group">
                          <div className="p-3 rounded-full bg-natural-sage/10 text-natural-sage group-hover:bg-natural-sage group-hover:text-white transition-colors">
                            <Mail className="w-5 h-5" />
                          </div>
                          <div>
                            <h4 className="text-xs font-bold uppercase tracking-wider text-natural-dark group-hover:text-natural-sage transition-colors">Send an Email</h4>
                            <p className="text-xs text-natural-mutedtext mt-1 leading-relaxed font-medium">
                              welcome@abraham-addis.com
                            </p>
                          </div>
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Google Interactive Map */}
                  <div className="lg:col-span-7 flex flex-col justify-center">
                    <GMap />
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Back to Top button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 p-3 bg-natural-sage hover:bg-natural-moss text-white rounded-full shadow-2xl cursor-pointer z-50 transition-colors border-0 flex items-center justify-center hover:scale-110 active:scale-95"
            aria-label="Back to top"
          >
            <ArrowUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* DETAILS MODAL */}
      <AnimatePresence>
        {selectedDish && (
          <DishDetailModal
            dish={selectedDish}
            onClose={() => setSelectedDish(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
