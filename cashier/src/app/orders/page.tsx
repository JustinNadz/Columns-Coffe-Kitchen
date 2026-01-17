'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Coffee,
    Clock,
    ChefHat,
    CheckCircle2,
    XCircle,
    Bell,
    RefreshCw,
    User,
    MapPin,
    Package
} from 'lucide-react';

interface OrderItem {
    name: string;
    quantity: number;
    price: number;
    notes?: string;
}

interface Order {
    id: string;
    orderNumber: number;
    type: 'dine-in' | 'takeout';
    items: OrderItem[];
    total: number;
    status: 'pending' | 'preparing' | 'ready' | 'completed' | 'cancelled';
    createdAt: Date;
    customerName?: string;
    tableNumber?: number;
}

// Mock orders data
const mockOrders: Order[] = [
    {
        id: '1',
        orderNumber: 2045,
        type: 'dine-in',
        items: [
            { name: 'Spanish Latte', quantity: 2, price: 210 },
            { name: 'Vanilla Pancake', quantity: 1, price: 250, notes: 'Extra syrup' },
        ],
        total: 670,
        status: 'pending',
        createdAt: new Date(Date.now() - 2 * 60000),
        tableNumber: 5,
    },
    {
        id: '2',
        orderNumber: 2044,
        type: 'takeout',
        items: [
            { name: 'Matcha Latte', quantity: 1, price: 210 },
            { name: 'Beefless Burger', quantity: 1, price: 270 },
        ],
        total: 480,
        status: 'preparing',
        createdAt: new Date(Date.now() - 5 * 60000),
        customerName: 'John D.',
    },
    {
        id: '3',
        orderNumber: 2043,
        type: 'dine-in',
        items: [
            { name: 'Bibimbap', quantity: 2, price: 350 },
            { name: 'Mango Mania', quantity: 2, price: 230 },
        ],
        total: 1160,
        status: 'ready',
        createdAt: new Date(Date.now() - 10 * 60000),
        tableNumber: 3,
    },
    {
        id: '4',
        orderNumber: 2042,
        type: 'takeout',
        items: [
            { name: 'Espresso', quantity: 1, price: 100 },
        ],
        total: 100,
        status: 'completed',
        createdAt: new Date(Date.now() - 15 * 60000),
        customerName: 'Maria S.',
    },
];

const statusConfig = {
    pending: { label: 'New Order', color: 'bg-yellow-500', icon: Bell },
    preparing: { label: 'Preparing', color: 'bg-blue-500', icon: ChefHat },
    ready: { label: 'Ready', color: 'bg-green-500', icon: CheckCircle2 },
    completed: { label: 'Completed', color: 'bg-gray-400', icon: CheckCircle2 },
    cancelled: { label: 'Cancelled', color: 'bg-red-500', icon: XCircle },
};

