'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, User, Menu, X, Coffee, Moon, Sun, ChevronRight } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { useThemeStore } from '@/store/themeStore';

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { items } = useCartStore();
    const { theme, setTheme, resolvedTheme } = useThemeStore();

    const cartCount = items.reduce((acc, item) => acc + item.quantity, 0);

    const navLinks = [
        { href: '/menu', label: 'Menu' },
        { href: '/favorites', label: '❤️ Favorites' },
        { href: '/orders', label: 'Orders' },
    ];

    const toggleTheme = () => {
        setTheme(resolvedTheme === 'light' ? 'dark' : 'light');
    };

    return (
        <header className="sticky top-0 z-40 bg-[var(--background)]/80 backdrop-blur-lg border-b border-[var(--border)]">
            <div className="max-w-6xl mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2">
                        <div className="w-9 h-9 bg-[var(--primary)] rounded-lg flex items-center justify-center">
                            <Coffee className="w-5 h-5 text-white" />
                        </div>
                        <div className="hidden sm:block">
                            <span className="font-semibold text-sm">Columns</span>
                            <span className="text-xs text-[var(--text-muted)] block -mt-0.5">Coffee + Kitchen</span>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="desktop-nav hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>

                    {/* Right Actions */}
                    <div className="flex items-center gap-2">
                        {/* Theme Toggle */}
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={toggleTheme}
                            className="p-2.5 rounded-full hover:bg-[var(--background-alt)] transition-colors"
                            title={`Switch to ${resolvedTheme === 'light' ? 'dark' : 'light'} mode`}
                        >
                            {resolvedTheme === 'light' ? (
                                <Moon className="w-5 h-5 text-[var(--text-secondary)]" />
                            ) : (
                                <Sun className="w-5 h-5 text-[var(--text-secondary)]" />
                            )}
                        </motion.button>

                        {/* Cart */}
                        <Link href="/cart">
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="relative p-2.5 rounded-full hover:bg-[var(--background-alt)] transition-colors"
                            >
                                <ShoppingBag className="w-5 h-5 text-[var(--text-secondary)]" />
                                <AnimatePresence>
                                    {cartCount > 0 && (
                                        <motion.span
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            exit={{ scale: 0 }}
                                            className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-[var(--primary)] text-white text-xs font-bold rounded-full flex items-center justify-center"
                                        >
                                            {cartCount}
                                        </motion.span>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        </Link>

                        {/* User */}
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="hidden sm:flex p-2.5 rounded-full hover:bg-[var(--background-alt)] transition-colors"
                        >
                            <User className="w-5 h-5 text-[var(--text-secondary)]" />
                        </motion.button>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="mobile-menu-btn p-2.5 rounded-full hover:bg-[var(--background-alt)] md:hidden"
                        >
                            {mobileMenuOpen ? (
                                <X className="w-5 h-5" />
                            ) : (
                                <Menu className="w-5 h-5" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mobile-menu md:hidden border-t border-[var(--border)] bg-[var(--background)]"
                    >
                        <nav className="p-4 space-y-1">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="flex items-center justify-between p-3 rounded-xl hover:bg-[var(--background-alt)] transition-colors"
                                >
                                    <span className="font-medium">{link.label}</span>
                                    <ChevronRight className="w-4 h-4 text-[var(--text-muted)]" />
                                </Link>
                            ))}
                            <div className="pt-2 border-t border-[var(--border)] mt-2">
                                <Link
                                    href="/cart"
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="flex items-center justify-between p-3 rounded-xl hover:bg-[var(--background-alt)] transition-colors"
                                >
                                    <span className="font-medium flex items-center gap-2">
                                        <ShoppingBag className="w-5 h-5" />
                                        Cart
                                    </span>
                                    {cartCount > 0 && (
                                        <span className="bg-[var(--primary)] text-white text-xs font-bold px-2 py-0.5 rounded-full">
                                            {cartCount}
                                        </span>
                                    )}
                                </Link>
                                <button
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-[var(--background-alt)] transition-colors"
                                >
                                    <span className="font-medium flex items-center gap-2">
                                        <User className="w-5 h-5" />
                                        Account
                                    </span>
                                </button>
                            </div>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
