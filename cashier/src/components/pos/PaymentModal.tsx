'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    X,
    CreditCard,
    Banknote,
    Smartphone,
    Check,
    ArrowRight,
    Calculator
} from 'lucide-react';

interface PaymentModalProps {
    isOpen: boolean;
    onClose: () => void;
    onComplete: (method: string) => void;
    total: number;
}

type PaymentMethod = 'card' | 'cash' | 'split' | 'mobile';

export default function PaymentModal({ isOpen, onClose, onComplete, total }: PaymentModalProps) {
    const [method, setMethod] = useState<PaymentMethod | null>(null);
    const [cashAmount, setCashAmount] = useState('');
    const [cardAmount, setCardAmount] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [cardExpiry, setCardExpiry] = useState('');
    const [cardCvc, setCardCvc] = useState('');
    const [processing, setProcessing] = useState(false);
    const [success, setSuccess] = useState(false);

    const change = parseFloat(cashAmount) - total;
    const splitRemaining = total - (parseFloat(cashAmount) || 0);

    const formatCardNumber = (value: string) => {
        const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
        const matches = v.match(/\d{4,16}/g);
        const match = (matches && matches[0]) || '';
        const parts = [];
        for (let i = 0, len = match.length; i < len; i += 4) {
            parts.push(match.substring(i, i + 4));
        }
        return parts.length ? parts.join(' ') : value;
    };

    const formatExpiry = (value: string) => {
        const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
        if (v.length >= 2) {
            return v.substring(0, 2) + '/' + v.substring(2, 4);
        }
        return v;
    };

    const handleProcess = () => {
        setProcessing(true);
        setTimeout(() => {
            setProcessing(false);
            setSuccess(true);
            setTimeout(() => {
                onComplete(method || 'card');
                resetForm();
            }, 1500);
        }, 2000);
    };

    const resetForm = () => {
        setMethod(null);
        setCashAmount('');
        setCardAmount('');
        setCardNumber('');
        setCardExpiry('');
        setCardCvc('');
        setSuccess(false);
    };

    const isCardValid = cardNumber.length >= 19 && cardExpiry.length >= 5 && cardCvc.length >= 3;

    const quickCash = [20, 50, 100];

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
                        className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md z-50 p-4"
                    >
                        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
                            {/* Header */}
                            <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--border)] bg-[var(--background-alt)]">
                                <div>
                                    <h2 className="text-lg font-semibold">Payment</h2>
                                    <p className="text-2xl font-bold text-[var(--primary)]">₱{total.toFixed(2)}</p>
                                </div>
                                <button
                                    onClick={onClose}
                                    className="p-2 rounded-lg hover:bg-white transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="p-6">
                                {success ? (
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        className="text-center py-8"
                                    >
                                        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <Check className="w-10 h-10 text-green-600" />
                                        </div>
                                        <h3 className="text-xl font-semibold text-green-600">Payment Successful!</h3>
                                        <p className="text-[var(--text-muted)] mt-2">Receipt is printing...</p>
                                    </motion.div>
                                ) : !method ? (
                                    <>
                                        {/* Payment Method Selection */}
                                        <p className="text-sm text-[var(--text-muted)] mb-4">Select payment method</p>
                                        <div className="grid grid-cols-2 gap-3">
                                            <button
                                                onClick={() => setMethod('card')}
                                                className="flex flex-col items-center gap-2 p-4 rounded-xl border-2 border-[var(--border)] hover:border-[var(--primary)] transition-colors"
                                            >
                                                <CreditCard className="w-8 h-8 text-[var(--primary)]" />
                                                <span className="font-medium">Card</span>
                                            </button>
                                            <button
                                                onClick={() => setMethod('cash')}
                                                className="flex flex-col items-center gap-2 p-4 rounded-xl border-2 border-[var(--border)] hover:border-[var(--primary)] transition-colors"
                                            >
                                                <Banknote className="w-8 h-8 text-green-600" />
                                                <span className="font-medium">Cash</span>
                                            </button>
                                            <button
                                                onClick={() => setMethod('split')}
                                                className="flex flex-col items-center gap-2 p-4 rounded-xl border-2 border-[var(--border)] hover:border-[var(--primary)] transition-colors"
                                            >
                                                <Calculator className="w-8 h-8 text-purple-600" />
                                                <span className="font-medium">Split</span>
                                            </button>
                                            <button
                                                onClick={() => setMethod('mobile')}
                                                className="flex flex-col items-center gap-2 p-4 rounded-xl border-2 border-[var(--border)] hover:border-[var(--primary)] transition-colors"
                                            >
                                                <Smartphone className="w-8 h-8 text-blue-600" />
                                                <span className="font-medium">Mobile Pay</span>
                                            </button>
                                        </div>
                                    </>
                                ) : method === 'card' || method === 'mobile' ? (
                                    <>
                                        {/* Card Payment Form */}
                                        <button onClick={() => setMethod(null)} className="text-sm text-[var(--primary)] mb-4">
                                            ← Change method
                                        </button>

                                        <div className="space-y-4">
                                            <div>
                                                <label className="text-sm text-[var(--text-muted)] mb-1 block">Card Number</label>
                                                <input
                                                    type="text"
                                                    value={cardNumber}
                                                    onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                                                    placeholder="1234 5678 9012 3456"
                                                    maxLength={19}
                                                    className="input"
                                                />
                                            </div>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <label className="text-sm text-[var(--text-muted)] mb-1 block">Expiry</label>
                                                    <input
                                                        type="text"
                                                        value={cardExpiry}
                                                        onChange={(e) => setCardExpiry(formatExpiry(e.target.value))}
                                                        placeholder="MM/YY"
                                                        maxLength={5}
                                                        className="input"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="text-sm text-[var(--text-muted)] mb-1 block">CVC</label>
                                                    <input
                                                        type="text"
                                                        value={cardCvc}
                                                        onChange={(e) => setCardCvc(e.target.value.replace(/\D/g, ''))}
                                                        placeholder="123"
                                                        maxLength={4}
                                                        className="input"
                                                    />
                                                </div>
                                            </div>

                                            <motion.button
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                                onClick={handleProcess}
                                                disabled={!isCardValid || processing}
                                                className="w-full btn btn-primary py-3 disabled:opacity-50"
                                            >
                                                {processing ? (
                                                    <motion.div
                                                        animate={{ rotate: 360 }}
                                                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                                                        className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                                                    />
                                                ) : (
                                                    <>
                                                        Pay ₱{total.toFixed(2)}
                                                        <ArrowRight className="w-4 h-4" />
                                                    </>
                                                )}
                                            </motion.button>
                                        </div>
                                    </>
                                ) : method === 'cash' ? (
                                    <>
                                        {/* Cash Payment */}
                                        <button onClick={() => setMethod(null)} className="text-sm text-[var(--primary)] mb-4">
                                            ← Change method
                                        </button>

                                        <div className="space-y-4">
                                            <div>
                                                <label className="text-sm text-[var(--text-muted)] mb-1 block">Amount Received</label>
                                                <input
                                                    type="number"
                                                    value={cashAmount}
                                                    onChange={(e) => setCashAmount(e.target.value)}
                                                    placeholder="0.00"
                                                    className="input text-2xl font-bold text-center"
                                                />
                                            </div>

                                            <div className="flex gap-2">
                                                {quickCash.map((amount) => (
                                                    <button
                                                        key={amount}
                                                        onClick={() => setCashAmount(amount.toString())}
                                                        className="flex-1 btn btn-outline"
                                                    >
                                                        ₱{amount}
                                                    </button>
                                                ))}
                                                <button
                                                    onClick={() => setCashAmount(total.toFixed(2))}
                                                    className="flex-1 btn btn-outline"
                                                >
                                                    Exact
                                                </button>
                                            </div>

                                            {parseFloat(cashAmount) >= total && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    className="p-4 bg-green-50 rounded-xl text-center"
                                                >
                                                    <p className="text-sm text-green-600">Change Due</p>
                                                    <p className="text-3xl font-bold text-green-700">₱{change.toFixed(2)}</p>
                                                </motion.div>
                                            )}

                                            <motion.button
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                                onClick={handleProcess}
                                                disabled={parseFloat(cashAmount) < total || processing}
                                                className="w-full btn btn-primary py-3 disabled:opacity-50"
                                            >
                                                {processing ? 'Processing...' : 'Complete Payment'}
                                            </motion.button>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        {/* Split Payment */}
                                        <button onClick={() => setMethod(null)} className="text-sm text-[var(--primary)] mb-4">
                                            ← Change method
                                        </button>

                                        <div className="space-y-4">
                                            <div>
                                                <label className="text-sm text-[var(--text-muted)] mb-1 block">Cash Amount</label>
                                                <input
                                                    type="number"
                                                    value={cashAmount}
                                                    onChange={(e) => setCashAmount(e.target.value)}
                                                    placeholder="0.00"
                                                    className="input"
                                                    max={total}
                                                />
                                            </div>

                                            {parseFloat(cashAmount) > 0 && parseFloat(cashAmount) < total && (
                                                <div className="p-4 bg-blue-50 rounded-xl">
                                                    <p className="text-sm text-blue-600">Remaining on Card</p>
                                                    <p className="text-2xl font-bold text-blue-700">₱{splitRemaining.toFixed(2)}</p>
                                                </div>
                                            )}

                                            <motion.button
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                                onClick={handleProcess}
                                                disabled={!cashAmount || parseFloat(cashAmount) >= total || processing}
                                                className="w-full btn btn-primary py-3 disabled:opacity-50"
                                            >
                                                {processing ? 'Processing...' : 'Process Split Payment'}
                                            </motion.button>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
