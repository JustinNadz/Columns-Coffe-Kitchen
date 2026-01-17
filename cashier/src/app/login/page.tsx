'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Coffee, Lock, Delete, AlertCircle, Check } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function CashierLoginPage() {
    const [pin, setPin] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handlePinInput = (digit: string) => {
        if (pin.length < 4) {
            const newPin = pin + digit;
            setPin(newPin);
            setError('');

            // Auto-submit when 4 digits entered
            if (newPin.length === 4) {
                handleSubmit(newPin);
            }
        }
    };

    const handleDelete = () => {
        setPin(prev => prev.slice(0, -1));
        setError('');
    };

    const handleSubmit = async (pinToCheck: string) => {
        setLoading(true);

        await new Promise(resolve => setTimeout(resolve, 500));

        // Demo PIN: 1234
        if (pinToCheck === '1234') {
            setSuccess(true);
            localStorage.setItem('cashierAuth', JSON.stringify({
                isAuthenticated: true,
                user: { name: 'Cassie M.', role: 'cashier' },
                expiry: Date.now() + 8 * 60 * 60 * 1000,
            }));

            setTimeout(() => {
                router.push('/');
            }, 1000);
        } else {
            setError('Invalid PIN');
            setPin('');
        }

        setLoading(false);
    };

    const digits = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '', '0', 'del'];

    return (
        <div className="min-h-screen bg-[var(--background-sidebar)] flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-sm"
            >
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-[var(--primary)] rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <Coffee className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-2xl font-bold text-white">Cashier Login</h1>
                    <p className="text-gray-400">Enter your 4-digit PIN</p>
                </div>

                <div className="bg-white rounded-3xl p-8 shadow-2xl">
                    {/* PIN Display */}
                    <div className="flex justify-center gap-3 mb-6">
                        {[0, 1, 2, 3].map((i) => (
                            <motion.div
                                key={i}
                                animate={{
                                    scale: pin.length > i ? [1, 1.2, 1] : 1,
                                    backgroundColor: pin.length > i ? '#5C8D4D' : '#E5E5E5',
                                }}
                                transition={{ duration: 0.2 }}
                                className="w-4 h-4 rounded-full"
                            />
                        ))}
                    </div>

                    {/* Error Message */}
                    <AnimatePresence>
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="flex items-center justify-center gap-2 text-red-500 text-sm mb-4"
                            >
                                <AlertCircle className="w-4 h-4" />
                                {error}
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Success Message */}
                    <AnimatePresence>
                        {success && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="flex items-center justify-center gap-2 text-green-600 text-sm mb-4"
                            >
                                <Check className="w-4 h-4" />
                                Welcome back!
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Keypad */}
                    <div className="grid grid-cols-3 gap-3">
                        {digits.map((digit, i) => {
                            if (digit === '') {
                                return <div key={i} />;
                            }
                            if (digit === 'del') {
                                return (
                                    <motion.button
                                        key="del"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={handleDelete}
                                        disabled={loading || success}
                                        className="aspect-square rounded-2xl bg-[var(--background-alt)] flex items-center justify-center hover:bg-[var(--border)] transition-colors disabled:opacity-50"
                                    >
                                        <Delete className="w-6 h-6" />
                                    </motion.button>
                                );
                            }
                            return (
                                <motion.button
                                    key={digit}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => handlePinInput(digit)}
                                    disabled={loading || success}
                                    className="aspect-square rounded-2xl bg-[var(--background-alt)] text-2xl font-semibold hover:bg-[var(--border)] transition-colors disabled:opacity-50"
                                >
                                    {digit}
                                </motion.button>
                            );
                        })}
                    </div>

                    <div className="mt-6 text-center text-sm text-[var(--text-muted)]">
                        <p>Demo PIN: <code className="bg-[var(--background-alt)] px-2 py-0.5 rounded">1234</code></p>
                    </div>
                </div>

                <button className="w-full mt-6 text-gray-400 text-sm hover:text-white transition-colors">
                    Switch to Admin Login →
                </button>
            </motion.div>
        </div>
    );
}
