'use client';

import Link from 'next/link';
import { Coffee, MapPin, Phone, Clock, Instagram, Facebook } from 'lucide-react';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-[var(--background-sidebar)] text-white">
            {/* Main Footer */}
            <div className="max-w-6xl mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Brand */}
                    <div className="md:col-span-1">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-[var(--primary)] rounded-lg flex items-center justify-center">
                                <Coffee className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <h3 className="font-bold">Columns</h3>
                                <p className="text-xs text-gray-400">Coffee + Kitchen</p>
                            </div>
                        </div>
                        <p className="text-sm text-gray-400 mb-4">
                            🌱 Plant-Based All The Way!
                        </p>
                        <p className="text-xs text-gray-500">
                            Our secret to perfect plant-based cheese? A blend of cashews, nutritional yeast, and love!
                        </p>
                    </div>

                    {/* Location */}
                    <div>
                        <h4 className="font-semibold mb-4 text-[var(--primary)]">Visit Us</h4>
                        <div className="space-y-3 text-sm text-gray-400">
                            <div className="flex items-start gap-2">
                                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                                <div>
                                    <p>2nd Street Guingona</p>
                                    <p>Butuan City, Agusan del Norte</p>
                                    <p>Philippines 8600</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <Phone className="w-4 h-4 flex-shrink-0" />
                                <a href="tel:+639956487004" className="hover:text-white transition-colors">
                                    +63 995 648 7004
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Hours */}
                    <div>
                        <h4 className="font-semibold mb-4 text-[var(--primary)]">Hours</h4>
                        <div className="space-y-2 text-sm text-gray-400">
                            <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4 flex-shrink-0" />
                                <span>Open Daily</span>
                            </div>
                            <p>Mon - Thu: 7AM - 9PM</p>
                            <p>Fri - Sat: 7AM - 10PM</p>
                            <p>Sunday: 8AM - 9PM</p>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-semibold mb-4 text-[var(--primary)]">Quick Links</h4>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li>
                                <Link href="/menu" className="hover:text-white transition-colors">
                                    View Menu
                                </Link>
                            </li>
                            <li>
                                <Link href="/cart" className="hover:text-white transition-colors">
                                    My Cart
                                </Link>
                            </li>
                            <li>
                                <Link href="/orders" className="hover:text-white transition-colors">
                                    Order History
                                </Link>
                            </li>
                            <li>
                                <a
                                    href="https://www.google.com/maps/dir/?api=1&destination=8.9411511,125.5360857"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-white transition-colors"
                                >
                                    Get Directions
                                </a>
                            </li>
                        </ul>

                        {/* Social */}
                        <div className="flex gap-3 mt-4">
                            <a
                                href="https://instagram.com/columns.coffee"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center hover:bg-[var(--primary)] transition-colors"
                            >
                                <Instagram className="w-4 h-4" />
                            </a>
                            <a
                                href="https://facebook.com/columnscoffeekitchen"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center hover:bg-[var(--primary)] transition-colors"
                            >
                                <Facebook className="w-4 h-4" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-white/10">
                <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
                    <p>© {currentYear} Columns Coffee + Kitchen. All rights reserved.</p>
                    <p className="mt-2 md:mt-0">
                        No dairy, just pure plant power! 🌿
                    </p>
                </div>
            </div>
        </footer>
    );
}
