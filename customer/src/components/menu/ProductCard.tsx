'use client';

import Image from 'next/image';
import { Plus } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';

interface ProductCardProps {
    id: string;
    name: string;
    description: string;
    price: number;
    image: string;
    inStock: boolean;
}

export default function ProductCard({
    id,
    name,
    description,
    price,
    image,
    inStock
}: ProductCardProps) {
    const { addItem } = useCartStore();

    const handleAddToCart = () => {
        if (!inStock) return;

        addItem({
            productId: id,
            name,
            price,
            image,
        });
    };

    return (
        <div className={`card card-hover overflow-hidden ${!inStock ? 'opacity-60' : ''}`}>
            <div className="relative h-40 bg-[var(--background-alt)]">
                <div
                    className="w-full h-full bg-cover bg-center"
                    style={{
                        backgroundImage: `url(${image})`,
                        backgroundColor: '#F0EBE5'
                    }}
                />
                {!inStock && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <span className="bg-white/90 text-xs font-medium px-3 py-1 rounded-full">
                            Out of Stock
                        </span>
                    </div>
                )}
                <div className="absolute top-3 right-3">
                    <span className="bg-[var(--primary)] text-white text-xs font-medium px-2.5 py-1 rounded-full">
                        ${price.toFixed(2)}
                    </span>
                </div>
            </div>
            <div className="p-4">
                <h3 className="font-semibold text-sm mb-1">{name}</h3>
                <p className="text-xs text-[var(--text-muted)] mb-3 line-clamp-2">
                    {description}
                </p>
                <button
                    onClick={handleAddToCart}
                    disabled={!inStock}
                    className={`w-full btn ${inStock ? 'btn-primary' : 'btn-outline opacity-50 cursor-not-allowed'} text-xs py-2`}
                >
                    <Plus className="w-4 h-4" />
                    Add to Cart
                </button>
            </div>
        </div>
    );
}
