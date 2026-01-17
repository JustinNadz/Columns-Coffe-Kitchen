'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Coffee, User, Lock, LogIn, AlertCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    // Load remembered email
    useEffect(() => {
        const remembered = localStorage.getItem('rememberedEmail');
        if (remembered) {
            setEmail(remembered);
            setRememberMe(true);
        }
    }, []);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        // Simulate login
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Demo credentials
        if (email === 'customer@example.com' && password === 'customer123') {
            if (rememberMe) {
                localStorage.setItem('rememberedEmail', email);
            } else {
                localStorage.removeItem('rememberedEmail');
            }

            // Save auth state
            localStorage.setItem('customerAuth', JSON.stringify({
                isAuthenticated: true,
                user: { name: 'John Doe', email },
                expiry: Date.now() + 8 * 60 * 60 * 1000,
            }));

            router.push('/');
        } else {
            setError('Invalid email or password');
        }

        setLoading(false);
    };

    return (
        <div className="min-h-screen bg-[var(--background-alt)] flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md"
            >
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-[var(--primary)] rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <Coffee className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-2xl font-bold">Welcome Back</h1>
                    <p className="text-[var(--text-muted)]">Sign in to your account</p>
                </div>

                <div className="card p-6">
                    <form onSubmit={handleLogin} className="space-y-4">
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="flex items-center gap-2 p-3 bg-red-50 text-red-600 rounded-lg text-sm"
                            >
                                <AlertCircle className="w-4 h-4" />
                                {error}
                            </motion.div>
                        )}

                        <div>
                            <label className="text-sm text-[var(--text-muted)] mb-1 block">Email</label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--text-muted)]" />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="you@example.com"
                                    className="input pl-10"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="text-sm text-[var(--text-muted)] mb-1 block">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--text-muted)]" />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="input pl-10"
                                    required
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={rememberMe}
                                    onChange={(e) => setRememberMe(e.target.checked)}
                                    className="w-4 h-4 rounded border-gray-300 text-[var(--primary)] focus:ring-[var(--primary)]"
                                />
                                <span className="text-sm">Remember me</span>
                            </label>
                            <button type="button" className="text-sm text-[var(--primary)] hover:underline">
                                Forgot password?
                            </button>
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            type="submit"
                            disabled={loading}
                            className="w-full btn btn-primary py-3"
                        >
                            {loading ? (
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                                    className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                                />
                            ) : (
                                <>
                                    <LogIn className="w-4 h-4" />
                                    Sign In
                                </>
                            )}
                        </motion.button>
                    </form>

                    <div className="mt-6 text-center text-sm text-[var(--text-muted)]">
                        <p>Demo credentials:</p>
                        <code className="text-xs bg-[var(--background-alt)] px-2 py-1 rounded">
                            customer@example.com / customer123
                        </code>
                    </div>
                </div>

                <p className="text-center mt-6 text-sm text-[var(--text-muted)]">
                    Don't have an account?{' '}
                    <button className="text-[var(--primary)] font-medium hover:underline">
                        Sign up
                    </button>
                </p>
            </motion.div>
        </div>
    );
}
