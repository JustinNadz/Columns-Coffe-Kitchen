'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
    ChevronLeft,
    Store,
    Receipt,
    Printer,
    DollarSign,
    Save,
    Bell,
    Moon,
    Globe
} from 'lucide-react';
import Link from 'next/link';
import AdminSidebar from '@/components/layout/AdminSidebar';

interface Settings {
    storeName: string;
    storeAddress: string;
    storePhone: string;
    taxRate: number;
    currency: string;
    receiptHeader: string;
    receiptFooter: string;
    autoPrintReceipt: boolean;
    soundNotifications: boolean;
    darkMode: boolean;
    language: string;
}

export default function SettingsPage() {
    const [settings, setSettings] = useState<Settings>({
        storeName: 'Columns Coffee + Kitchen',
        storeAddress: '2nd Street Guingona, Butuan City, Agusan del Norte 8600',
        storePhone: '+63 995 648 7004',
        taxRate: 12, // Philippines VAT
        currency: 'PHP',
        receiptHeader: 'Thank you for visiting Columns Coffee + Kitchen!',
        receiptFooter: 'See you again soon! ☕',
        autoPrintReceipt: true,
        soundNotifications: true,
        darkMode: false,
        language: 'en',
    });

    const [saved, setSaved] = useState(false);

    const handleSave = () => {
        // Save to localStorage
        localStorage.setItem('posSettings', JSON.stringify(settings));
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    const updateSetting = <K extends keyof Settings>(key: K, value: Settings[K]) => {
        setSettings(prev => ({ ...prev, [key]: value }));
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
                                <h1 className="text-xl font-semibold">Settings</h1>
                                <p className="text-sm text-[var(--text-muted)]">Configure your POS system</p>
                            </div>
                        </div>
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={handleSave}
                            className={`btn ${saved ? 'bg-green-500 hover:bg-green-600' : 'btn-primary'}`}
                        >
                            <Save className="w-4 h-4" />
                            {saved ? 'Saved!' : 'Save Changes'}
                        </motion.button>
                    </div>
                </header>

                <div className="p-6 max-w-4xl">
                    <div className="space-y-6">
                        {/* Store Information */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="card p-6"
                        >
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 rounded-lg bg-[var(--primary)] flex items-center justify-center">
                                    <Store className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <h2 className="font-semibold">Store Information</h2>
                                    <p className="text-sm text-[var(--text-muted)]">Basic store details</p>
                                </div>
                            </div>

                            <div className="grid gap-4">
                                <div>
                                    <label className="text-sm text-[var(--text-muted)] mb-1 block">Store Name</label>
                                    <input
                                        type="text"
                                        value={settings.storeName}
                                        onChange={(e) => updateSetting('storeName', e.target.value)}
                                        className="input"
                                    />
                                </div>
                                <div>
                                    <label className="text-sm text-[var(--text-muted)] mb-1 block">Address</label>
                                    <input
                                        type="text"
                                        value={settings.storeAddress}
                                        onChange={(e) => updateSetting('storeAddress', e.target.value)}
                                        className="input"
                                    />
                                </div>
                                <div>
                                    <label className="text-sm text-[var(--text-muted)] mb-1 block">Phone</label>
                                    <input
                                        type="tel"
                                        value={settings.storePhone}
                                        onChange={(e) => updateSetting('storePhone', e.target.value)}
                                        className="input"
                                    />
                                </div>
                            </div>
                        </motion.div>

                        {/* Tax & Currency */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="card p-6"
                        >
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 rounded-lg bg-green-500 flex items-center justify-center">
                                    <DollarSign className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <h2 className="font-semibold">Tax & Currency</h2>
                                    <p className="text-sm text-[var(--text-muted)]">Financial settings</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-sm text-[var(--text-muted)] mb-1 block">Tax Rate (%)</label>
                                    <input
                                        type="number"
                                        value={settings.taxRate}
                                        onChange={(e) => updateSetting('taxRate', parseFloat(e.target.value))}
                                        className="input"
                                        min="0"
                                        max="100"
                                        step="0.5"
                                    />
                                </div>
                                <div>
                                    <label className="text-sm text-[var(--text-muted)] mb-1 block">Currency</label>
                                    <select
                                        value={settings.currency}
                                        onChange={(e) => updateSetting('currency', e.target.value)}
                                        className="input"
                                    >
                                        <option value="PHP">PHP (₱)</option>
                                        <option value="USD">USD ($)</option>
                                        <option value="EUR">EUR (€)</option>
                                        <option value="GBP">GBP (£)</option>
                                        <option value="JPY">JPY (¥)</option>
                                    </select>
                                </div>
                            </div>
                        </motion.div>

                        {/* Receipt Settings */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="card p-6"
                        >
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 rounded-lg bg-blue-500 flex items-center justify-center">
                                    <Receipt className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <h2 className="font-semibold">Receipt Customization</h2>
                                    <p className="text-sm text-[var(--text-muted)]">Customize receipt appearance</p>
                                </div>
                            </div>

                            <div className="grid gap-4">
                                <div>
                                    <label className="text-sm text-[var(--text-muted)] mb-1 block">Header Message</label>
                                    <input
                                        type="text"
                                        value={settings.receiptHeader}
                                        onChange={(e) => updateSetting('receiptHeader', e.target.value)}
                                        className="input"
                                        placeholder="Thank you message..."
                                    />
                                </div>
                                <div>
                                    <label className="text-sm text-[var(--text-muted)] mb-1 block">Footer Message</label>
                                    <input
                                        type="text"
                                        value={settings.receiptFooter}
                                        onChange={(e) => updateSetting('receiptFooter', e.target.value)}
                                        className="input"
                                        placeholder="See you again..."
                                    />
                                </div>
                            </div>
                        </motion.div>

                        {/* Printer Settings */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="card p-6"
                        >
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 rounded-lg bg-purple-500 flex items-center justify-center">
                                    <Printer className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <h2 className="font-semibold">Printer Settings</h2>
                                    <p className="text-sm text-[var(--text-muted)]">Receipt printer configuration</p>
                                </div>
                            </div>

                            <div className="flex items-center justify-between p-4 bg-[var(--background-alt)] rounded-xl">
                                <div>
                                    <p className="font-medium">Auto-print receipts</p>
                                    <p className="text-sm text-[var(--text-muted)]">Print receipt automatically after checkout</p>
                                </div>
                                <button
                                    onClick={() => updateSetting('autoPrintReceipt', !settings.autoPrintReceipt)}
                                    className={`w-12 h-6 rounded-full transition-colors relative ${settings.autoPrintReceipt ? 'bg-[var(--primary)]' : 'bg-gray-300'
                                        }`}
                                >
                                    <motion.div
                                        layout
                                        className="absolute top-1 w-4 h-4 bg-white rounded-full shadow"
                                        style={{ left: settings.autoPrintReceipt ? '1.5rem' : '0.25rem' }}
                                    />
                                </button>
                            </div>
                        </motion.div>

                        {/* App Preferences */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="card p-6"
                        >
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 rounded-lg bg-orange-500 flex items-center justify-center">
                                    <Bell className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <h2 className="font-semibold">App Preferences</h2>
                                    <p className="text-sm text-[var(--text-muted)]">General settings</p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-center justify-between p-4 bg-[var(--background-alt)] rounded-xl">
                                    <div className="flex items-center gap-3">
                                        <Bell className="w-5 h-5 text-[var(--text-muted)]" />
                                        <div>
                                            <p className="font-medium">Sound Notifications</p>
                                            <p className="text-sm text-[var(--text-muted)]">Play sound for new orders</p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => updateSetting('soundNotifications', !settings.soundNotifications)}
                                        className={`w-12 h-6 rounded-full transition-colors relative ${settings.soundNotifications ? 'bg-[var(--primary)]' : 'bg-gray-300'
                                            }`}
                                    >
                                        <motion.div
                                            layout
                                            className="absolute top-1 w-4 h-4 bg-white rounded-full shadow"
                                            style={{ left: settings.soundNotifications ? '1.5rem' : '0.25rem' }}
                                        />
                                    </button>
                                </div>

                                <div className="flex items-center justify-between p-4 bg-[var(--background-alt)] rounded-xl">
                                    <div className="flex items-center gap-3">
                                        <Moon className="w-5 h-5 text-[var(--text-muted)]" />
                                        <div>
                                            <p className="font-medium">Dark Mode</p>
                                            <p className="text-sm text-[var(--text-muted)]">Use dark theme</p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => updateSetting('darkMode', !settings.darkMode)}
                                        className={`w-12 h-6 rounded-full transition-colors relative ${settings.darkMode ? 'bg-[var(--primary)]' : 'bg-gray-300'
                                            }`}
                                    >
                                        <motion.div
                                            layout
                                            className="absolute top-1 w-4 h-4 bg-white rounded-full shadow"
                                            style={{ left: settings.darkMode ? '1.5rem' : '0.25rem' }}
                                        />
                                    </button>
                                </div>

                                <div className="flex items-center justify-between p-4 bg-[var(--background-alt)] rounded-xl">
                                    <div className="flex items-center gap-3">
                                        <Globe className="w-5 h-5 text-[var(--text-muted)]" />
                                        <div>
                                            <p className="font-medium">Language</p>
                                            <p className="text-sm text-[var(--text-muted)]">Display language</p>
                                        </div>
                                    </div>
                                    <select
                                        value={settings.language}
                                        onChange={(e) => updateSetting('language', e.target.value)}
                                        className="input w-32"
                                    >
                                        <option value="en">English</option>
                                        <option value="es">Español</option>
                                        <option value="fr">Français</option>
                                        <option value="zh">中文</option>
                                    </select>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </main>
        </div>
    );
}
