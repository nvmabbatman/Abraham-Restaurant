import React, { useState } from 'react';
import { motion } from 'motion/react';
import { X, Star, Clock, Flame } from 'lucide-react';
import { Dish } from '../types';

interface DishDetailModalProps {
  dish: Dish | null;
  onClose: () => void;
}

export default function DishDetailModal({
  dish,
  onClose
}: DishDetailModalProps) {
  if (!dish) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      />

      {/* Modal Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ type: 'spring', damping: 25, stiffness: 250 }}
        className="relative w-full max-w-2xl overflow-hidden rounded-[32px] bg-[#faf9f5] border border-natural-border shadow-2xl z-10"
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-natural-paper hover:bg-natural-border/60 transition-colors text-natural-dark cursor-pointer border-0"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 max-h-[90vh] overflow-y-auto no-scrollbar">
          {/* Dish Image */}
          <div className="relative h-64 md:h-full min-h-[250px] bg-natural-paper flex items-center justify-center p-4">
            <img
              src={dish.image}
              alt={dish.name}
              referrerPolicy="no-referrer"
              className="w-4/5 h-4/5 object-contain rounded-full drop-shadow-2xl transform hover:scale-105 transition-transform duration-500"
            />
            {dish.isVegetarian && (
              <span className="absolute left-4 top-4 bg-natural-paper text-natural-moss text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full border border-natural-lightsage/30">
                Vegetarian 🌱
              </span>
            )}
            {/* Removed Highly Rated badge */}
          </div>

          {/* Dish Details */}
          <div className="flex flex-col p-6 md:p-8">
            <span className="text-xs font-bold uppercase tracking-widest text-natural-lightsage">
              {dish.origin} Specialty
            </span>
            <h2 className="serif-display text-2xl md:text-3xl font-bold mt-2 text-natural-dark leading-tight">
              {dish.name}
            </h2>

            {/* Ratings & Prep */}
            <div className="flex flex-wrap items-center gap-4 mt-3 text-natural-mutedtext text-xs font-semibold">
              <div className="flex items-center gap-1 text-natural-sage">
                <Star className="w-4 h-4 fill-natural-sage stroke-natural-sage" />
                <span>{dish.rating}</span>
                <span className="text-natural-lightsage">({dish.reviewsCount} reviews)</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4 text-natural-lightsage" />
                <span>{dish.prepTime}</span>
              </div>
              <div className="flex items-center gap-1">
                <Flame className="w-4 h-4 text-natural-lightsage" />
                <span>{dish.calories} Kcal</span>
              </div>
            </div>

            <p className="mt-4 text-natural-mutedtext text-xs md:text-sm leading-relaxed">
              {dish.description}
            </p>

            {/* Customize Ingredients */}
            <div className="mt-5">
              <h3 className="text-xs font-bold uppercase tracking-wider text-natural-dark border-b border-natural-border pb-2">
                Ingredients Selection
              </h3>
              <div className="mt-3 grid grid-cols-2 gap-2">
                {dish.ingredients.map(ingredient => (
                  <div
                    key={ingredient}
                    className="flex items-center gap-2 p-2.5 rounded-xl border text-[11px] font-medium bg-natural-sage/10 border-natural-sage/20 text-natural-dark"
                  >
                    <span className="flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-full bg-natural-sage text-white text-[9px] font-bold">
                      ✓
                    </span>
                    <span className="truncate">{ingredient}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Dine-In Pricing & Close Action */}
            <div className="mt-auto pt-6 flex flex-col gap-4">
              <div className="flex items-center justify-between border-t border-natural-border/60 pt-4">
                <div>
                  <span className="text-[11px] font-bold text-natural-lightsage uppercase tracking-widest block">Dine-In Price</span>
                  <span className="text-xl font-bold font-serif text-natural-dark">{dish.price} ETB</span>
                </div>
              </div>

              {/* Close Button */}
              <button
                onClick={onClose}
                className="w-full py-3.5 px-6 rounded-full font-bold uppercase tracking-wider text-xs transition-all duration-300 transform active:scale-[0.98] cursor-pointer bg-natural-moss text-white hover:bg-natural-sage shadow-md border-0"
              >
                Return to Menu
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
