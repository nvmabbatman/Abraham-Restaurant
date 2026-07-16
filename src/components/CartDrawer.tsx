import React, { useState } from 'react';
import { motion } from 'motion/react';
import { X, Trash2, Tag, ShoppingBag, ArrowRight } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (dishId: string, quantity: number) => void;
  onRemoveItem: (dishId: string) => void;
  onCheckout: (appliedPromo: string, discountAmount: number) => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout
}: CartDrawerProps) {
  if (!isOpen) return null;

  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoError, setPromoError] = useState('');
  const [promoSuccess, setPromoSuccess] = useState('');

  const subtotal = cart.reduce((sum, item) => sum + item.dish.price * item.quantity, 0);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError('');
    setPromoSuccess('');

    const formattedPromo = promoCode.trim().toUpperCase();
    if (formattedPromo === 'ASTA20') {
      setDiscountPercent(20);
      setPromoSuccess('20% discount applied! 🎉');
    } else if (formattedPromo === 'WELCOME10') {
      setDiscountPercent(10);
      setPromoSuccess('10% discount applied! 🌟');
    } else {
      setPromoError('Invalid coupon code. Try ASTA20 or WELCOME10!');
    }
  };

  const discountAmount = (subtotal * discountPercent) / 100;
  const deliveryFee = subtotal > 50 ? 0 : 5.00;
  const grandTotal = subtotal - discountAmount + deliveryFee;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-xs"
      />

      {/* Drawer Panel */}
      <div className="absolute inset-y-0 right-0 flex max-w-full pl-10">
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 220 }}
          className="w-screen max-w-md bg-[#faf9f5] border-l border-natural-border shadow-2xl flex flex-col h-full"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-natural-border bg-white">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-natural-dark" />
              <h2 className="text-sm font-bold uppercase tracking-wider text-natural-dark">Your Basket</h2>
              <span className="bg-natural-paper text-natural-dark border border-natural-border/60 font-bold text-xs px-2.5 py-0.5 rounded-full">
                {cart.reduce((sum, item) => sum + item.quantity, 0)}
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-full text-natural-mutedtext hover:text-natural-moss transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6 no-scrollbar">
            {cart.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center p-8">
                <div className="w-20 h-20 rounded-full bg-natural-paper flex items-center justify-center mb-4">
                  <ShoppingBag className="w-8 h-8 text-natural-lightsage stroke-[1.25]" />
                </div>
                <h3 className="text-natural-dark font-bold text-sm uppercase tracking-wider">Your bag is empty</h3>
                <p className="text-natural-mutedtext text-xs mt-2 max-w-[240px]">
                  Add some of our freshly prepared recipes and delicious specialty dishes.
                </p>
                <button
                  onClick={onClose}
                  className="mt-6 text-xs font-bold uppercase tracking-widest bg-natural-sage text-white px-6 py-3 rounded-full hover:bg-natural-moss transition-colors cursor-pointer"
                >
                  Start Ordering
                </button>
              </div>
            ) : (
              cart.map((item, index) => (
                <div
                  key={`${item.dish.id}-${index}`}
                  className="flex gap-4 border-b border-natural-border/60 pb-6 last:border-0 last:pb-0 group"
                >
                  <div className="h-16 w-16 bg-white border border-natural-border/80 rounded-2xl flex items-center justify-center p-1.5 shrink-0 shadow-xs">
                    <img
                      src={item.dish.image}
                      alt={item.dish.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-contain"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start gap-2">
                      <h4 className="text-xs font-semibold text-natural-dark leading-tight truncate">
                        {item.dish.name}
                      </h4>
                      <span className="text-xs font-bold font-serif text-natural-dark">
                        ${(item.dish.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                    <p className="text-[10px] text-natural-mutedtext font-medium uppercase tracking-wider mt-0.5">
                      {item.dish.origin} Special
                    </p>

                    {/* Quantity Selector & Remove */}
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center border border-natural-border bg-white rounded-full p-0.5 scale-90 origin-left">
                        <button
                          onClick={() => onUpdateQuantity(item.dish.id, item.quantity - 1)}
                          className="flex h-6 w-6 items-center justify-center rounded-full text-natural-mutedtext hover:bg-natural-paper transition-colors"
                        >
                          —
                        </button>
                        <span className="w-6 text-center text-xs font-bold text-natural-dark">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQuantity(item.dish.id, item.quantity + 1)}
                          className="flex h-6 w-6 items-center justify-center rounded-full text-natural-mutedtext hover:bg-natural-paper transition-colors"
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={() => onRemoveItem(item.dish.id)}
                        className="text-natural-lightsage hover:text-red-600 transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100 p-1 rounded-lg"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Checkout Block */}
          {cart.length > 0 && (
            <div className="bg-white border-t border-natural-border p-6 space-y-4">
              {/* Promo Code Form */}
              <form onSubmit={handleApplyPromo} className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-natural-lightsage" />
                  <input
                    type="text"
                    placeholder="ASTA20 or WELCOME10"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="w-full text-xs bg-natural-paper pl-9 pr-4 py-2.5 rounded-full border border-natural-border focus:border-natural-sage focus:outline-hidden transition-all uppercase font-medium placeholder-natural-lightsage text-natural-dark"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-natural-sage text-white hover:bg-natural-moss text-[10px] font-bold uppercase tracking-wider px-4 py-2.5 rounded-full transition-colors cursor-pointer"
                >
                  Apply
                </button>
              </form>

              {promoError && <p className="text-[10px] text-red-600 font-medium px-2">{promoError}</p>}
              {promoSuccess && <p className="text-[10px] text-emerald-600 font-medium px-2">{promoSuccess}</p>}

              {/* Price Calculation details */}
              <div className="space-y-1.5 text-xs font-medium text-natural-mutedtext pt-2 border-t border-natural-border/60">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-natural-dark">${subtotal.toFixed(2)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-600">
                    <span>Discount ({discountPercent}%)</span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Estimated Delivery</span>
                  <span className="text-natural-dark">
                    {deliveryFee === 0 ? <span className="text-emerald-600">FREE</span> : `$${deliveryFee.toFixed(2)}`}
                  </span>
                </div>
                {deliveryFee > 0 && (
                  <p className="text-[9px] text-natural-lightsage italic text-right">Free delivery on orders over $50!</p>
                )}
                <div className="flex justify-between text-sm font-bold text-natural-dark pt-2 border-t border-natural-border/60">
                  <span>Estimated Total</span>
                  <span className="font-serif">${grandTotal.toFixed(2)}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={() => onCheckout(promoSuccess ? promoCode.toUpperCase() : '', discountAmount)}
                className="w-full mt-2 bg-natural-moss hover:bg-natural-sage text-white font-bold uppercase tracking-wider text-xs py-4 px-6 rounded-full flex items-center justify-center gap-2 group shadow-lg cursor-pointer transition-all active:scale-[0.99]"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
