'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, Clock, CheckCircle, Repeat, ChevronRight, Package } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';

interface OrderHistoryItem {
    id: string;
    orderNumber: number;
    status: 'completed' | 'cancelled';
    items: { name: string; quantity: number; price: number; image: string }[];
    total: number;
    date: Date;
}

// Mock order history
const mockOrders: OrderHistoryItem[] = [
    {
        id: '1',
        orderNumber: 2045,
        status: 'completed',
        items: [
            { name: 'Oat Latte', quantity: 2, price: 5.50, image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=100' },
            { name: 'Butter Croissant', quantity: 1, price: 4.00, image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=100' },
        ],
        total: 15.00,
        date: new Date(Date.now() - 1000 * 60 * 60 * 2),
    },
    {
        id: '2',
        orderNumber: 2038,
        status: 'completed',
        items: [
            { name: 'Avocado Toast', quantity: 1, price: 12.00, image: 'https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?w=100' },
            { name: 'Iced Matcha', quantity: 1, price: 6.00, image: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?w=100' },
        ],
        total: 18.00,
        date: new Date(Date.now() - 1000 * 60 * 60 * 24),
    },
    {
        id: '3',
        orderNumber: 2025,
        status: 'completed',
        items: [
            { name: 'The Classic Stack', quantity: 1, price: 14.00, image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=100' },
            { name: 'Sweet Potato Fries', quantity: 1, price: 5.00, image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=100' },
            { name: 'Espresso', quantity: 1, price: 3.50, image: 'https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?w=100' },
        ],
        total: 22.50,
        date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3),
    },
];

export default function OrderHistoryPage() {
    const [orders] = useState(mockOrders);
    const { addItem } = useCartStore();

    const formatDate = (date: Date) => {
        const now = new Date();
        const diffHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));

        if (diffHours < 24) {
            return `${diffHours} hours ago`;
        }

        const diffDays = Math.floor(diffHours / 24);
        if (diffDays === 1) return 'Yesterday';
        if (diffDays < 7) return `${diffDays} days ago`;

        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    };

    const handleReorder = (order: OrderHistoryItem) => {
        order.items.forEach(item => {
            addItem({
                productId: `reorder-${item.name}-${Date.now()}`,
                name: item.name,
                price: item.price,
                image: item.image,
            });
        });
    };

    return (
        <div className="min-h-screen bg-[var(--background)]">
            <div className="max-w-2xl mx-auto p-4 py-8">
                {/* Header */}
                <div className="flex items-center gap-4 mb-8">
                    <Link href="/" className="p-2 hover:bg-[var(--background-alt)] rounded-full transition-colors">
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                    <div>
                        <h1 className="text-xl font-bold">Order History</h1>
                        <p className="text-sm text-[var(--text-muted)]">
                            View and reorder your past orders
                        </p>
                    </div>
                </div>

                {orders.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center py-16"
                    >
                        <div className="w-20 h-20 bg-[var(--background-alt)] rounded-full flex items-center justify-center mx-auto mb-4">
                            <Package className="w-10 h-10 text-[var(--text-muted)]" />
                        </div>
                        <h2 className="text-lg font-semibold mb-2">No orders yet</h2>
                        <p className="text-[var(--text-muted)] mb-6">Start ordering delicious food!</p>
                        <Link href="/menu" className="btn btn-primary">
                            Browse Menu
                        </Link>
                    </motion.div>
                ) : (
                    <div className="space-y-4">
                        {orders.map((order, index) => (
                            <motion.div
                                key={order.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="card overflow-hidden"
                            >
                                {/* Order Header */}
                                <div className="p-4 border-b border-[var(--border)]">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${order.status === 'completed'
                                                    ? 'bg-green-100 text-green-600'
                                                    : 'bg-red-100 text-red-600'
                                                }`}>
                                                {order.status === 'completed' ? (
                                                    <CheckCircle className="w-4 h-4" />
                                                ) : (
                                                    <Clock className="w-4 h-4" />
                                                )}
                                            </div>
                                            <div>
                                                <p className="font-semibold">Order #{order.orderNumber}</p>
                                                <p className="text-xs text-[var(--text-muted)]">{formatDate(order.date)}</p>
                                            </div>
                                        </div>
                                        <span className="font-semibold">${order.total.toFixed(2)}</span>
                                    </div>
                                </div>

                                {/* Order Items */}
                                <div className="p-4">
                                    <div className="flex gap-2 mb-4 overflow-x-auto">
                                        {order.items.map((item, idx) => (
                                            <div
                                                key={idx}
                                                className="flex-shrink-0 w-12 h-12 rounded-lg bg-cover bg-center"
                                                style={{
                                                    backgroundImage: `url(${item.image})`,
                                                    backgroundColor: '#F0EBE5'
                                                }}
                                                title={`${item.quantity}x ${item.name}`}
                                            />
                                        ))}
                                    </div>

                                    <p className="text-sm text-[var(--text-muted)] mb-4">
                                        {order.items.map(i => `${i.quantity}x ${i.name}`).join(', ')}
                                    </p>

                                    <div className="flex gap-2">
                                        <motion.button
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            onClick={() => handleReorder(order)}
                                            className="flex-1 btn btn-primary text-sm"
                                        >
                                            <Repeat className="w-4 h-4" />
                                            Reorder
                                        </motion.button>
                                        <Link href={`/orders/${order.id}`} className="btn btn-outline text-sm">
                                            Details
                                            <ChevronRight className="w-4 h-4" />
                                        </Link>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
