'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
    ChevronLeft,
    TrendingUp,
    TrendingDown,
    Calendar,
    Download,
    DollarSign,
    ShoppingBag,
    Users,
    BarChart3
} from 'lucide-react';
import { AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import AdminSidebar from '@/components/layout/AdminSidebar';

// Mock data
const dailyRevenue = [
    { day: 'Mon', revenue: 2100, orders: 85 },
    { day: 'Tue', revenue: 2450, orders: 92 },
    { day: 'Wed', revenue: 2200, orders: 88 },
    { day: 'Thu', revenue: 2800, orders: 105 },
    { day: 'Fri', revenue: 3200, orders: 125 },
    { day: 'Sat', revenue: 3800, orders: 148 },
    { day: 'Sun', revenue: 2900, orders: 110 },
];

const categoryBreakdown = [
    { name: 'Coffee', value: 45, color: '#5C8D4D' },
    { name: 'Food', value: 30, color: '#C17F59' },
    { name: 'Drinks', value: 15, color: '#6366F1' },
    { name: 'Retail', value: 10, color: '#F59E0B' },
];

const hourlyData = [
    { hour: '6AM', sales: 120 },
    { hour: '7AM', sales: 280 },
    { hour: '8AM', sales: 520 },
    { hour: '9AM', sales: 450 },
    { hour: '10AM', sales: 380 },
    { hour: '11AM', sales: 420 },
    { hour: '12PM', sales: 680 },
    { hour: '1PM', sales: 720 },
    { hour: '2PM', sales: 450 },
    { hour: '3PM', sales: 380 },
    { hour: '4PM', sales: 420 },
    { hour: '5PM', sales: 520 },
    { hour: '6PM', sales: 680 },
    { hour: '7PM', sales: 480 },
    { hour: '8PM', sales: 320 },
];

const dateRanges = [
    { id: 'today', label: 'Today' },
    { id: 'week', label: 'This Week' },
    { id: 'month', label: 'This Month' },
    { id: 'year', label: 'This Year' },
];

export default function AnalyticsPage() {
    const [dateRange, setDateRange] = useState('week');

    const totalRevenue = dailyRevenue.reduce((acc, day) => acc + day.revenue, 0);
    const totalOrders = dailyRevenue.reduce((acc, day) => acc + day.orders, 0);
    const avgOrderValue = totalRevenue / totalOrders;

    const handleExport = () => {
        // Create CSV content
        const headers = ['Day', 'Revenue', 'Orders'];
        const rows = dailyRevenue.map(d => [d.day, d.revenue, d.orders]);
        const csv = [headers, ...rows].map(row => row.join(',')).join('\n');

        // Download
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `sales-report-${dateRange}.csv`;
        a.click();
    };

    return (
        <div className="flex min-h-screen bg-[var(--background)]">
            <AdminSidebar />

            <main className="flex-1 overflow-auto">
                {/* Header */}
                <header className="bg-white border-b border-[var(--border)] px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <Link href="/" className="p-2 hover:bg-[var(--background-alt)] rounded-lg">
                                <ChevronLeft className="w-5 h-5" />
                            </Link>
                            <div>
                                <h1 className="text-xl font-semibold">Sales Analytics</h1>
                                <p className="text-sm text-[var(--text-muted)]">Track your business performance</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            {/* Date Range Selector */}
                            <div className="flex bg-[var(--background-alt)] rounded-lg p-1">
                                {dateRanges.map(range => (
                                    <button
                                        key={range.id}
                                        onClick={() => setDateRange(range.id)}
                                        className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${dateRange === range.id
                                                ? 'bg-white shadow-sm'
                                                : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                                            }`}
                                    >
                                        {range.label}
                                    </button>
                                ))}
                            </div>
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={handleExport}
                                className="btn btn-outline"
                            >
                                <Download className="w-4 h-4" />
                                Export CSV
                            </motion.button>
                        </div>
                    </div>
                </header>

                <div className="p-6 space-y-6">
                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="card p-5"
                        >
                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                                    <DollarSign className="w-5 h-5 text-green-600" />
                                </div>
                                <span className="text-sm text-[var(--text-muted)]">Total Revenue</span>
                            </div>
                            <p className="text-2xl font-bold">${totalRevenue.toLocaleString()}</p>
                            <div className="flex items-center gap-1 text-green-600 text-sm mt-1">
                                <TrendingUp className="w-4 h-4" />
                                <span>+12.5% vs last week</span>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="card p-5"
                        >
                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                                    <ShoppingBag className="w-5 h-5 text-blue-600" />
                                </div>
                                <span className="text-sm text-[var(--text-muted)]">Total Orders</span>
                            </div>
                            <p className="text-2xl font-bold">{totalOrders}</p>
                            <div className="flex items-center gap-1 text-green-600 text-sm mt-1">
                                <TrendingUp className="w-4 h-4" />
                                <span>+8.2% vs last week</span>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="card p-5"
                        >
                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                                    <BarChart3 className="w-5 h-5 text-purple-600" />
                                </div>
                                <span className="text-sm text-[var(--text-muted)]">Avg Order Value</span>
                            </div>
                            <p className="text-2xl font-bold">${avgOrderValue.toFixed(2)}</p>
                            <div className="flex items-center gap-1 text-green-600 text-sm mt-1">
                                <TrendingUp className="w-4 h-4" />
                                <span>+3.1% vs last week</span>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="card p-5"
                        >
                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center">
                                    <Users className="w-5 h-5 text-orange-600" />
                                </div>
                                <span className="text-sm text-[var(--text-muted)]">New Customers</span>
                            </div>
                            <p className="text-2xl font-bold">248</p>
                            <div className="flex items-center gap-1 text-red-500 text-sm mt-1">
                                <TrendingDown className="w-4 h-4" />
                                <span>-2.4% vs last week</span>
                            </div>
                        </motion.div>
                    </div>

                    {/* Charts Row */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Revenue Chart */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="card p-5 lg:col-span-2"
                        >
                            <h3 className="font-semibold mb-4">Revenue & Orders</h3>
                            <div className="h-72">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={dailyRevenue}>
                                        <defs>
                                            <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#5C8D4D" stopOpacity={0.3} />
                                                <stop offset="95%" stopColor="#5C8D4D" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <XAxis dataKey="day" axisLine={false} tickLine={false} />
                                        <YAxis axisLine={false} tickLine={false} tickFormatter={(v) => `$${v}`} />
                                        <Tooltip
                                            contentStyle={{
                                                backgroundColor: '#1A1A1A',
                                                border: 'none',
                                                borderRadius: '8px',
                                                color: 'white'
                                            }}
                                        />
                                        <Area type="monotone" dataKey="revenue" stroke="#5C8D4D" strokeWidth={2} fill="url(#revenueGradient)" />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </motion.div>

                        {/* Category Breakdown */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="card p-5"
                        >
                            <h3 className="font-semibold mb-4">Sales by Category</h3>
                            <div className="h-72">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={categoryBreakdown}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={60}
                                            outerRadius={90}
                                            paddingAngle={2}
                                            dataKey="value"
                                        >
                                            {categoryBreakdown.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.color} />
                                            ))}
                                        </Pie>
                                        <Tooltip />
                                        <Legend />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                        </motion.div>
                    </div>

                    {/* Hourly Sales */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="card p-5"
                    >
                        <h3 className="font-semibold mb-4">Hourly Sales Distribution</h3>
                        <div className="h-64">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={hourlyData}>
                                    <XAxis dataKey="hour" axisLine={false} tickLine={false} />
                                    <YAxis axisLine={false} tickLine={false} tickFormatter={(v) => `$${v}`} />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: '#1A1A1A',
                                            border: 'none',
                                            borderRadius: '8px',
                                            color: 'white'
                                        }}
                                    />
                                    <Bar dataKey="sales" fill="#5C8D4D" radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </motion.div>
                </div>
            </main>
        </div>
    );
}
