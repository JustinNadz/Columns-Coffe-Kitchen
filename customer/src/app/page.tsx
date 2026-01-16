'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronRight, Instagram, Facebook, Twitter } from 'lucide-react';
import CategoryCard from '@/components/menu/CategoryCard';
import QuickOrderCard from '@/components/menu/QuickOrderCard';
import SearchBar from '@/components/menu/SearchBar';
import { useCartStore } from '@/store/cartStore';

// Mock data (will be replaced with shared data later)
const categories = [
  { id: '1', name: 'Specialty Coffee', slug: 'coffee', image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400' },
  { id: '2', name: 'Artisan Burgers', slug: 'burgers', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400' },
  { id: '3', name: 'Breakfast', slug: 'breakfast', image: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=400' },
  { id: '4', name: 'Smoothies & Bowls', slug: 'smoothies', image: 'https://images.unsplash.com/photo-1590301157890-4810ed352733?w=400' },
];

const quickOrders = [
  { id: '1', name: 'Oat Milk Latte', description: 'House blend espresso, oat milk, light foam', image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400' },
  { id: '2', name: 'The Classic Stack', description: 'Double patty, sharp cheddar, house sauce, brioche bun', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400' },
  { id: '3', name: 'Pain au Chocolat', description: 'Freshly baked, dark Belgian chocolate, flaky layers', image: 'https://images.unsplash.com/photo-1623334044303-241021148842?w=400' },
];

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const { addItem } = useCartStore();

  const handleReorder = (item: typeof quickOrders[0]) => {
    addItem({
      productId: item.id,
      name: item.name,
      price: 5.50, // Default price
      image: item.image,
    });
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-16 px-4 bg-gradient-to-b from-[var(--background-alt)] to-white">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
            What are you <span className="italic text-[var(--secondary)]">craving</span> today?
          </h1>
          <p className="text-[var(--text-secondary)] mb-8">
            Order your favorites for pickup or delivery from our kitchen to yours.
          </p>
          <div className="flex justify-center">
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              onSearch={() => {
                if (searchQuery) {
                  window.location.href = `/menu?search=${searchQuery}`;
                }
              }}
            />
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Explore Menu</h2>
            <Link
              href="/menu"
              className="flex items-center gap-1 text-sm text-[var(--primary)] font-medium hover:underline"
            >
              View Full Menu
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((category) => (
              <CategoryCard key={category.id} {...category} />
            ))}
          </div>
        </div>
      </section>

      {/* Quick Order Section */}
      <section className="py-12 px-4 bg-[var(--background-alt)]">
        <div className="max-w-6xl mx-auto">
          <div className="mb-6">
            <h2 className="text-xl font-semibold">Quick Order</h2>
            <p className="text-sm text-[var(--text-muted)]">
              Welcome back! Reorder your recent favorites.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {quickOrders.map((item) => (
              <QuickOrderCard
                key={item.id}
                {...item}
                onReorder={() => handleReorder(item)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Seasonal Special Banner */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#5C6B5A] to-[#7A8A7A]">
            <div className="flex flex-col md:flex-row items-center">
              <div className="p-8 md:p-12 md:w-1/2">
                <span className="inline-block bg-white/20 text-white text-xs font-medium px-3 py-1 rounded-full mb-4">
                  SEASONAL SPECIAL
                </span>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                  Autumn Harvest Bowl
                </h3>
                <p className="text-white/80 text-sm mb-6">
                  Roasted pumpkin, quinoa, kale, cranberries, and our signature maple tahini dressing. A warm hug in a bowl.
                </p>
                <Link href="/menu?category=seasonal" className="inline-block">
                  <button className="btn bg-white text-[var(--text-primary)] hover:bg-white/90">
                    Order Now
                  </button>
                </Link>
              </div>
              <div className="md:w-1/2 h-48 md:h-64 relative">
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage: `url(https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600)`,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[var(--border)] py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-semibold mb-2">Columns Coffee + Kitchen</h4>
              <p className="text-sm text-[var(--text-muted)] max-w-sm">
                Crafting moments of joy through exceptional coffee and wholesome food. Sourced responsibly, served with love.
              </p>
              <div className="flex gap-4 mt-4">
                <a href="#" className="text-[var(--text-muted)] hover:text-[var(--text-primary)]">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="#" className="text-[var(--text-muted)] hover:text-[var(--text-primary)]">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="#" className="text-[var(--text-muted)] hover:text-[var(--text-primary)]">
                  <Twitter className="w-5 h-5" />
                </a>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Stay in the loop</h4>
              <p className="text-sm text-[var(--text-muted)] mb-3">
                Get 10% off your first order when you subscribe to our newsletter!
              </p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="input flex-1"
                />
                <button className="btn btn-secondary">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
          <div className="border-t border-[var(--border)] mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-[var(--text-muted)]">
              © 2024 Columns Coffee + Kitchen. All rights reserved.
            </p>
            <div className="flex gap-6 text-xs text-[var(--text-muted)]">
              <a href="#" className="hover:text-[var(--text-primary)]">Privacy Policy</a>
              <a href="#" className="hover:text-[var(--text-primary)]">Terms</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
