'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, ChefHat, Bell, CheckCircle, Package, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

type OrderStatus = 'pending' | 'preparing' | 'ready' | 'completed';

interface OrderItem {
    name: string;
    quantity: number;
    price: number;
}

interface TrackedOrder {
    id: string;
    orderNumber: number;
    status: OrderStatus;
    items: OrderItem[];
    total: number;
    estimatedTime: number;
    createdAt: Date;
}

const statusSteps = [
    { key: 'pending', label: 'Order Received', icon: Clock, description: 'We got your order!' },
    { key: 'preparing', label: 'Preparing', icon: ChefHat, description: 'Barista is making your order' },
    { key: 'ready', label: 'Ready for Pickup', icon: Bell, description: 'Your order is ready!' },
    { key: 'completed', label: 'Completed', icon: CheckCircle, description: 'Order picked up' },
];

// Simulated order for demo
const mockOrder: TrackedOrder = {
    id: '1',
    orderNumber: 2046,
    status: 'pending',
    items: [
        { name: 'Oat Latte', quantity: 2, price: 5.50 },
        { name: 'Avocado Toast', quantity: 1, price: 12.00 },
        { name: 'Butter Croissant', quantity: 1, price: 4.00 },
    ],
    total: 27.00,
    estimatedTime: 15,
    createdAt: new Date(),
};

export default function OrderTrackingPage() {
    const [order, setOrder] = useState<TrackedOrder>(mockOrder);
    const [timeRemaining, setTimeRemaining] = useState(order.estimatedTime * 60);

    // Simulate real-time status updates
    useEffect(() => {
        const statusSequence: OrderStatus[] = ['pending', 'preparing', 'ready'];
        let currentIndex = statusSequence.indexOf(order.status);

        const interval = setInterval(() => {
            if (currentIndex < statusSequence.length - 1) {
                currentIndex++;
                setOrder(prev => ({ ...prev, status: statusSequence[currentIndex] }));
            }
        }, 8000); // Update every 8 seconds for demo

        return () => clearInterval(interval);
    }, []);

    // Countdown timer
    useEffect(() => {
        if (order.status === 'ready' || order.status === 'completed') return;

        const timer = setInterval(() => {
            setTimeRemaining(prev => Math.max(0, prev - 1));
        }, 1000);

        return () => clearInterval(timer);
    }, [order.status]);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const currentStepIndex = statusSteps.findIndex(s => s.key === order.status);

    return (
        <div className="min-h-screen bg-[var(--background-alt)]">
            <div className="max-w-2xl mx-auto p-4 py-8">
                {/* Header */}
                <div className="flex items-center gap-4 mb-8">
                    <Link href="/" className="p-2 hover:bg-white rounded-full transition-colors">
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                    <div>
                        <h1 className="text-xl font-bold">Order #{order.orderNumber}</h1>
                        <p className="text-sm text-[var(--text-muted)]">
                            Track your order in real-time
                        </p>
                    </div>
                </div>

                {/* Status Card */}
                <motion.div
                    className="card p-6 mb-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    {/* Current Status */}
                    <div className="text-center mb-8">
                        <motion.div
                            key={order.status}
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="w-20 h-20 mx-auto mb-4 rounded-full bg-[var(--primary)] flex items-center justify-center"
                        >
                            {order.status === 'pending' && <Clock className="w-10 h-10 text-white" />}
                            {order.status === 'preparing' && (
                                <motion.div
                                    animate={{ rotate: [0, 10, -10, 0] }}
                                    transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 1 }}
                                >
                                    <ChefHat className="w-10 h-10 text-white" />
                                </motion.div>
                            )}
                            {order.status === 'ready' && (
                                <motion.div
                                    animate={{ scale: [1, 1.2, 1] }}
                                    transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 0.5 }}
                                >
                                    <Bell className="w-10 h-10 text-white" />
                                </motion.div>
                            )}
                            {order.status === 'completed' && <CheckCircle className="w-10 h-10 text-white" />}
                        </motion.div>

                        <motion.h2
                            key={`title-${order.status}`}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-2xl font-bold mb-2"
                        >
                            {statusSteps[currentStepIndex]?.label}
                        </motion.h2>
                        <p className="text-[var(--text-muted)]">
                            {statusSteps[currentStepIndex]?.description}
                        </p>

                        {/* Timer */}
                        {order.status !== 'ready' && order.status !== 'completed' && (
                            <div className="mt-4">
                                <p className="text-sm text-[var(--text-muted)]">Estimated time remaining</p>
                                <p className="text-3xl font-bold text-[var(--primary)]">
                                    {formatTime(timeRemaining)}
                                </p>
                            </div>
                        )}

                        {order.status === 'ready' && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="mt-4 p-4 bg-green-50 rounded-xl"
                            >
                                <p className="text-green-700 font-medium">
                                    🎉 Your order is ready! Please pick it up at the counter.
                                </p>
                            </motion.div>
                        )}
                    </div>

                    {/* Progress Steps */}
                    <div className="relative">
                        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-[var(--border)]" />

                        {statusSteps.map((step, index) => {
                            const isCompleted = index < currentStepIndex;
                            const isCurrent = index === currentStepIndex;
                            const Icon = step.icon;

                            return (
                                <motion.div
                                    key={step.key}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className={`relative flex items-center gap-4 py-4 ${index < statusSteps.length - 1 ? '' : ''
                                        }`}
                                >
                                    <div
                                        className={`relative z-10 w-12 h-12 rounded-full flex items-center justify-center transition-all ${isCompleted || isCurrent
                                                ? 'bg-[var(--primary)] text-white'
                                                : 'bg-[var(--background-alt)] text-[var(--text-muted)] border-2 border-[var(--border)]'
                                            }`}
                                    >
                                        {isCompleted ? (
                                            <CheckCircle className="w-5 h-5" />
                                        ) : (
                                            <Icon className="w-5 h-5" />
                                        )}
                                    </div>
                                    <div>
                                        <p className={`font-medium ${isCurrent ? 'text-[var(--primary)]' : ''}`}>
                                            {step.label}
                                        </p>
                                        <p className="text-sm text-[var(--text-muted)]">{step.description}</p>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </motion.div>

                {/* Order Details */}
                <motion.div
                    className="card p-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <h3 className="font-semibold mb-4">Order Details</h3>

                    <div className="space-y-3 mb-4">
                        {order.items.map((item, index) => (
                            <div key={index} className="flex justify-between text-sm">
                                <span>
                                    {item.quantity}x {item.name}
                                </span>
                                <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                            </div>
                        ))}
                    </div>

                    <div className="border-t border-[var(--border)] pt-4">
                        <div className="flex justify-between font-semibold">
                            <span>Total</span>
                            <span>${order.total.toFixed(2)}</span>
                        </div>
                    </div>
                </motion.div>

                {/* Actions */}
                <div className="mt-6 text-center">
                    <Link href="/menu" className="btn btn-outline">
                        Order More
                    </Link>
                </div>
            </div>
        </div>
    );
}