export default function OrdersQueuePage() {
    const [orders, setOrders] = useState<Order[]>(mockOrders);
    const [filter, setFilter] = useState<'all' | 'pending' | 'preparing' | 'ready'>('all');
    const [isRefreshing, setIsRefreshing] = useState(false);

    const filteredOrders = orders.filter(o => {
        if (filter === 'all') return o.status !== 'completed' && o.status !== 'cancelled';
        return o.status === filter;
    });

    const updateOrderStatus = (orderId: string, newStatus: Order['status']) => {
        setOrders(prev => prev.map(o =>
            o.id === orderId ? { ...o, status: newStatus } : o
        ));
    };

    const getTimeAgo = (date: Date) => {
        const mins = Math.floor((Date.now() - date.getTime()) / 60000);
        if (mins < 1) return 'Just now';
        if (mins === 1) return '1 min ago';
        return `${mins} mins ago`;
    };

    const handleRefresh = () => {
        setIsRefreshing(true);
        setTimeout(() => setIsRefreshing(false), 1000);
    };

    // Auto-refresh every 30 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            // In real app, fetch new orders here
        }, 30000);
        return () => clearInterval(interval);
    }, []);

    const pendingCount = orders.filter(o => o.status === 'pending').length;
    const preparingCount = orders.filter(o => o.status === 'preparing').length;
    const readyCount = orders.filter(o => o.status === 'ready').length;

    return (
        <div className="min-h-screen bg-[var(--background-alt)]">
            {/* Header */}
            <header className="bg-white border-b border-[var(--border)] px-6 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-[var(--primary)] rounded-lg flex items-center justify-center">
                            <Coffee className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <h1 className="text-xl font-semibold">Orders Queue</h1>
                            <p className="text-sm text-[var(--text-muted)]">Columns Coffee + Kitchen</p>
                        </div>
                    </div>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleRefresh}
                        className="p-2 hover:bg-[var(--background-alt)] rounded-lg"
                    >
                        <RefreshCw className={`w-5 h-5 ${isRefreshing ? 'animate-spin' : ''}`} />
                    </motion.button>
                </div>
            </header>

            {/* Stats */}
            <div className="px-6 py-4 bg-white border-b border-[var(--border)]">
                <div className="flex gap-4">
                    <div className="flex-1 bg-yellow-50 rounded-xl p-4 border border-yellow-200">
                        <div className="flex items-center justify-between">
                            <span className="text-yellow-600 font-medium">Pending</span>
                            <Bell className="w-5 h-5 text-yellow-500" />
                        </div>
                        <p className="text-3xl font-bold text-yellow-700 mt-1">{pendingCount}</p>
                    </div>
                    <div className="flex-1 bg-blue-50 rounded-xl p-4 border border-blue-200">
                        <div className="flex items-center justify-between">
                            <span className="text-blue-600 font-medium">Preparing</span>
                            <ChefHat className="w-5 h-5 text-blue-500" />
                        </div>
                        <p className="text-3xl font-bold text-blue-700 mt-1">{preparingCount}</p>
                    </div>
                    <div className="flex-1 bg-green-50 rounded-xl p-4 border border-green-200">
                        <div className="flex items-center justify-between">
                            <span className="text-green-600 font-medium">Ready</span>
                            <CheckCircle2 className="w-5 h-5 text-green-500" />
                        </div>
                        <p className="text-3xl font-bold text-green-700 mt-1">{readyCount}</p>
                    </div>
                </div>
            </div>

            {/* Filter Tabs */}
            <div className="px-6 py-3 bg-white border-b border-[var(--border)]">
                <div className="flex gap-2">
                    {(['all', 'pending', 'preparing', 'ready'] as const).map((f) => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${filter === f
                                    ? 'bg-[var(--primary)] text-white'
                                    : 'bg-[var(--background-alt)] hover:bg-[var(--border)]'
                                }`}
                        >
                            {f.charAt(0).toUpperCase() + f.slice(1)}
                        </button>
                    ))}
                </div>
            </div>

            {/* Orders Grid */}
            <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <AnimatePresence>
                        {filteredOrders.map((order, index) => {
                            const StatusIcon = statusConfig[order.status].icon;
                            return (
                                <motion.div
                                    key={order.id}
                                    layout
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ delay: index * 0.05 }}
                                    className={`bg-white rounded-2xl shadow-sm overflow-hidden border-l-4 ${order.status === 'pending' ? 'border-l-yellow-500' :
                                            order.status === 'preparing' ? 'border-l-blue-500' :
                                                order.status === 'ready' ? 'border-l-green-500' : 'border-l-gray-400'
                                        }`}
                                >
                                    {/* Order Header */}
                                    <div className="p-4 border-b border-[var(--border)]">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-lg font-bold">#{order.orderNumber}</span>
                                            <span className={`px-3 py-1 rounded-full text-xs font-medium text-white ${statusConfig[order.status].color}`}>
                                                {statusConfig[order.status].label}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-4 text-sm text-[var(--text-muted)]">
                                            <span className="flex items-center gap-1">
                                                <Clock className="w-3.5 h-3.5" />
                                                {getTimeAgo(order.createdAt)}
                                            </span>
                                            {order.type === 'dine-in' ? (
                                                <span className="flex items-center gap-1">
                                                    <MapPin className="w-3.5 h-3.5" />
                                                    Table {order.tableNumber}
                                                </span>
                                            ) : (
                                                <span className="flex items-center gap-1">
                                                    <Package className="w-3.5 h-3.5" />
                                                    Takeout
                                                </span>
                                            )}
                                            {order.customerName && (
                                                <span className="flex items-center gap-1">
                                                    <User className="w-3.5 h-3.5" />
                                                    {order.customerName}
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    {/* Order Items */}
                                    <div className="p-4 space-y-2">
                                        {order.items.map((item, i) => (
                                            <div key={i} className="flex justify-between text-sm">
                                                <span>
                                                    <span className="font-medium">{item.quantity}x</span> {item.name}
                                                    {item.notes && (
                                                        <span className="block text-xs text-[var(--text-muted)]">📝 {item.notes}</span>
                                                    )}
                                                </span>
                                                <span className="text-[var(--text-muted)]">₱{item.price * item.quantity}</span>
                                            </div>
                                        ))}
                                        <div className="pt-2 border-t border-[var(--border)] flex justify-between font-semibold">
                                            <span>Total</span>
                                            <span>₱{order.total.toLocaleString()}</span>
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div className="p-4 bg-[var(--background-alt)] flex gap-2">
                                        {order.status === 'pending' && (
                                            <>
                                                <motion.button
                                                    whileHover={{ scale: 1.02 }}
                                                    whileTap={{ scale: 0.98 }}
                                                    onClick={() => updateOrderStatus(order.id, 'preparing')}
                                                    className="flex-1 btn btn-primary py-2 text-sm"
                                                >
                                                    <ChefHat className="w-4 h-4" />
                                                    Start Preparing
                                                </motion.button>
                                                <button
                                                    onClick={() => updateOrderStatus(order.id, 'cancelled')}
                                                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                                                >
                                                    <XCircle className="w-5 h-5" />
                                                </button>
                                            </>
                                        )}
                                        {order.status === 'preparing' && (
                                            <motion.button
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                                onClick={() => updateOrderStatus(order.id, 'ready')}
                                                className="flex-1 btn btn-primary py-2 text-sm bg-green-600 hover:bg-green-700"
                                            >
                                                <CheckCircle2 className="w-4 h-4" />
                                                Mark Ready
                                            </motion.button>
                                        )}
                                        {order.status === 'ready' && (
                                            <motion.button
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                                onClick={() => updateOrderStatus(order.id, 'completed')}
                                                className="flex-1 btn btn-outline py-2 text-sm"
                                            >
                                                <CheckCircle2 className="w-4 h-4" />
                                                Complete Order
                                            </motion.button>
                                        )}
                                    </div>
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </div>

                {filteredOrders.length === 0 && (
                    <div className="text-center py-16">
                        <CheckCircle2 className="w-16 h-16 text-green-300 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold mb-2">All caught up!</h3>
                        <p className="text-[var(--text-muted)]">No orders in this category</p>
                    </div>
                )}
            </div>
        </div>
    );
}
