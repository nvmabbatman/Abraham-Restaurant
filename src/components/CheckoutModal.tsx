import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Check, CreditCard, ChevronRight, ShoppingBag, ArrowLeft, Heart, Loader2 } from 'lucide-react';
import { CartItem, CheckoutDetails } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  discountAmount: number;
  onClearCart: () => void;
}

export default function CheckoutModal({
  isOpen,
  onClose,
  cart,
  discountAmount,
  onClearCart
}: CheckoutModalProps) {
  if (!isOpen) return null;

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [details, setDetails] = useState<CheckoutDetails>({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  });

  const [errors, setErrors] = useState<Partial<CheckoutDetails>>({});

  const subtotal = cart.reduce((sum, item) => sum + item.dish.price * item.quantity, 0);
  const deliveryFee = subtotal > 50 ? 0 : 5.00;
  const grandTotal = subtotal - discountAmount + deliveryFee;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDetails(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof CheckoutDetails]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateStep1 = () => {
    const tempErrors: Partial<CheckoutDetails> = {};
    if (!details.fullName.trim()) tempErrors.fullName = 'Full Name is required';
    if (!details.email.trim()) {
      tempErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(details.email)) {
      tempErrors.email = 'Invalid email address';
    }
    if (!details.phone.trim()) tempErrors.phone = 'Phone number is required';
    if (!details.address.trim()) tempErrors.address = 'Delivery address is required';
    if (!details.city.trim()) tempErrors.city = 'City is required';
    if (!details.zipCode.trim()) tempErrors.zipCode = 'ZIP Code is required';

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const validateStep2 = () => {
    const tempErrors: Partial<CheckoutDetails> = {};
    if (!details.cardNumber.replace(/\s/g, '')) {
      tempErrors.cardNumber = 'Card Number is required';
    } else if (details.cardNumber.replace(/\s/g, '').length < 16) {
      tempErrors.cardNumber = 'Card number must be 16 digits';
    }
    if (!details.expiryDate.trim()) {
      tempErrors.expiryDate = 'Expiry is required';
    } else if (!/^\d{2}\/\d{2}$/.test(details.expiryDate)) {
      tempErrors.expiryDate = 'Format must be MM/YY';
    }
    if (!details.cvv.trim()) {
      tempErrors.cvv = 'CVV is required';
    } else if (details.cvv.length < 3) {
      tempErrors.cvv = 'CVV must be 3 or 4 digits';
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleNextStep = () => {
    if (step === 1) {
      if (validateStep1()) setStep(2);
    }
  };

  const handlePlaceOrder = () => {
    if (validateStep2()) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setStep(3);
        onClearCart();
      }, 2000);
    }
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length > 0) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const formatExpiry = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return `${v.slice(0, 2)}/${v.slice(2, 4)}`;
    }
    return v;
  };

  const randomOrderId = `ASTA-${Math.floor(100000 + Math.random() * 900000)}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={step < 3 ? onClose : undefined}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      />

      {/* Checkout Card Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ type: 'spring', damping: 25, stiffness: 220 }}
        className="relative w-full max-w-2xl bg-[#faf9f5] border border-natural-border shadow-2xl rounded-[32px] overflow-hidden z-10 max-h-[90vh] flex flex-col"
      >
        {/* Close Button */}
        {step < 3 && (
          <button
            onClick={onClose}
            className="absolute right-4 top-4 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-natural-paper hover:bg-natural-border/60 transition-colors text-natural-dark cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        )}

        {/* Step Indicator Header */}
        {step < 3 && (
          <div className="bg-white border-b border-natural-border px-6 py-4 flex items-center gap-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-natural-dark flex items-center gap-2">
              <ShoppingBag className="w-4 h-4 text-natural-sage" /> Checkout Securely
            </h2>
            <div className="flex items-center gap-1.5 ml-auto text-xs font-semibold">
              <span className={`px-2.5 py-1 rounded-full ${step === 1 ? 'bg-natural-moss text-white' : 'bg-natural-paper text-natural-sage border border-natural-lightsage/30'}`}>
                {step === 1 ? '1. Shipping' : '✓ Shipping'}
              </span>
              <ChevronRight className="w-3.5 h-3.5 text-natural-lightsage" />
              <span className={`px-2.5 py-1 rounded-full ${step === 2 ? 'bg-natural-moss text-white' : 'bg-natural-paper text-natural-lightsage border border-natural-border/50'}`}>
                2. Payment
              </span>
            </div>
          </div>
        )}

        <div className="flex-1 overflow-y-auto p-6 md:p-8 no-scrollbar">
          <AnimatePresence mode="wait">
            {/* STEP 1: SHIPPING DETAILS */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="grid grid-cols-1 md:grid-cols-5 gap-6"
              >
                {/* Form fields */}
                <div className="md:col-span-3 space-y-4">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-natural-dark border-b border-natural-border pb-2 mb-3">
                    Delivery Address
                  </h3>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-natural-mutedtext uppercase tracking-wider block">Full Name</label>
                    <input
                      type="text"
                      name="fullName"
                      value={details.fullName}
                      onChange={handleInputChange}
                      className="w-full text-xs bg-white px-4 py-2.5 rounded-xl border border-natural-border focus:border-natural-sage focus:outline-hidden transition-all text-natural-dark"
                      placeholder="E.g., Johnathan Doe"
                    />
                    {errors.fullName && <p className="text-[10px] text-red-600 font-semibold">{errors.fullName}</p>}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-natural-mutedtext uppercase tracking-wider block">Email Address</label>
                      <input
                        type="email"
                        name="email"
                        value={details.email}
                        onChange={handleInputChange}
                        className="w-full text-xs bg-white px-4 py-2.5 rounded-xl border border-natural-border focus:border-natural-sage focus:outline-hidden transition-all text-natural-dark"
                        placeholder="john@example.com"
                      />
                      {errors.email && <p className="text-[10px] text-red-600 font-semibold">{errors.email}</p>}
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-natural-mutedtext uppercase tracking-wider block">Phone Number</label>
                      <input
                        type="tel"
                        name="phone"
                        value={details.phone}
                        onChange={handleInputChange}
                        className="w-full text-xs bg-white px-4 py-2.5 rounded-xl border border-natural-border focus:border-natural-sage focus:outline-hidden transition-all text-natural-dark"
                        placeholder="(555) 000-0000"
                      />
                      {errors.phone && <p className="text-[10px] text-red-600 font-semibold">{errors.phone}</p>}
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-natural-mutedtext uppercase tracking-wider block">Street Address</label>
                    <input
                      type="text"
                      name="address"
                      value={details.address}
                      onChange={handleInputChange}
                      className="w-full text-xs bg-white px-4 py-2.5 rounded-xl border border-natural-border focus:border-natural-sage focus:outline-hidden transition-all text-natural-dark"
                      placeholder="123 Gourmet Street, Apt 4"
                    />
                    {errors.address && <p className="text-[10px] text-red-600 font-semibold">{errors.address}</p>}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-natural-mutedtext uppercase tracking-wider block">City</label>
                      <input
                        type="text"
                        name="city"
                        value={details.city}
                        onChange={handleInputChange}
                        className="w-full text-xs bg-white px-4 py-2.5 rounded-xl border border-natural-border focus:border-natural-sage focus:outline-hidden transition-all text-natural-dark"
                        placeholder="San Francisco"
                      />
                      {errors.city && <p className="text-[10px] text-red-600 font-semibold">{errors.city}</p>}
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-natural-mutedtext uppercase tracking-wider block">ZIP Code</label>
                      <input
                        type="text"
                        name="zipCode"
                        value={details.zipCode}
                        onChange={handleInputChange}
                        className="w-full text-xs bg-white px-4 py-2.5 rounded-xl border border-natural-border focus:border-natural-sage focus:outline-hidden transition-all text-natural-dark"
                        placeholder="94105"
                      />
                      {errors.zipCode && <p className="text-[10px] text-red-600 font-semibold">{errors.zipCode}</p>}
                    </div>
                  </div>
                </div>

                {/* Summary Panel */}
                <div className="md:col-span-2 bg-white rounded-2xl border border-natural-border p-4 flex flex-col h-fit">
                  <h4 className="text-[10px] font-bold uppercase tracking-widest text-natural-dark border-b border-natural-border/50 pb-2 mb-3">
                    Order Summary
                  </h4>
                  <div className="space-y-3 flex-1 overflow-y-auto max-h-[160px] no-scrollbar">
                    {cart.map(item => (
                      <div key={item.dish.id} className="flex justify-between text-xs gap-3">
                        <span className="text-natural-mutedtext truncate">{item.quantity}x {item.dish.name}</span>
                        <span className="font-semibold text-natural-dark shrink-0">${(item.dish.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-natural-border pt-3 mt-3 space-y-1.5 text-xs font-semibold text-natural-mutedtext">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span className="text-natural-dark">${subtotal.toFixed(2)}</span>
                    </div>
                    {discountAmount > 0 && (
                      <div className="flex justify-between text-natural-sage">
                        <span>Discount</span>
                        <span>-${discountAmount.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span>Delivery Fee</span>
                      <span className="text-natural-dark">{deliveryFee === 0 ? 'FREE' : `$${deliveryFee.toFixed(2)}`}</span>
                    </div>
                    <div className="flex justify-between text-natural-dark font-bold border-t border-natural-border pt-2 mt-2 text-sm">
                      <span>Grand Total</span>
                      <span className="font-serif text-natural-dark">${grandTotal.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* STEP 2: PAYMENT METHOD */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="max-w-md mx-auto space-y-6"
              >
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-widest text-natural-dark border-b border-natural-border pb-2 mb-4">
                    Credit Card Payment
                  </h3>

                  {/* Visual Card Preview */}
                  <div className="relative bg-gradient-to-tr from-natural-moss to-natural-sage rounded-2xl p-6 text-[#faf9f5] shadow-lg mb-6 overflow-hidden">
                    <div className="absolute right-0 bottom-0 opacity-10 font-bold serif-display text-8xl translate-x-1/4 translate-y-1/4 pointer-events-none">
                      ASTA
                    </div>
                    <div className="flex justify-between items-start">
                      <CreditCard className="w-8 h-8 text-white" />
                      <span className="serif-display text-lg font-bold tracking-widest italic lowercase text-white">asta.</span>
                    </div>
                    <p className="mt-8 font-mono text-base tracking-widest text-white/90">
                      {details.cardNumber || '•••• •••• •••• ••••'}
                    </p>
                    <div className="flex justify-between items-end mt-6">
                      <div>
                        <span className="text-[8px] uppercase tracking-wider text-[#faf9f5]/70 block">Cardholder</span>
                        <span className="text-xs font-semibold tracking-wider uppercase truncate max-w-[150px] block text-white">
                          {details.fullName || 'JOHNATHAN DOE'}
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-[8px] uppercase tracking-wider text-[#faf9f5]/70 block">Expires</span>
                        <span className="text-xs font-semibold tracking-wider font-mono text-white">
                          {details.expiryDate || 'MM/YY'}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-natural-mutedtext uppercase tracking-wider block">Card Number</label>
                      <input
                        type="text"
                        name="cardNumber"
                        value={details.cardNumber}
                        onChange={(e) => {
                          e.target.value = formatCardNumber(e.target.value);
                          handleInputChange(e);
                        }}
                        maxLength={19}
                        className="w-full text-xs bg-white px-4 py-2.5 rounded-xl border border-natural-border focus:border-natural-sage focus:outline-hidden transition-all text-natural-dark font-mono"
                        placeholder="4111 2222 3333 4444"
                      />
                      {errors.cardNumber && <p className="text-[10px] text-red-600 font-semibold">{errors.cardNumber}</p>}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-natural-mutedtext uppercase tracking-wider block">Expiry Date</label>
                        <input
                          type="text"
                          name="expiryDate"
                          value={details.expiryDate}
                          onChange={(e) => {
                            e.target.value = formatExpiry(e.target.value);
                            handleInputChange(e);
                          }}
                          maxLength={5}
                          className="w-full text-xs bg-white px-4 py-2.5 rounded-xl border border-natural-border focus:border-natural-sage focus:outline-hidden transition-all text-natural-dark font-mono"
                          placeholder="MM/YY"
                        />
                        {errors.expiryDate && <p className="text-[10px] text-red-600 font-semibold">{errors.expiryDate}</p>}
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-natural-mutedtext uppercase tracking-wider block">CVV</label>
                        <input
                          type="password"
                          name="cvv"
                          value={details.cvv}
                          onChange={handleInputChange}
                          maxLength={4}
                          className="w-full text-xs bg-white px-4 py-2.5 rounded-xl border border-natural-border focus:border-natural-sage focus:outline-hidden transition-all text-natural-dark font-mono"
                          placeholder="•••"
                        />
                        {errors.cvv && <p className="text-[10px] text-red-600 font-semibold">{errors.cvv}</p>}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* STEP 3: ORDER SUCCESS ANIMATION / DETAILED RECEIPT */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-6 max-w-md mx-auto space-y-6"
              >
                {/* Micro Particles Check Indicator */}
                <div className="relative inline-flex items-center justify-center">
                  <div className="absolute inset-0 bg-natural-paper rounded-full animate-ping opacity-30" />
                  <div className="h-16 w-16 bg-natural-sage rounded-full flex items-center justify-center text-white relative z-10 shadow-lg">
                    <Check className="w-8 h-8 stroke-[3]" />
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="serif-display text-2xl md:text-3xl font-bold text-natural-dark">
                    Order Confirmed!
                  </h3>
                  <p className="text-natural-mutedtext text-xs max-w-sm mx-auto">
                    Thank you, <span className="font-semibold text-natural-dark">{details.fullName}</span>! Your gourmet feast has been approved and is being carefully crafted.
                  </p>
                </div>

                {/* Invoice Receipt Panel */}
                <div className="bg-white border border-natural-border rounded-2xl p-6 text-left shadow-xs space-y-4">
                  <div className="flex justify-between text-[10px] font-bold text-natural-lightsage uppercase tracking-widest pb-3 border-b border-natural-border/50">
                    <span>Receipt ID: {randomOrderId}</span>
                    <span>{new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                  </div>

                  {/* Delivery Status and Time */}
                  <div className="bg-[#faf9f5] border border-natural-border rounded-xl p-3 flex justify-between items-center text-xs">
                    <div>
                      <span className="text-[9px] font-bold text-natural-mutedtext uppercase tracking-wider block">Estimated Delivery</span>
                      <span className="font-bold text-natural-moss mt-0.5 block">25 — 35 Minutes</span>
                    </div>
                    <div className="text-right">
                      <span className="text-[9px] font-bold text-natural-mutedtext uppercase tracking-wider block">Shipping Mode</span>
                      <span className="font-semibold text-natural-dark mt-0.5 block">Standard Delivery</span>
                    </div>
                  </div>

                  {/* Short Summary detail */}
                  <div className="space-y-1.5 text-xs font-semibold text-natural-mutedtext">
                    <p className="text-[9px] font-bold text-natural-lightsage uppercase tracking-widest mb-1">Destination</p>
                    <p className="text-natural-dark">{details.address}, {details.city}, {details.zipCode}</p>
                    <p className="text-natural-mutedtext text-[10px]">Contact: {details.phone}</p>
                  </div>

                  <div className="pt-3 border-t border-natural-border/60 flex justify-between items-center font-bold text-natural-dark">
                    <span className="text-xs uppercase tracking-wider">Total Charge</span>
                    <span className="font-serif text-lg text-natural-dark">${grandTotal.toFixed(2)}</span>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <button
                    onClick={onClose}
                    className="bg-natural-sage hover:bg-natural-moss text-white font-bold uppercase tracking-wider text-[11px] py-3 px-6 rounded-full shadow-md cursor-pointer transition-colors"
                  >
                    Done Ordering
                  </button>
                  <p className="text-[10px] text-natural-lightsage flex items-center justify-center gap-1">
                    Made with <Heart className="w-3 h-3 text-natural-sage fill-natural-sage" /> by Asta Restaurant
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Action Button Footer (Steps 1 & 2 only) */}
        {step < 3 && (
          <div className="bg-white border-t border-natural-border px-6 py-4 flex justify-between items-center">
            {step === 2 ? (
              <button
                onClick={() => setStep(1)}
                className="flex items-center gap-1.5 text-natural-mutedtext hover:text-natural-dark text-xs font-bold uppercase tracking-wider cursor-pointer bg-transparent border-0"
              >
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
            ) : (
              <div />
            )}

            {step === 1 ? (
              <button
                onClick={handleNextStep}
                className="bg-natural-moss hover:bg-natural-sage text-white font-bold uppercase tracking-wider text-xs py-3 px-6 rounded-full flex items-center gap-1.5 cursor-pointer shadow-md"
              >
                <span>Continue</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handlePlaceOrder}
                disabled={loading}
                className="bg-natural-sage hover:bg-natural-moss text-white font-bold uppercase tracking-wider text-xs py-3 px-6 rounded-full flex items-center gap-1.5 cursor-pointer shadow-md disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Verifying...</span>
                  </>
                ) : (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Place Order — ${grandTotal.toFixed(2)}</span>
                  </>
                )}
              </button>
            )}
          </div>
        )}
      </motion.div>
    </div>
  );
}
