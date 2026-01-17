'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
    ChevronLeft,
    Download,
    Calendar,
    DollarSign,
    TrendingUp,
    ShoppingBag,
    Users,
    Coffee,
    FileSpreadsheet,
    FileText,
    Printer
} from 'lucide-react';
import Link from 'next/link';
import AdminSidebar from '@/components/layout/AdminSidebar';

interface DailySummary {
    date: string;
    totalSales: number;
    orderCount: number;
    averageOrder: number;
    topItems: { name: string; quantity: number; revenue: number }[];
    hourlyBreakdown: { hour: string; orders: number; revenue: number }[];
    paymentMethods: { method: string; amount: number; percentage: number }[];
}

// Mock daily summary data
const mockSummary: DailySummary = {
    date: new Date().toISOString().split('T')[0],
    totalSales: 45680,
    orderCount: 142,
    averageOrder: 321.69,
    topItems: [
        { name: 'Spanish Latte', quantity: 45, revenue: 9450 },
        { name: 'Beefless Burger', quantity: 28, revenue: 7560 },
        { name: 'Matcha Latte', quantity: 32, revenue: 6720 },
        { name: 'Vanilla Pancake', quantity: 24, revenue: 6000 },
        { name: 'Bibimbap', quantity: 15, revenue: 5250 },
    ],
    hourlyBreakdown: [
        { hour: '8AM', orders: 8, revenue: 1840 },
        { hour: '9AM', orders: 12, revenue: 3120 },
        { hour: '10AM', orders: 18, revenue: 5220 },
        { hour: '11AM', orders: 22, revenue: 7040 },
        { hour: '12PM', orders: 28, revenue: 9240 },
        { hour: '1PM', orders: 20, revenue: 6400 },
        { hour: '2PM', orders: 15, revenue: 4200 },
        { hour: '3PM', orders: 10, revenue: 2800 },
        { hour: '4PM', orders: 9, revenue: 2520 },
    ],
    paymentMethods: [
        { method: 'GCash', amount: 22840, percentage: 50 },
        { method: 'Cash', amount: 13704, percentage: 30 },
        { method: 'Credit Card', amount: 9136, percentage: 20 },
    ],
};

