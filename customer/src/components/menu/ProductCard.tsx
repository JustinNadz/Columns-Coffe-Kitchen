'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Check } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { useToast } from '@/components/ui/Toast';
import ProductDetailModal from './ProductDetailModal';

interface ProductCardProps {
    id: string;
    name: string;
    description: string;
    price: number;
    image: string;
    category?: string;
    inStock: boolean;
}

export default function ProductCard({ id, name, description, price, image, category, inStock }: ProductCardProps) {
    const [showModal, setShowModal] = useState(false);
    const [justAdded, setJustAdded] = useState(false);
    const { addItem } = useCartStore();
    const { showToast } = useToast();

    const handleQuickAdd = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (!inStock) return;

        addItem({
            productId: id,
            name,
            price,
            image,
        });

        setJustAdded(true);
        setTimeout(() => setJustAdded(false), 1500);

        showToast({
            type: 'success',
            title: 'Added to cart',
            message: name,
        });
    };

    const handleCardClick = () => {
        if (inStock) {
            setShowModal(true);
        }
    };

    return (
        <>
            <motion.div
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -4 }}
                onClick={handleCardClick}
                className={`card overflow-hidden cursor-pointer group ${!inStock ? 'opacity-60 cursor-not-allowed' : ''
                    }`}
            >
                {/* Image */}
                <div className="relative h-40 overflow-hidden">
                    <motion.div
                        className="w-full h-full bg-cover bg-center"
                        style={{
                            backgroundImage: `url(${image})`,
                            backgroundColor: '#F0EBE5'
                        }}
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                    />

                    {/* Price Badge */}
                    <span className="absolute top-3 right-3 bg-[var(--primary)] text-white text-xs font-semibold px-2.5 py-1 rounded-full shadow-lg">
                        ₱{price}
                    </span>

                    {/* Out of Stock Overlay */}
                    {!inStock && (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                            <span className="bg-white text-[var(--text-primary)] text-xs font-medium px-3 py-1.5 rounded-full">
                                Out of Stock
                            </span>
                        </div>
                    )}

                    {/* Quick Add Button */}
                    {inStock && (
                        <motion.button
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            onClick={handleQuickAdd}
                            className={`absolute bottom-3 right-3 w-10 h-10 rounded-full shadow-lg flex items-center justify-center transition-colors ${justAdded
                                ? 'bg-green-500 text-white'
                                : 'bg-white text-[var(--primary)] hover:bg-[var(--primary)] hover:text-white'
                                }`}
                        >
                            {justAdded ? (
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                >
                                    <Check className="w-5 h-5" />
                                </motion.div>
                            ) : (
                                <Plus className="w-5 h-5" />
                            )}
                        </motion.button>
                    )}
                </div>

                {/* Content */}
                <div className="p-4">
                    <h3 className="font-semibold text-sm mb-1 group-hover:text-[var(--primary)] transition-colors">
                        {name}
                    </h3>
                    <p className="text-xs text-[var(--text-muted)] line-clamp-2">
                        {description}
                    </p>
                </div>
            </motion.div>

            {/* Product Detail Modal */}
            <ProductDetailModal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                product={{ id, name, description, price, image, category: category || '', inStock }}
                onAddToCart={() => {
                    showToast({
                        type: 'success',
                        title: 'Added to cart',
                        message: `${name} with customizations`,
                    });
                }}
            />
        </>
    );
}
