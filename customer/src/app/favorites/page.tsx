'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, ShoppingBag, Trash2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useFavoritesStore } from '@/store/favoritesStore';
import { useCartStore } from '@/store/cartStore';
import ProductDetailModal from '@/components/menu/ProductDetailModal';

// Real menu products from Columns Coffee + Kitchen
const allProducts = [
    { id: 'espresso', name: 'Espresso', description: 'Single shot 100% Arabica', price: 100, category: 'coffee-classic', image: 'https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?w=400', inStock: true },
    { id: 'americano', name: 'Americano', description: 'Espresso with hot water', price: 120, category: 'coffee-classic', image: 'https://images.unsplash.com/photo-1551030173-122aabc4489c?w=400', inStock: true },
    { id: 'cappuccino', name: 'Cappuccino', description: 'Espresso, oat milk, foam', price: 180, category: 'coffee-classic', image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=400', inStock: true },
    { id: 'caffe-latte', name: 'Caffe Latte', description: 'Espresso with creamy oat milk', price: 190, category: 'coffee-classic', image: 'https://images.unsplash.com/photo-1561047029-3000c68339ca?w=400', inStock: true },
    { id: 'spanish-latte', name: 'Spanish Latte', description: 'Espresso, oat milk, oat condensed', price: 210, category: 'signature-coffee', image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400', inStock: true },
    { id: 'tiramisu-latte', name: 'Tiramisu Latte', description: 'Espresso, dark chocolate, cream', price: 230, category: 'signature-coffee', image: 'https://images.unsplash.com/photo-1485808191679-5f86510681a2?w=400', inStock: true },
    { id: 'matcha-latte', name: 'Matcha Latte', description: 'Ceremonial Uji matcha, oat milk', price: 210, category: 'matcha-hojicha', image: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?w=400', inStock: true },
    { id: 'mango-mania', name: 'Mango Mania', description: 'Mango, banana, plant-milk', price: 230, category: 'smoothies', image: 'https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?w=400', inStock: true },
    { id: 'vanilla-pancake', name: 'Vanilla Pancake', description: 'Granola, banana, seasonal fruit', price: 250, category: 'breakfast', image: 'https://images.unsplash.com/photo-1528207776546-365bb710ee93?w=400', inStock: true },
    { id: 'beefless-burger', name: 'Beefless Burger', description: 'Plant patty, caramelised onion', price: 270, category: 'burgers-wraps', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400', inStock: true },
    { id: 'bibimbap', name: 'Bibimbap', description: 'Korean rice bowl, gochujang', price: 350, category: 'rice-bowls', image: 'https://images.unsplash.com/photo-1553163147-622ab57be1c7?w=400', inStock: true },
    { id: 'sisig', name: 'Sisig', description: 'Classic Filipino sisig', price: 250, category: 'filo-faves', image: 'https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?w=400', inStock: true },
];

export default function FavoritesPage() {
    const { favoriteIds, toggleFavorite, clearFavorites } = useFavoritesStore();
    const { addItem } = useCartStore();
    const [selectedProduct, setSelectedProduct] = useState<typeof allProducts[0] | null>(null);

    const favoriteProducts = useMemo(() => {
        return allProducts.filter(p => favoriteIds.includes(p.id));
    }, [favoriteIds]);

    const handleQuickAdd = (product: typeof allProducts[0]) => {
        addItem({
            productId: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
        });
    };

    return (
        <div className="min-h-screen bg-[var(--background)]">
            {/* Header */}
            <div className="bg-gradient-to-r from-red-500 to-pink-500 py-8 px-4 text-white">
                <div className="max-w-6xl mx-auto">
                    <Link href="/menu" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-4">
                        <ArrowLeft className="w-4 h-4" />
                        Back to Menu
                    </Link>
                    <div className="flex items-center gap-3">
                        <Heart className="w-8 h-8 fill-current" />
                        <div>
                            <h1 className="text-3xl font-bold">My Favorites</h1>
                            <p className="text-white/80">{favoriteIds.length} saved items</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-6xl mx-auto px-4 py-8">
                {favoriteProducts.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center py-16"
                    >
                        <div className="w-20 h-20 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Heart className="w-10 h-10 text-pink-400" />
                        </div>
                        <h2 className="text-xl font-semibold mb-2">No favorites yet</h2>
                        <p className="text-[var(--text-muted)] mb-6">
                            Start adding items to your favorites by tapping the heart icon
                        </p>
                        <Link href="/menu">
                            <button className="btn btn-primary">
                                Browse Menu
                            </button>
                        </Link>
                    </motion.div>
                ) : (
                    <>
                        {/* Clear Button */}
                        <div className="flex justify-end mb-4">
                            <button
                                onClick={clearFavorites}
                                className="text-sm text-red-500 hover:text-red-600 flex items-center gap-1"
                            >
                                <Trash2 className="w-4 h-4" />
                                Clear All
                            </button>
                        </div>

                        {/* Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            <AnimatePresence>
                                {favoriteProducts.map((product, index) => (
                                    <motion.div
                                        key={product.id}
                                        layout
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        transition={{ delay: index * 0.05 }}
                                        className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow group"
                                    >
                                        <div
                                            className="relative cursor-pointer"
                                            onClick={() => setSelectedProduct(product)}
                                        >
                                            <img
                                                src={product.image}
                                                alt={product.name}
                                                className="w-full aspect-square object-cover"
                                            />
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    toggleFavorite(product.id);
                                                }}
                                                className="absolute top-2 right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600"
                                            >
                                                <Heart className="w-4 h-4 fill-current" />
                                            </button>
                                        </div>
                                        <div className="p-3">
                                            <h3 className="font-medium text-sm line-clamp-1">{product.name}</h3>
                                            <p className="text-xs text-[var(--text-muted)] line-clamp-1 mb-2">
                                                {product.description}
                                            </p>
                                            <div className="flex items-center justify-between">
                                                <span className="font-bold text-[var(--primary)]">₱{product.price}</span>
                                                <motion.button
                                                    whileHover={{ scale: 1.1 }}
                                                    whileTap={{ scale: 0.9 }}
                                                    onClick={() => handleQuickAdd(product)}
                                                    className="w-8 h-8 bg-[var(--primary)] text-white rounded-full flex items-center justify-center"
                                                >
                                                    <ShoppingBag className="w-4 h-4" />
                                                </motion.button>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>
                    </>
                )}
            </div>

            {/* Product Detail Modal */}
            <ProductDetailModal
                product={selectedProduct}
                isOpen={!!selectedProduct}
                onClose={() => setSelectedProduct(null)}
            />
        </div>
    );
}