export default function DailySummaryPage() {
    const [summary] = useState<DailySummary>(mockSummary);
    const [selectedDate, setSelectedDate] = useState(summary.date);

    const exportToCSV = () => {
        const headers = ['Item', 'Quantity', 'Revenue'];
        const rows = summary.topItems.map(i => [i.name, i.quantity, i.revenue]);

        const csvContent = [
            `Daily Sales Summary - ${selectedDate}`,
            '',
            `Total Sales: ₱${summary.totalSales.toLocaleString()}`,
            `Orders: ${summary.orderCount}`,
            `Average Order: ₱${summary.averageOrder.toFixed(2)}`,
            '',
            'TOP SELLING ITEMS',
            headers.join(','),
            ...rows.map(r => r.join(','))
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `daily-summary-${selectedDate}.csv`;
        a.click();
        URL.revokeObjectURL(url);
    };

    const printSummary = () => {
        window.print();
    };

    return (
        <div className="flex min-h-screen bg-[var(--background)]">
            <AdminSidebar />

            <main className="flex-1 overflow-auto">
                {/* Header */}
                <header className="bg-white border-b border-[var(--border)] px-6 py-4 print:hidden">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <Link href="/reports" className="p-2 hover:bg-[var(--background-alt)] rounded-lg">
                                <ChevronLeft className="w-5 h-5" />
                            </Link>
                            <div>
                                <h1 className="text-xl font-semibold">Daily Sales Summary</h1>
                                <p className="text-sm text-[var(--text-muted)]">End-of-day report</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <input
                                type="date"
                                value={selectedDate}
                                onChange={(e) => setSelectedDate(e.target.value)}
                                className="input"
                            />
                            <button onClick={exportToCSV} className="btn btn-outline">
                                <FileSpreadsheet className="w-4 h-4" />
                                Export CSV
                            </button>
                            <button onClick={printSummary} className="btn btn-primary">
                                <Printer className="w-4 h-4" />
                                Print
                            </button>
                        </div>
                    </div>
                </header>

                <div className="p-6">
                    {/* Print Header */}
                    <div className="hidden print:block mb-6 text-center">
                        <h1 className="text-2xl font-bold">Columns Coffee + Kitchen</h1>
                        <p className="text-gray-500">Daily Sales Summary</p>
                        <p className="text-lg font-medium">{new Date(selectedDate).toLocaleDateString('en-PH', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        })}</p>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-6 text-white"
                        >
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-green-100">Total Sales</span>
                                <DollarSign className="w-5 h-5 text-green-200" />
                            </div>
                            <p className="text-3xl font-bold">₱{summary.totalSales.toLocaleString()}</p>
                            <p className="text-green-200 text-sm mt-1">+12% from yesterday</p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="bg-white rounded-2xl p-6 border border-[var(--border)]"
                        >
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-[var(--text-muted)]">Orders</span>
                                <ShoppingBag className="w-5 h-5 text-blue-500" />
                            </div>
                            <p className="text-3xl font-bold">{summary.orderCount}</p>
                            <p className="text-[var(--text-muted)] text-sm mt-1">orders today</p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="bg-white rounded-2xl p-6 border border-[var(--border)]"
                        >
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-[var(--text-muted)]">Avg Order</span>
                                <TrendingUp className="w-5 h-5 text-purple-500" />
                            </div>
                            <p className="text-3xl font-bold">₱{summary.averageOrder.toFixed(0)}</p>
                            <p className="text-[var(--text-muted)] text-sm mt-1">per transaction</p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="bg-white rounded-2xl p-6 border border-[var(--border)]"
                        >
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-[var(--text-muted)]">Peak Hour</span>
                                <Coffee className="w-5 h-5 text-orange-500" />
                            </div>
                            <p className="text-3xl font-bold">12PM</p>
                            <p className="text-[var(--text-muted)] text-sm mt-1">28 orders</p>
                        </motion.div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Top Selling Items */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="bg-white rounded-2xl border border-[var(--border)] overflow-hidden"
                        >
                            <div className="p-4 border-b border-[var(--border)]">
                                <h2 className="font-semibold flex items-center gap-2">
                                    <TrendingUp className="w-5 h-5 text-green-500" />
                                    Top Selling Items
                                </h2>
                            </div>
                            <div className="divide-y divide-[var(--border)]">
                                {summary.topItems.map((item, i) => (
                                    <div key={i} className="p-4 flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <span className="w-6 h-6 rounded-full bg-[var(--primary)] text-white text-xs flex items-center justify-center font-bold">
                                                {i + 1}
                                            </span>
                                            <div>
                                                <p className="font-medium">{item.name}</p>
                                                <p className="text-sm text-[var(--text-muted)]">{item.quantity} sold</p>
                                            </div>
                                        </div>
                                        <span className="font-semibold text-[var(--primary)]">
                                            ₱{item.revenue.toLocaleString()}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Payment Methods */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="bg-white rounded-2xl border border-[var(--border)] overflow-hidden"
                        >
                            <div className="p-4 border-b border-[var(--border)]">
                                <h2 className="font-semibold flex items-center gap-2">
                                    <DollarSign className="w-5 h-5 text-blue-500" />
                                    Payment Methods
                                </h2>
                            </div>
                            <div className="p-4 space-y-4">
                                {summary.paymentMethods.map((pm, i) => (
                                    <div key={i}>
                                        <div className="flex justify-between mb-1">
                                            <span className="font-medium">{pm.method}</span>
                                            <span className="text-[var(--text-muted)]">
                                                ₱{pm.amount.toLocaleString()} ({pm.percentage}%)
                                            </span>
                                        </div>
                                        <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: `${pm.percentage}%` }}
                                                transition={{ delay: 0.6 + i * 0.1, duration: 0.5 }}
                                                className={`h-full rounded-full ${i === 0 ? 'bg-blue-500' :
                                                        i === 1 ? 'bg-green-500' : 'bg-purple-500'
                                                    }`}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Hourly Breakdown */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                            className="bg-white rounded-2xl border border-[var(--border)] overflow-hidden lg:col-span-2"
                        >
                            <div className="p-4 border-b border-[var(--border)]">
                                <h2 className="font-semibold flex items-center gap-2">
                                    <Calendar className="w-5 h-5 text-orange-500" />
                                    Hourly Breakdown
                                </h2>
                            </div>
                            <div className="p-4">
                                <div className="flex items-end justify-between h-40 gap-2">
                                    {summary.hourlyBreakdown.map((h, i) => {
                                        const maxOrders = Math.max(...summary.hourlyBreakdown.map(x => x.orders));
                                        const height = (h.orders / maxOrders) * 100;
                                        return (
                                            <div key={i} className="flex-1 flex flex-col items-center">
                                                <motion.div
                                                    initial={{ height: 0 }}
                                                    animate={{ height: `${height}%` }}
                                                    transition={{ delay: 0.7 + i * 0.05, duration: 0.4 }}
                                                    className="w-full bg-gradient-to-t from-[var(--primary)] to-green-400 rounded-t-lg relative group"
                                                >
                                                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                                        {h.orders} orders • ₱{h.revenue.toLocaleString()}
                                                    </div>
                                                </motion.div>
                                                <span className="text-xs text-[var(--text-muted)] mt-2">{h.hour}</span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </main>
        </div>
    );
}
