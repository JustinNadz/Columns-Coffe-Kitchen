'use client';

import Link from 'next/link';
import { ShoppingCart, User, Coffee } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';

export default function Header() {
    const { items } = useCartStore();
    const cartCount = items.reduce((acc, item) => acc + item.quantity, 0);

    return (
        <header className="sticky top-0 z-50 bg-white border-b border-[var(--border)]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-[var(--primary)] rounded-lg flex items-center justify-center">
                            <Coffee className="w-5 h-5 text-white" />
                        </div>
                        <span className="font-semibold text-lg">Columns</span>
                    </Link>

                    {/* Navigation */}
                    <nav className="hidden md:flex items-center gap-8">
                        <Link
                            href="/menu"
                            className="text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                        >
                            Menu
                        </Link>
                        <Link
                            href="#locations"
                            className="text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                        >
                            Locations
                        </Link>
                        <Link
                            href="#about"
                            className="text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                        >
                            Our Story
                        </Link>
                    </nav>

                    {/* Actions */}
                    <div className="flex items-center gap-3">
                        <Link
                            href="/menu"
                            className="hidden sm:flex btn btn-primary text-sm"
                        >
                            Order Now
                        </Link>

                        <Link
                            href="/cart"
                            className="relative p-2 rounded-full hover:bg-[var(--background-alt)] transition-colors"
                        >
                            <ShoppingCart className="w-5 h-5 text-[var(--text-secondary)]" />
                            {cartCount > 0 && (
                                <span className="absolute -top-1 -right-1 w-5 h-5 bg-[var(--primary)] text-white text-xs font-medium rounded-full flex items-center justify-center">
                                    {cartCount}
                                </span>
                            )}
                        </Link>

                        <button className="p-2 rounded-full hover:bg-[var(--background-alt)] transition-colors">
                            <User className="w-5 h-5 text-[var(--text-secondary)]" />
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
}
