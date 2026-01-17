'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Bell,
    X,
    Check,
    AlertTriangle,
    Package,
    DollarSign,
    Clock,
    CheckCheck
} from 'lucide-react';

interface Notification {
    id: string;
    type: 'order' | 'stock' | 'revenue' | 'alert';
    title: string;
    message: string;
    time: Date;
    read: boolean;
}

const mockNotifications: Notification[] = [
    { id: '1', type: 'order', title: 'New Order #2048', message: 'Oat Latte, Avocado Toast', time: new Date(Date.now() - 1000 * 60 * 2), read: false },
    { id: '2', type: 'stock', title: 'Low Stock Alert', message: 'Almond Milk running low (5 units)', time: new Date(Date.now() - 1000 * 60 * 15), read: false },
    { id: '3', type: 'revenue', title: 'Daily Goal Reached!', message: 'You\'ve hit ₱2,000 in sales today', time: new Date(Date.now() - 1000 * 60 * 45), read: false },
    { id: '4', type: 'order', title: 'New Order #2047', message: 'Espresso, Butter Croissant x2', time: new Date(Date.now() - 1000 * 60 * 60), read: true },
    { id: '5', type: 'alert', title: 'Shift Reminder', message: 'Sarah\'s shift ends in 30 minutes', time: new Date(Date.now() - 1000 * 60 * 90), read: true },
];

const icons = {
    order: Package,
    stock: AlertTriangle,
    revenue: DollarSign,
    alert: Clock,
};

const colors = {
    order: 'bg-blue-100 text-blue-600',
    stock: 'bg-yellow-100 text-yellow-600',
    revenue: 'bg-green-100 text-green-600',
    alert: 'bg-purple-100 text-purple-600',
};

export default function NotificationsPanel() {
    const [isOpen, setIsOpen] = useState(false);
    const [notifications, setNotifications] = useState(mockNotifications);

    const unreadCount = notifications.filter(n => !n.read).length;

    const formatTime = (date: Date) => {
        const mins = Math.floor((Date.now() - date.getTime()) / (1000 * 60));
        if (mins < 1) return 'Just now';
        if (mins < 60) return `${mins}m ago`;
        const hours = Math.floor(mins / 60);
        if (hours < 24) return `${hours}h ago`;
        return date.toLocaleDateString();
    };

    const markAsRead = (id: string) => {
        setNotifications(prev => prev.map(n =>
            n.id === id ? { ...n, read: true } : n
        ));
    };

    const markAllAsRead = () => {
        setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    };

    const deleteNotification = (id: string) => {
        setNotifications(prev => prev.filter(n => n.id !== id));
    };

    // Simulate new notification
    useEffect(() => {
        const interval = setInterval(() => {
            const newNotif: Notification = {
                id: Date.now().toString(),
                type: 'order',
                title: `New Order #${2049 + Math.floor(Math.random() * 100)}`,
                message: 'Iced Matcha, Granola Bowl',
                time: new Date(),
                read: false,
            };
            setNotifications(prev => [newNotif, ...prev.slice(0, 9)]);
        }, 30000); // Every 30 seconds

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative">
            {/* Bell Icon */}
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className="relative p-2 rounded-lg hover:bg-[var(--background-alt)] transition-colors"
            >
                <Bell className="w-5 h-5" />
                <AnimatePresence>
                    {unreadCount > 0 && (
                        <motion.span
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0 }}
                            className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center"
                        >
                            {unreadCount}
                        </motion.span>
                    )}
                </AnimatePresence>
            </motion.button>

            {/* Dropdown */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="fixed inset-0 z-40"
                        />
                        <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                            className="absolute right-0 top-full mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-[var(--border)] overflow-hidden z-50"
                        >
                            {/* Header */}
                            <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--border)]">
                                <h3 className="font-semibold">Notifications</h3>
                                {unreadCount > 0 && (
                                    <button
                                        onClick={markAllAsRead}
                                        className="text-xs text-[var(--primary)] hover:underline flex items-center gap-1"
                                    >
                                        <CheckCheck className="w-3 h-3" />
                                        Mark all read
                                    </button>
                                )}
                            </div>

                            {/* Notifications List */}
                            <div className="max-h-96 overflow-auto">
                                {notifications.length === 0 ? (
                                    <div className="py-8 text-center text-[var(--text-muted)]">
                                        <Bell className="w-8 h-8 mx-auto mb-2 opacity-50" />
                                        <p className="text-sm">No notifications</p>
                                    </div>
                                ) : (
                                    notifications.map((notification) => {
                                        const Icon = icons[notification.type];
                                        return (
                                            <motion.div
                                                key={notification.id}
                                                layout
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: 10 }}
                                                onClick={() => markAsRead(notification.id)}
                                                className={`flex gap-3 p-4 border-b border-[var(--border)] cursor-pointer hover:bg-[var(--background-alt)] transition-colors ${!notification.read ? 'bg-blue-50/50' : ''
                                                    }`}
                                            >
                                                <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${colors[notification.type]}`}>
                                                    <Icon className="w-5 h-5" />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-start justify-between gap-2">
                                                        <p className={`text-sm ${!notification.read ? 'font-semibold' : ''}`}>
                                                            {notification.title}
                                                        </p>
                                                        <button
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                deleteNotification(notification.id);
                                                            }}
                                                            className="p-1 hover:bg-gray-200 rounded opacity-0 group-hover:opacity-100"
                                                        >
                                                            <X className="w-3 h-3" />
                                                        </button>
                                                    </div>
                                                    <p className="text-xs text-[var(--text-muted)] truncate">{notification.message}</p>
                                                    <p className="text-xs text-[var(--text-muted)] mt-1">{formatTime(notification.time)}</p>
                                                </div>
                                                {!notification.read && (
                                                    <div className="w-2 h-2 bg-[var(--primary)] rounded-full flex-shrink-0 mt-2" />
                                                )}
                                            </motion.div>
                                        );
                                    })
                                )}
                            </div>

                            {/* Footer */}
                            <div className="p-3 border-t border-[var(--border)] text-center">
                                <button className="text-sm text-[var(--primary)] hover:underline">
                                    View All Notifications
                                </button>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}
