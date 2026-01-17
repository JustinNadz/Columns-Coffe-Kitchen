'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, Heart, ShoppingBag, Leaf } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { useFavoritesStore } from '@/store/favoritesStore';

interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    image: string;
    category: string;
    inStock: boolean;
}

interface ProductDetailModalProps {
    product: Product | null;
    isOpen: boolean;
    onClose: () => void;
    onAddToCart?: () => void;
}

export default function ProductDetailModal({ product, isOpen, onClose, onAddToCart }: ProductDetailModalProps) {
    const [quantity, setQuantity] = useState(1);
    const [notes, setNotes] = useState('');
    const { addItem } = useCartStore();
    const { isFavorite, toggleFavorite } = useFavoritesStore();

    if (!product) return null;

    const handleAddToCart = () => {
        for (let i = 0; i < quantity; i++) {
            addItem({
                productId: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                notes: notes || undefined,
            });
        }
        setQuantity(1);
        setNotes('');
        onClose();
        onAddToCart?.();
    };

    const isFav = isFavorite(product.id);

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md z-50 p-4"
                    >
                        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
                            {/* Image */}
                            <div className="relative h-56">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

                                {/* Close Button */}
                                <button
                                    onClick={onClose}
                                    className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur rounded-full flex items-center justify-center hover:bg-white transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>

                                {/* Favorite Button */}
                                <button
                                    onClick={() => toggleFavorite(product.id)}
                                    className={`absolute top-4 left-4 w-10 h-10 rounded-full flex items-center justify-center transition-colors ${isFav
                                            ? 'bg-red-500 text-white'
                                            : 'bg-white/90 backdrop-blur text-gray-600 hover:bg-white'
                                        }`}
                                >
                                    <Heart className={`w-5 h-5 ${isFav ? 'fill-current' : ''}`} />
                                </button>

                                {/* Plant-based badge */}
                                <div className="absolute bottom-4 left-4 flex items-center gap-1 bg-green-500 text-white text-xs px-3 py-1.5 rounded-full">
                                    <Leaf className="w-3 h-3" />
                                    Plant-Based
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-6">
                                <div className="flex justify-between items-start mb-2">
                                    <h2 className="text-2xl font-bold">{product.name}</h2>
                                    <span className="text-2xl font-bold text-[var(--primary)]">
                                        ₱{product.price}
                                    </span>
                                </div>

                                <p className="text-[var(--text-muted)] mb-4">{product.description}</p>

                                {/* Notes */}
                                <div className="mb-4">
                                    <label className="text-sm text-[var(--text-muted)] mb-2 block">
                                        Special Instructions (optional)
                                    </label>
                                    <textarea
                                        value={notes}
                                        onChange={(e) => setNotes(e.target.value)}
                                        placeholder="e.g., No ice, extra hot, less sugar..."
                                        className="input resize-none h-20 text-sm"
                                    />
                                </div>

                                {/* Quantity */}
                                <div className="flex items-center justify-between mb-6">
                                    <span className="font-medium">Quantity</span>
                                    <div className="flex items-center gap-4">
                                        <button
                                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                            className="w-10 h-10 rounded-full border-2 border-[var(--border)] flex items-center justify-center hover:border-[var(--primary)] transition-colors"
                                        >
                                            <Minus className="w-4 h-4" />
                                        </button>
                                        <span className="text-xl font-bold w-8 text-center">{quantity}</span>
                                        <button
                                            onClick={() => setQuantity(quantity + 1)}
                                            className="w-10 h-10 rounded-full border-2 border-[var(--border)] flex items-center justify-center hover:border-[var(--primary)] transition-colors"
                                        >
                                            <Plus className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>

                                {/* Add to Cart Button */}
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={handleAddToCart}
                                    disabled={!product.inStock}
                                    className="w-full btn btn-primary py-4 text-lg disabled:opacity-50"
                                >
                                    <ShoppingBag className="w-5 h-5" />
                                    Add to Cart • ₱{(product.price * quantity).toLocaleString()}
                                </motion.button>

                                {!product.inStock && (
                                    <p className="text-center text-red-500 text-sm mt-2">
                                        This item is currently out of stock
                                    </p>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
