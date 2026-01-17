'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
    ChevronLeft,
    Download,
    Calendar,
    FileText,
    TrendingUp,
    DollarSign,
    ShoppingBag,
    Clock
} from 'lucide-react';
import Link from 'next/link';
import AdminSidebar from '@/components/layout/AdminSidebar';

interface ReportData {
    period: string;
    revenue: number;
    orders: number;
    avgOrderValue: number;
    topItems: { name: string; quantity: number; revenue: number }[];
    hourlyPeak: string;
    previousRevenue: number;
}

const mockReports: Record<string, ReportData> = {
    daily: {
        period: 'Today',
        revenue: 2847.50,
        orders: 127,
        avgOrderValue: 22.42,
        topItems: [
            { name: 'Oat Latte', quantity: 45, revenue: 247.50 },
            { name: 'Avocado Toast', quantity: 32, revenue: 384.00 },
            { name: 'Butter Croissant', quantity: 28, revenue: 112.00 },
        ],
        hourlyPeak: '8:00 AM - 9:00 AM',
        previousRevenue: 2650.00,
    },
    weekly: {
        period: 'This Week',
        revenue: 19450.75,
        orders: 876,
        avgOrderValue: 22.20,
        topItems: [
            { name: 'Oat Latte', quantity: 312, revenue: 1716.00 },
            { name: 'Avocado Toast', quantity: 198, revenue: 2376.00 },
            { name: 'Espresso', quantity: 187, revenue: 654.50 },
        ],
        hourlyPeak: '12:00 PM - 1:00 PM',
        previousRevenue: 17800.00,
    },
    monthly: {
        period: 'This Month',
        revenue: 78320.25,
        orders: 3542,
        avgOrderValue: 22.11,
        topItems: [
            { name: 'Oat Latte', quantity: 1245, revenue: 6847.50 },
            { name: 'Avocado Toast', quantity: 876, revenue: 10512.00 },
            { name: 'Iced Matcha', quantity: 654, revenue: 3924.00 },
        ],
        hourlyPeak: '8:00 AM - 9:00 AM',
        previousRevenue: 72450.00,
    },
};

