'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, Check } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';

interface Addon {
    id: string;
    name: string;
    price: number;
}

interface ProductDetailModalProps {
    isOpen: boolean;
    onClose: () => void;
    product: {
        id: string;
        name: string;
        description: string;
        price: number;
        image: string;
        category: string;
        inStock: boolean;
        addons?: Addon[];
    } | null;
    onAddToCart?: () => void;
}

const sizes = [
    { id: 'small', name: 'Small', priceModifier: -0.5 },
    { id: 'regular', name: 'Regular', priceModifier: 0 },
    { id: 'large', name: 'Large', priceModifier: 1.0 },
];

const defaultAddons: Addon[] = [
    { id: 'extra-shot', name: 'Extra Shot', price: 0.75 },
    { id: 'oat-milk', name: 'Oat Milk', price: 0.50 },
    { id: 'vanilla', name: 'Vanilla Syrup', price: 0.50 },
    { id: 'caramel', name: 'Caramel Drizzle', price: 0.50 },
];

export default function ProductDetailModal({
    isOpen,
    onClose,
    product,
    onAddToCart
}: ProductDetailModalProps) {
    const [selectedSize, setSelectedSize] = useState('regular');
    const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
    const [quantity, setQuantity] = useState(1);
    const [notes, setNotes] = useState('');

    const { addItem } = useCartStore();

    if (!product) return null;

    const sizeModifier = sizes.find(s => s.id === selectedSize)?.priceModifier || 0;
    const addonsTotal = selectedAddons.reduce((acc, addonId) => {
        const addon = defaultAddons.find(a => a.id === addonId);
        return acc + (addon?.price || 0);
    }, 0);
    const unitPrice = product.price + sizeModifier + addonsTotal;
    const totalPrice = unitPrice * quantity;

    const toggleAddon = (addonId: string) => {
        setSelectedAddons(prev =>
            prev.includes(addonId)
                ? prev.filter(id => id !== addonId)
                : [...prev, addonId]
        );
    };

    const handleAddToCart = () => {
        const selectedAddonObjects = defaultAddons
            .filter(a => selectedAddons.includes(a.id))
            .map(a => ({ name: a.name, price: a.price }));

        for (let i = 0; i < quantity; i++) {
            addItem({
                productId: `${product.id}-${Date.now()}-${i}`,
                name: `${product.name}${selectedSize !== 'regular' ? ` (${selectedSize})` : ''}`,
                price: unitPrice,
                image: product.image,
                notes: notes || undefined,
                addons: selectedAddonObjects.length > 0 ? selectedAddonObjects : undefined,
            });
        }

        onAddToCart?.();
        onClose();

        // Reset state
        setSelectedSize('regular');
        setSelectedAddons([]);
        setQuantity(1);
        setNotes('');
    };

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
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 50 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 50 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                        className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg z-50 p-4 max-h-[90vh] overflow-auto"
                    >
                        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
                            {/* Product Image */}
                            <div className="relative h-56 bg-[var(--background-alt)]">
                                <div
                                    className="w-full h-full bg-cover bg-center"
                                    style={{
                                        backgroundImage: `url(${product.image})`,
                                        backgroundColor: '#F0EBE5'
                                    }}
                                />
                                <button
                                    onClick={onClose}
                                    className="absolute top-4 right-4 p-2 bg-white/90 rounded-full hover:bg-white transition-colors shadow-lg"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                                <div className="absolute bottom-4 left-4">
                                    <span className="bg-[var(--primary)] text-white text-sm font-medium px-3 py-1.5 rounded-full">
                                        ${product.price.toFixed(2)}
                                    </span>
                                </div>
                            </div>

                            <div className="p-6">
                                {/* Product Info */}
                                <h2 className="text-xl font-bold mb-1">{product.name}</h2>
                                <p className="text-[var(--text-muted)] text-sm mb-6">{product.description}</p>

                                {/* Size Selection */}
                                <div className="mb-6">
                                    <h3 className="text-sm font-semibold mb-3">Size</h3>
                                    <div className="flex gap-2">
                                        {sizes.map((size) => (
                                            <button
                                                key={size.id}
                                                onClick={() => setSelectedSize(size.id)}
                                                className={`flex-1 py-2.5 px-4 rounded-xl text-sm font-medium transition-all ${selectedSize === size.id
                                                        ? 'bg-[var(--primary)] text-white'
                                                        : 'bg-[var(--background-alt)] text-[var(--text-primary)] hover:bg-[var(--border)]'
                                                    }`}
                                            >
                                                {size.name}
                                                {size.priceModifier !== 0 && (
                                                    <span className="block text-xs opacity-80">
                                                        {size.priceModifier > 0 ? '+' : ''}${size.priceModifier.toFixed(2)}
                                                    </span>
                                                )}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Add-ons */}
                                <div className="mb-6">
                                    <h3 className="text-sm font-semibold mb-3">Add-ons</h3>
                                    <div className="grid grid-cols-2 gap-2">
                                        {defaultAddons.map((addon) => (
                                            <button
                                                key={addon.id}
                                                onClick={() => toggleAddon(addon.id)}
                                                className={`flex items-center justify-between p-3 rounded-xl text-sm transition-all ${selectedAddons.includes(addon.id)
                                                        ? 'bg-[var(--primary)] text-white'
                                                        : 'bg-[var(--background-alt)] text-[var(--text-primary)] hover:bg-[var(--border)]'
                                                    }`}
                                            >
                                                <span>{addon.name}</span>
                                                <span className="flex items-center gap-1">
                                                    +${addon.price.toFixed(2)}
                                                    {selectedAddons.includes(addon.id) && (
                                                        <Check className="w-4 h-4" />
                                                    )}
                                                </span>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Special Instructions */}
                                <div className="mb-6">
                                    <h3 className="text-sm font-semibold mb-3">Special Instructions</h3>
                                    <textarea
                                        value={notes}
                                        onChange={(e) => setNotes(e.target.value)}
                                        placeholder="E.g., No ice, extra hot, etc."
                                        className="w-full p-3 rounded-xl border border-[var(--border)] text-sm resize-none h-20 focus:outline-none focus:border-[var(--primary)]"
                                    />
                                </div>

                                {/* Quantity & Add to Cart */}
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center gap-3 bg-[var(--background-alt)] rounded-xl p-1">
                                        <button
                                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                            className="w-10 h-10 rounded-lg flex items-center justify-center hover:bg-white transition-colors"
                                        >
                                            <Minus className="w-4 h-4" />
                                        </button>
                                        <span className="w-8 text-center font-semibold">{quantity}</span>
                                        <button
                                            onClick={() => setQuantity(quantity + 1)}
                                            className="w-10 h-10 rounded-lg flex items-center justify-center hover:bg-white transition-colors"
                                        >
                                            <Plus className="w-4 h-4" />
                                        </button>
                                    </div>

                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={handleAddToCart}
                                        className="flex-1 btn btn-primary py-3"
                                    >
                                        Add to Cart • ${totalPrice.toFixed(2)}
                                    </motion.button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
