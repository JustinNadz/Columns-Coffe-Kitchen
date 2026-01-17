'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Printer, Mail, Download, CheckCircle } from 'lucide-react';

interface ReceiptModalProps {
    isOpen: boolean;
    onClose: () => void;
    order: {
        orderNumber: number;
        items: { name: string; quantity: number; price: number; notes?: string }[];
        subtotal: number;
        tax: number;
        discount: number;
        total: number;
        type: string;
        cashierName: string;
    };
}

export default function ReceiptModal({ isOpen, onClose, order }: ReceiptModalProps) {
    const [isPrinting, setIsPrinting] = useState(false);
    const [printed, setPrinted] = useState(false);

    const handlePrint = () => {
        setIsPrinting(true);
        // Simulate print
        setTimeout(() => {
            setIsPrinting(false);
            setPrinted(true);
            window.print();
        }, 1000);
    };

    const currentDate = new Date().toLocaleString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
    });

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-sm z-50 p-4"
                    >
                        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
                            {/* Header */}
                            <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--border)]">
                                <h2 className="text-lg font-semibold">Receipt</h2>
                                <button
                                    onClick={onClose}
                                    className="p-2 rounded-lg hover:bg-[var(--background-alt)] transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            {/* Receipt Preview */}
                            <div className="p-6">
                                <div id="receipt-content" className="bg-white p-4 border border-dashed border-[var(--border)] rounded-xl font-mono text-xs">
                                    {/* Store Header */}
                                    <div className="text-center mb-4">
                                        <p className="font-bold text-sm">COLUMNS COFFEE + KITCHEN</p>
                                        <p className="text-[var(--text-muted)]">123 Main Street</p>
                                        <p className="text-[var(--text-muted)]">Tel: (555) 123-4567</p>
                                    </div>

                                    <div className="border-t border-dashed border-[var(--border)] my-3" />

                                    {/* Order Info */}
                                    <div className="mb-3">
                                        <div className="flex justify-between">
                                            <span>Order #:</span>
                                            <span className="font-bold">{order.orderNumber}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>Date:</span>
                                            <span>{currentDate}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>Type:</span>
                                            <span className="capitalize">{order.type}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>Cashier:</span>
                                            <span>{order.cashierName}</span>
                                        </div>
                                    </div>

                                    <div className="border-t border-dashed border-[var(--border)] my-3" />

                                    {/* Items */}
                                    <div className="space-y-2 mb-3">
                                        {order.items.map((item, index) => (
                                            <div key={index}>
                                                <div className="flex justify-between">
                                                    <span>{item.quantity}x {item.name}</span>
                                                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                                                </div>
                                                {item.notes && (
                                                    <p className="text-[var(--text-muted)] pl-4">→ {item.notes}</p>
                                                )}
                                            </div>
                                        ))}
                                    </div>

                                    <div className="border-t border-dashed border-[var(--border)] my-3" />

                                    {/* Totals */}
                                    <div className="space-y-1">
                                        <div className="flex justify-between">
                                            <span>Subtotal:</span>
                                            <span>${order.subtotal.toFixed(2)}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>Tax (8%):</span>
                                            <span>${order.tax.toFixed(2)}</span>
                                        </div>
                                        {order.discount > 0 && (
                                            <div className="flex justify-between text-[var(--primary)]">
                                                <span>Discount:</span>
                                                <span>-${order.discount.toFixed(2)}</span>
                                            </div>
                                        )}
                                        <div className="flex justify-between font-bold text-sm pt-1 border-t border-[var(--border)]">
                                            <span>TOTAL:</span>
                                            <span>${order.total.toFixed(2)}</span>
                                        </div>
                                    </div>

                                    <div className="border-t border-dashed border-[var(--border)] my-3" />

                                    {/* Footer */}
                                    <div className="text-center text-[var(--text-muted)]">
                                        <p>Thank you for your order!</p>
                                        <p>See you again soon ☕</p>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="flex gap-2 mt-4">
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={handlePrint}
                                        disabled={isPrinting}
                                        className="flex-1 btn btn-primary"
                                    >
                                        {isPrinting ? (
                                            <motion.div
                                                animate={{ rotate: 360 }}
                                                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                                            >
                                                <Printer className="w-4 h-4" />
                                            </motion.div>
                                        ) : printed ? (
                                            <>
                                                <CheckCircle className="w-4 h-4" />
                                                Printed
                                            </>
                                        ) : (
                                            <>
                                                <Printer className="w-4 h-4" />
                                                Print
                                            </>
                                        )}
                                    </motion.button>
                                    <button className="btn btn-outline">
                                        <Mail className="w-4 h-4" />
                                        Email
                                    </button>
                                    <button className="btn btn-outline">
                                        <Download className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