export default function ReportsPage() {
    const [reportType, setReportType] = useState<'daily' | 'weekly' | 'monthly'>('daily');
    const [exporting, setExporting] = useState(false);

    const report = mockReports[reportType];
    const revenueChange = ((report.revenue - report.previousRevenue) / report.previousRevenue * 100).toFixed(1);

    const handleExportPDF = () => {
        setExporting(true);
        setTimeout(() => {
            // Create dummy PDF download
            const content = `
${report.period} Sales Report
Generated: ${new Date().toLocaleString()}

SUMMARY
-------
Total Revenue: ₱${report.revenue.toLocaleString()}
Total Orders: ${report.orders}
Average Order Value: ₱${report.avgOrderValue.toFixed(2)}
Peak Hours: ${report.hourlyPeak}

TOP SELLING ITEMS
-----------------
${report.topItems.map(item => `${item.name}: ${item.quantity} sold (₱${item.revenue.toFixed(2)})`).join('\n')}
      `;

            const blob = new Blob([content], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `sales-report-${reportType}-${new Date().toISOString().split('T')[0]}.txt`;
            a.click();

            setExporting(false);
        }, 1500);
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
                                <h1 className="text-xl font-semibold">Sales Reports</h1>
                                <p className="text-sm text-[var(--text-muted)]">Generate and export reports</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="flex bg-[var(--background-alt)] rounded-lg p-1">
                                {(['daily', 'weekly', 'monthly'] as const).map((type) => (
                                    <button
                                        key={type}
                                        onClick={() => setReportType(type)}
                                        className={`px-3 py-1.5 rounded-md text-sm font-medium capitalize transition-colors ${reportType === type ? 'bg-white shadow-sm' : 'text-[var(--text-muted)]'
                                            }`}
                                    >
                                        {type}
                                    </button>
                                ))}
                            </div>
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={handleExportPDF}
                                disabled={exporting}
                                className="btn btn-primary"
                            >
                                {exporting ? (
                                    <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                                        className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                                    />
                                ) : (
                                    <>
                                        <Download className="w-4 h-4" />
                                        Export Report
                                    </>
                                )}
                            </motion.button>
                        </div>
                    </div>
                </header>

                <div className="p-6 space-y-6">
                    {/* Summary Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="card p-5"
                        >
                            <div className="flex items-center gap-3 mb-2">
                                <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                                    <DollarSign className="w-5 h-5 text-green-600" />
                                </div>
                                <span className="text-sm text-[var(--text-muted)]">Total Revenue</span>
                            </div>
                            <p className="text-2xl font-bold">₱{report.revenue.toLocaleString()}</p>
                            <div className={`flex items-center gap-1 text-sm mt-1 ${parseFloat(revenueChange) >= 0 ? 'text-green-600' : 'text-red-500'}`}>
                                <TrendingUp className="w-4 h-4" />
                                <span>{revenueChange}% vs previous</span>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="card p-5"
                        >
                            <div className="flex items-center gap-3 mb-2">
                                <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                                    <ShoppingBag className="w-5 h-5 text-blue-600" />
                                </div>
                                <span className="text-sm text-[var(--text-muted)]">Total Orders</span>
                            </div>
                            <p className="text-2xl font-bold">{report.orders}</p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="card p-5"
                        >
                            <div className="flex items-center gap-3 mb-2">
                                <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                                    <FileText className="w-5 h-5 text-purple-600" />
                                </div>
                                <span className="text-sm text-[var(--text-muted)]">Avg Order Value</span>
                            </div>
                            <p className="text-2xl font-bold">₱{report.avgOrderValue.toFixed(2)}</p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="card p-5"
                        >
                            <div className="flex items-center gap-3 mb-2">
                                <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center">
                                    <Clock className="w-5 h-5 text-orange-600" />
                                </div>
                                <span className="text-sm text-[var(--text-muted)]">Peak Hours</span>
                            </div>
                            <p className="text-lg font-bold">{report.hourlyPeak}</p>
                        </motion.div>
                    </div>

                    {/* Report Details */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Top Selling Items */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="card p-5"
                        >
                            <h3 className="font-semibold mb-4">Top Selling Items</h3>
                            <div className="space-y-4">
                                {report.topItems.map((item, index) => (
                                    <div key={item.name} className="flex items-center gap-4">
                                        <span className="w-6 h-6 rounded-full bg-[var(--primary)] text-white text-xs font-bold flex items-center justify-center">
                                            {index + 1}
                                        </span>
                                        <div className="flex-1">
                                            <p className="font-medium">{item.name}</p>
                                            <p className="text-sm text-[var(--text-muted)]">{item.quantity} sold</p>
                                        </div>
                                        <span className="font-semibold text-[var(--primary)]">₱{item.revenue.toFixed(2)}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Profit Margin */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="card p-5"
                        >
                            <h3 className="font-semibold mb-4">Financial Summary</h3>
                            <div className="space-y-4">
                                <div className="flex justify-between p-3 bg-[var(--background-alt)] rounded-lg">
                                    <span className="text-[var(--text-muted)]">Gross Revenue</span>
                                    <span className="font-semibold">₱{report.revenue.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between p-3 bg-[var(--background-alt)] rounded-lg">
                                    <span className="text-[var(--text-muted)]">Est. COGS (35%)</span>
                                    <span className="font-semibold text-red-500">-₱{(report.revenue * 0.35).toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between p-3 bg-[var(--background-alt)] rounded-lg">
                                    <span className="text-[var(--text-muted)]">Est. Labor (25%)</span>
                                    <span className="font-semibold text-red-500">-₱{(report.revenue * 0.25).toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                                    <span className="font-medium text-green-700">Est. Profit (40%)</span>
                                    <span className="font-bold text-green-700">₱{(report.revenue * 0.40).toFixed(2)}</span>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Quick Actions */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="card p-5"
                    >
                        <h3 className="font-semibold mb-4">Export Options</h3>
                        <div className="flex flex-wrap gap-3">
                            <button className="btn btn-outline">
                                <FileText className="w-4 h-4" />
                                PDF Summary
                            </button>
                            <button className="btn btn-outline">
                                <Download className="w-4 h-4" />
                                CSV Data
                            </button>
                            <button className="btn btn-outline">
                                <Calendar className="w-4 h-4" />
                                Schedule Report
                            </button>
                        </div>
                    </motion.div>
                </div>
            </main>
        </div>
    );
}
