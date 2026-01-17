'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Coffee, User, Lock, LogIn, AlertCircle, Shield } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        await new Promise(resolve => setTimeout(resolve, 1000));

        // Demo admin credentials
        if (email === 'admin@columns.com' && password === 'admin123') {
            localStorage.setItem('adminAuth', JSON.stringify({
                isAuthenticated: true,
                user: { name: 'Admin User', email, role: 'admin' },
                expiry: Date.now() + 8 * 60 * 60 * 1000,
            }));

            router.push('/');
        } else {
            setError('Invalid credentials or insufficient permissions');
        }

        setLoading(false);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-[var(--primary)] to-[var(--primary-dark)] flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md"
            >
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                        <Coffee className="w-8 h-8 text-[var(--primary)]" />
                    </div>
                    <h1 className="text-2xl font-bold text-white">Admin Portal</h1>
                    <p className="text-white/70">Columns Coffee + Kitchen</p>
                </div>

                <div className="card p-6 shadow-2xl">
                    <div className="flex items-center gap-2 justify-center mb-6 text-[var(--primary)]">
                        <Shield className="w-5 h-5" />
                        <span className="text-sm font-medium">Secure Admin Access</span>
                    </div>

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
                            <label className="text-sm text-[var(--text-muted)] mb-1 block">Admin Email</label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--text-muted)]" />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="admin@columns.com"
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
                                    Access Dashboard
                                </>
                            )}
                        </motion.button>
                    </form>

                    <div className="mt-6 p-4 bg-[var(--background-alt)] rounded-xl text-center text-sm">
                        <p className="text-[var(--text-muted)] mb-1">Demo credentials:</p>
                        <code className="text-xs">admin@columns.com / admin123</code>
                    </div>
                </div>

                <p className="text-center mt-6 text-sm text-white/60">
                    Need help? Contact IT Support
                </p>
            </motion.div>
        </div>
    );
}
