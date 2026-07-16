import React, { useState, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, SlidersHorizontal, Eye, Plus, Check } from 'lucide-react';
import { Dish } from '../types';
import { DISHES } from '../data';

interface MenuGalleryProps {
  onSelectDish: (dish: Dish) => void;
}

type CategoryFilter = 'all' | 'breakfast' | 'kebabs' | 'mains' | 'salads' | 'desserts';
type SortOption = 'default' | 'price-asc' | 'price-desc' | 'rating';

export default function MenuGallery({ onSelectDish }: MenuGalleryProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState<CategoryFilter>('all');
  const [sortBy, setSortBy] = useState<SortOption>('default');

  const categoriesRef = useRef<HTMLDivElement>(null);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftState, setScrollLeftState] = useState(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!categoriesRef.current) return;
    setIsMouseDown(true);
    setStartX(e.pageX - categoriesRef.current.offsetLeft);
    setScrollLeftState(categoriesRef.current.scrollLeft);
  };

  const handleMouseLeaveOrUp = () => {
    setIsMouseDown(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isMouseDown || !categoriesRef.current) return;
    e.preventDefault();
    const x = e.pageX - categoriesRef.current.offsetLeft;
    const walk = (x - startX) * 1.5; // drag speed multiplier
    categoriesRef.current.scrollLeft = scrollLeftState - walk;
  };

  const categories: { label: string; value: CategoryFilter }[] = [
    { label: 'All Recipes', value: 'all' },
    { label: 'Breakfast Specialties', value: 'breakfast' },
    { label: 'Flame Grills & Meats', value: 'kebabs' },
    { label: 'Signature Mains', value: 'mains' },
    { label: 'Fresh Salads', value: 'salads' },
    { label: 'Desserts', value: 'desserts' },
  ];

  const filteredAndSortedDishes = useMemo(() => {
    let result = [...DISHES];

    // Filter by search
    if (searchTerm.trim() !== '') {
      result = result.filter(dish =>
        dish.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        dish.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        dish.origin.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (category !== 'all') {
      result = result.filter(dish => dish.category === category);
    }

    // Sort
    if (sortBy === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [searchTerm, category, sortBy]);

  return (
    <section id="menu" className="scroll-mt-24 px-6 md:px-12 py-20 max-w-7xl mx-auto">
      <div className="text-center max-w-2xl mx-auto space-y-4 mb-12">
        <span className="text-[11px] font-bold uppercase tracking-widest text-natural-lightsage font-mono">03 / Gourmet Explorer</span>
        <h2 className="serif-display text-4xl md:text-5xl font-extrabold text-natural-moss">
          MENU SECTION
        </h2>
        <p className="text-natural-mutedtext text-xs md:text-sm">
          Browse our full culinary directory. Tap on any dish to explore traditional ingredients, preparation times, and detailed culinary values.
        </p>
      </div>

      {/* Filter and Search Bar controls */}
      <div className="bg-white border border-natural-border rounded-[32px] p-4 md:p-6 shadow-xs mb-10 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        {/* Search Input */}
        <div className="relative w-full lg:max-w-xs">
          <Search className="absolute left-4.5 top-1/2 -translate-y-1/2 w-4 h-4 text-natural-mutedtext" />
          <input
            type="text"
            placeholder="Search dish or origin..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full text-xs bg-natural-paper pl-11 pr-4 py-3 rounded-full border border-natural-border focus:border-natural-sage focus:outline-hidden transition-all text-natural-dark"
          />
        </div>

        {/* Categories Pills */}
        <div 
          ref={categoriesRef}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeaveOrUp}
          onMouseUp={handleMouseLeaveOrUp}
          onMouseMove={handleMouseMove}
          className="flex gap-2 overflow-x-auto no-scrollbar py-1 select-none cursor-grab active:cursor-grabbing w-full lg:max-w-xl"
        >
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => {
                if (!isMouseDown) setCategory(cat.value);
              }}
              className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap tracking-wider transition-all cursor-pointer ${
                category === cat.value
                  ? 'bg-natural-sage text-white shadow-md'
                  : 'bg-natural-paper text-natural-mutedtext hover:text-natural-dark border border-natural-border'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Sorters */}
        <div className="flex items-center gap-2 border-t lg:border-t-0 border-natural-border/50 pt-3 lg:pt-0">
          <SlidersHorizontal className="w-3.5 h-3.5 text-natural-lightsage shrink-0" />
          <span className="text-[10px] font-bold text-natural-mutedtext uppercase tracking-wider whitespace-nowrap mr-1">Sort:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="bg-natural-paper text-natural-dark text-xs font-semibold px-3 py-2 border border-natural-border rounded-full focus:outline-hidden focus:border-natural-sage cursor-pointer"
          >
            <option value="default">Default</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Top Rated</option>
          </select>
        </div>
      </div>

      {/* Grid List */}
      <AnimatePresence mode="popLayout">
        {filteredAndSortedDishes.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="text-center py-20 bg-white border border-natural-border rounded-[32px]"
          >
            <p className="text-natural-mutedtext text-sm font-semibold">No gourmet creations match your search query.</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setCategory('all');
                setSortBy('default');
              }}
              className="mt-4 text-xs font-bold uppercase tracking-widest bg-natural-sage hover:bg-natural-moss text-white px-5 py-2.5 rounded-full transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
          </motion.div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {filteredAndSortedDishes.map((dish) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.3 }}
                key={dish.id}
                onClick={() => onSelectDish(dish)}
                className="group bg-white border border-natural-border rounded-[32px] p-5 hover:border-natural-sage transition-all cursor-pointer flex flex-col justify-between"
              >
                <div>
                  {/* Dish Image container */}
                  <div className="relative aspect-square w-full rounded-2xl bg-natural-paper overflow-hidden">
                    <img
                      src={dish.image}
                      alt={dish.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transform group-hover:scale-108 transition-transform duration-500"
                    />

                    {/* Quick overlay triggers */}
                    <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <div className="bg-white/95 px-4.5 py-2.5 rounded-full shadow-md text-natural-dark font-bold text-[10px] uppercase tracking-wider flex items-center gap-2 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                        <Eye className="w-3.5 h-3.5 text-natural-sage" />
                        <span>View Recipe</span>
                      </div>
                    </div>

                    {dish.isVegetarian && (
                      <span className="absolute top-3 left-3 bg-natural-paper text-natural-moss text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border border-natural-lightsage/30">
                        Veg 🌱
                      </span>
                    )}
                  </div>

                  {/* Title & Metadata */}
                  <div className="mt-4 space-y-1">
                    <div className="flex justify-between items-start gap-1">
                      <h3 className="text-xs font-semibold text-natural-dark group-hover:text-natural-moss transition-colors line-clamp-1">
                        {dish.name}
                      </h3>
                      <span className="text-xs font-bold font-serif text-natural-dark shrink-0">
                        {dish.price} ETB
                      </span>
                    </div>
                    <p className="text-[10px] text-natural-mutedtext font-medium uppercase tracking-wider">
                      {dish.origin} Style • {dish.prepTime}
                    </p>
                  </div>
                </div>

                {/* Bottom Stats */}
                <div className="mt-4 pt-3 border-t border-natural-border/60 flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-natural-mutedtext">
                  <div className="flex items-center gap-1 text-natural-sage">
                    <span>★ {dish.rating}</span>
                  </div>
                  <div>
                    <span>{dish.calories} kcal</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
