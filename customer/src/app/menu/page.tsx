'use client';

import { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Search } from 'lucide-react';
import ProductCard from '@/components/menu/ProductCard';

// Mock products data
const products = [
    { id: '1', name: 'Avocado Toast', description: 'Sourdough, radish, chili flakes', price: 12.00, image: 'https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?w=400', category: 'food', inStock: true },
    { id: '2', name: 'Butter Croissant', description: 'House-made, French-style', price: 4.00, image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400', category: 'food', inStock: true },
    { id: '3', name: 'Granola Bowl', description: 'Greek yogurt, seasonal fruits, honey', price: 9.50, image: 'https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?w=400', category: 'food', inStock: true },
    { id: '4', name: 'The Classic Stack', description: 'Double patty, sharp cheddar, house sauce', price: 14.00, image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400', category: 'food', inStock: true },
    { id: '5', name: 'Pain au Chocolat', description: 'Freshly baked, dark Belgian chocolate', price: 4.50, image: 'https://images.unsplash.com/photo-1623334044303-241021148842?w=400', category: 'food', inStock: true },
    { id: '6', name: 'Blueberry Muffin', description: 'Streusel topping, fresh blueberries', price: 4.50, image: 'https://images.unsplash.com/photo-1607958996333-41aef7caefaa?w=400', category: 'food', inStock: false },
    { id: '7', name: 'Oat Latte', description: 'Double shot, Minor Figures oat milk', price: 5.50, image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400', category: 'drinks', inStock: true },
    { id: '8', name: 'Espresso', description: 'Single origin, Ethiopia', price: 3.50, image: 'https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?w=400', category: 'drinks', inStock: true },
    { id: '9', name: 'Iced Americano', description: 'Double shot, water, ice', price: 3.75, image: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?w=400', category: 'drinks', inStock: true },
    { id: '10', name: 'Iced Matcha', description: 'Ceremonial grade, oat milk', price: 6.00, image: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?w=400', category: 'drinks', inStock: true },
    { id: '11', name: 'Autumn Harvest Bowl', description: 'Roasted pumpkin, quinoa, kale, cranberries', price: 13.50, image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400', category: 'seasonal', inStock: true },
    { id: '12', name: 'Pumpkin Spice Latte', description: 'Espresso, pumpkin, cinnamon, oat milk', price: 6.50, image: 'https://images.unsplash.com/photo-1574914629385-46448b767aec?w=400', category: 'seasonal', inStock: true },
];

const categoryTabs = [
    { id: 'all', name: 'All' },
    { id: 'food', name: 'Food' },
    { id: 'drinks', name: 'Drinks' },
    { id: 'seasonal', name: 'Seasonal' },
];

function MenuContent() {
    const searchParams = useSearchParams();
    const initialCategory = searchParams.get('category') || 'all';
    const initialSearch = searchParams.get('search') || '';

    const [activeCategory, setActiveCategory] = useState(initialCategory);
    const [searchQuery, setSearchQuery] = useState(initialSearch);

    const filteredProducts = useMemo(() => {
        return products.filter((product) => {
            const matchesCategory = activeCategory === 'all' || product.category === activeCategory;
            const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                product.description.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesCategory && matchesSearch;
        });
    }, [activeCategory, searchQuery]);

    return (
        <>
            {/* Header */}
            <div className="bg-[var(--background-alt)] py-8 px-4">
                <div className="max-w-6xl mx-auto">
                    <h1 className="text-2xl font-bold mb-6">Our Menu</h1>

                    {/* Search */}
                    <div className="relative max-w-md mb-6">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--text-muted)]" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search menu..."
                            className="input pl-12"
                        />
                    </div>

                    {/* Category Tabs */}
                    <div className="flex gap-2 flex-wrap">
                        {categoryTabs.map((category) => (
                            <button
                                key={category.id}
                                onClick={() => setActiveCategory(category.id)}
                                className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${activeCategory === category.id
                                        ? 'bg-[var(--primary)] text-white'
                                        : 'bg-white border border-[var(--border)] text-[var(--text-primary)] hover:border-[var(--primary)]'
                                    }`}
                            >
                                {category.name}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Products Grid */}
            <div className="py-8 px-4">
                <div className="max-w-6xl mx-auto">
                    {filteredProducts.length === 0 ? (
                        <div className="text-center py-16">
                            <p className="text-[var(--text-muted)]">No products found</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {filteredProducts.map((product) => (
                                <ProductCard key={product.id} {...product} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

function MenuLoading() {
    return (
        <div className="min-h-screen bg-[var(--background)] flex items-center justify-center">
            <div className="text-[var(--text-muted)]">Loading menu...</div>
        </div>
    );
}

export default function MenuPage() {
    return (
        <div className="min-h-screen bg-[var(--background)]">
            <Suspense fallback={<MenuLoading />}>
                <MenuContent />
            </Suspense>
        </div>
    );
}
