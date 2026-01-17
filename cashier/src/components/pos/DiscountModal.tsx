'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Percent, DollarSign } from 'lucide-react';

interface DiscountModalProps {
    isOpen: boolean;
    onClose: () => void;
    onApply: (amount: number, type: 'percentage' | 'fixed') => void;
    subtotal: number;
}

export default function DiscountModal({ isOpen, onClose, onApply, subtotal }: DiscountModalProps) {
    const [discountType, setDiscountType] = useState<'percentage' | 'fixed'>('percentage');
    const [amount, setAmount] = useState('');

    const presetPercentages = [5, 10, 15, 20, 25];
    const presetFixed = [1, 2, 5, 10];

    const handleApply = () => {
        const numAmount = parseFloat(amount);
        if (isNaN(numAmount) || numAmount <= 0) return;

        onApply(numAmount, discountType);
        setAmount('');
        onClose();
    };

    const handlePreset = (value: number) => {
        setAmount(value.toString());
    };

    const calculateDiscount = () => {
        const numAmount = parseFloat(amount);
        if (isNaN(numAmount)) return 0;

        if (discountType === 'percentage') {
            return (subtotal * numAmount) / 100;
        }
        return numAmount;
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-sm z-50 p-4"
                    >
                        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
                            {/* Header */}
                            <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--border)]">
                                <h2 className="text-lg font-semibold">Apply Discount</h2>
                                <button
                                    onClick={onClose}
                                    className="p-2 rounded-lg hover:bg-[var(--background-alt)] transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="p-6">
                                {/* Discount Type Toggle */}
                                <div className="flex gap-2 mb-6">
                                    <button
                                        onClick={() => setDiscountType('percentage')}
                                        className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-medium transition-colors ${discountType === 'percentage'
                                            ? 'bg-[var(--primary)] text-white'
                                            : 'bg-[var(--background-alt)] text-[var(--text-secondary)]'
                                            }`}
                                    >
                                        <Percent className="w-4 h-4" />
                                        Percentage
                                    </button>
                                    <button
                                        onClick={() => setDiscountType('fixed')}
                                        className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-medium transition-colors ${discountType === 'fixed'
                                            ? 'bg-[var(--primary)] text-white'
                                            : 'bg-[var(--background-alt)] text-[var(--text-secondary)]'
                                            }`}
                                    >
                                        <DollarSign className="w-4 h-4" />
                                        Fixed Amount
                                    </button>
                                </div>

                                {/* Preset Buttons */}
                                <div className="mb-4">
                                    <p className="text-sm text-[var(--text-muted)] mb-2">Quick select</p>
                                    <div className="flex gap-2">
                                        {(discountType === 'percentage' ? presetPercentages : presetFixed).map((value) => (
                                            <button
                                                key={value}
                                                onClick={() => handlePreset(value)}
                                                className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${amount === value.toString()
                                                    ? 'bg-[var(--primary)] text-white'
                                                    : 'bg-[var(--background-alt)] hover:bg-[var(--border)]'
                                                    }`}
                                            >
                                                {discountType === 'percentage' ? `${value}%` : `₱${value}`}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Custom Amount Input */}
                                <div className="mb-6">
                                    <p className="text-sm text-[var(--text-muted)] mb-2">Custom amount</p>
                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)]">
                                            {discountType === 'percentage' ? '%' : '₱'}
                                        </span>
                                        <input
                                            type="number"
                                            value={amount}
                                            onChange={(e) => setAmount(e.target.value)}
                                            placeholder="Enter amount"
                                            className="input pl-10 text-lg"
                                            min="0"
                                            max={discountType === 'percentage' ? 100 : subtotal}
                                        />
                                    </div>
                                </div>

                                {/* Preview */}
                                {amount && (
                                    <div className="mb-6 p-4 bg-[var(--background-alt)] rounded-xl">
                                        <div className="flex justify-between text-sm mb-2">
                                            <span className="text-[var(--text-muted)]">Subtotal</span>
                                            <span>₱{subtotal.toFixed(2)}</span>
                                        </div>
                                        <div className="flex justify-between text-sm text-[var(--primary)]">
                                            <span>Discount</span>
                                            <span>-₱{calculateDiscount().toFixed(2)}</span>
                                        </div>
                                        <div className="flex justify-between font-semibold mt-2 pt-2 border-t border-[var(--border)]">
                                            <span>New Total</span>
                                            <span>₱{(subtotal - calculateDiscount()).toFixed(2)}</span>
                                        </div>
                                    </div>
                                )}

                                {/* Actions */}
                                <div className="flex gap-3">
                                    <button
                                        onClick={onClose}
                                        className="flex-1 btn btn-outline"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleApply}
                                        disabled={!amount || parseFloat(amount) <= 0}
                                        className="flex-1 btn btn-primary disabled:opacity-50"
                                    >
                                        Apply Discount
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
