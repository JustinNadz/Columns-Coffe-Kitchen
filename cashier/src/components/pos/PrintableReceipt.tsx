'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';
import { Printer, X, Coffee, Leaf } from 'lucide-react';

interface ReceiptItem {
    name: string;
    quantity: number;
    price: number;
    notes?: string;
}

interface ReceiptData {
    orderNumber: number;
    items: ReceiptItem[];
    subtotal: number;
    tax: number;
    discount: number;
    total: number;
    type: 'dine-in' | 'takeout' | 'delivery';
    cashierName: string;
    tableNumber?: number;
    customerName?: string;
}

interface PrintableReceiptProps {
    isOpen: boolean;
    onClose: () => void;
    order: ReceiptData;
}

export default function PrintableReceipt({ isOpen, onClose, order }: PrintableReceiptProps) {
    const receiptRef = useRef<HTMLDivElement>(null);

    const handlePrint = () => {
        const printContent = receiptRef.current;
        if (!printContent) return;

        const printWindow = window.open('', '_blank');
        if (!printWindow) return;

        printWindow.document.write(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>Receipt #${order.orderNumber}</title>
                <style>
                    body {
                        font-family: 'Courier New', monospace;
                        padding: 20px;
                        max-width: 300px;
                        margin: 0 auto;
                    }
                    .header { text-align: center; margin-bottom: 20px; }
                    .header h1 { font-size: 18px; margin: 0; }
                    .header p { font-size: 12px; color: #666; margin: 5px 0; }
                    .divider { border-top: 1px dashed #000; margin: 10px 0; }
                    .item { display: flex; justify-content: space-between; font-size: 12px; margin: 5px 0; }
                    .item-name { flex: 1; }
                    .total-row { font-weight: bold; font-size: 14px; }
                    .footer { text-align: center; font-size: 10px; margin-top: 20px; color: #666; }
                    @media print {
                        body { padding: 0; }
                    }
                </style>
            </head>
            <body>
                ${printContent.innerHTML}
            </body>
            </html>
        `);
        printWindow.document.close();
        printWindow.print();
    };

    if (!isOpen) return null;

    const date = new Date();
    const formattedDate = date.toLocaleDateString('en-PH', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
    const formattedTime = date.toLocaleTimeString('en-PH', {
        hour: '2-digit',
        minute: '2-digit'
    });

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 bg-black/50"
                onClick={onClose}
            />
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative bg-white rounded-2xl shadow-2xl overflow-hidden max-w-sm w-full mx-4"
            >
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b">
                    <h2 className="font-semibold">Receipt Preview</h2>
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Receipt Content */}
                <div className="p-6 bg-gray-50">
                    <div ref={receiptRef} className="bg-white p-4 rounded-lg shadow-inner font-mono text-sm">
                        {/* Store Header */}
                        <div className="text-center mb-4">
                            <div className="flex items-center justify-center gap-1 mb-1">
                                <Coffee className="w-4 h-4" />
                                <span className="font-bold">COLUMNS COFFEE</span>
                            </div>
                            <p className="text-xs text-gray-500">+ Kitchen</p>
                            <div className="flex items-center justify-center gap-1 text-xs text-green-600">
                                <Leaf className="w-3 h-3" />
                                Plant-Based All The Way
                            </div>
                            <p className="text-xs text-gray-500 mt-1">2nd St. Guingona, Butuan City</p>
                            <p className="text-xs text-gray-500">Tel: 0917-XXX-XXXX</p>
                        </div>

                        <div className="border-t border-dashed border-gray-300 my-2" />

                        {/* Order Info */}
                        <div className="text-xs space-y-1">
                            <div className="flex justify-between">
                                <span>Order #:</span>
                                <span className="font-bold">{order.orderNumber}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Date:</span>
                                <span>{formattedDate}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Time:</span>
                                <span>{formattedTime}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Type:</span>
                                <span className="uppercase">{order.type}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Cashier:</span>
                                <span>{order.cashierName}</span>
                            </div>
                        </div>

                        <div className="border-t border-dashed border-gray-300 my-2" />

                        {/* Items */}
                        <div className="space-y-1">
                            {order.items.map((item, i) => (
                                <div key={i} className="text-xs">
                                    <div className="flex justify-between">
                                        <span>{item.quantity}x {item.name}</span>
                                        <span>₱{(item.price * item.quantity).toLocaleString()}</span>
                                    </div>
                                    {item.notes && (
                                        <p className="text-gray-500 text-[10px] ml-3">↳ {item.notes}</p>
                                    )}
                                </div>
                            ))}
                        </div>

                        <div className="border-t border-dashed border-gray-300 my-2" />

                        {/* Totals */}
                        <div className="text-xs space-y-1">
                            <div className="flex justify-between">
                                <span>Subtotal:</span>
                                <span>₱{order.subtotal.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>VAT (12%):</span>
                                <span>₱{order.tax.toLocaleString()}</span>
                            </div>
                            {order.discount > 0 && (
                                <div className="flex justify-between text-green-600">
                                    <span>Discount:</span>
                                    <span>-₱{order.discount.toLocaleString()}</span>
                                </div>
                            )}
                            <div className="flex justify-between font-bold text-base pt-1">
                                <span>TOTAL:</span>
                                <span>₱{order.total.toLocaleString()}</span>
                            </div>
                        </div>

                        <div className="border-t border-dashed border-gray-300 my-2" />

                        {/* Footer */}
                        <div className="text-center text-[10px] text-gray-500">
                            <p>Thank you for choosing Columns!</p>
                            <p>🌱 100% Plant-Based • Zero Cruelty</p>
                            <p className="mt-1">--- THIS IS YOUR OFFICIAL RECEIPT ---</p>
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div className="p-4 bg-white border-t flex gap-2">
                    <button onClick={onClose} className="flex-1 btn btn-outline">
                        Close
                    </button>
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handlePrint}
                        className="flex-1 btn btn-primary"
                    >
                        <Printer className="w-4 h-4" />
                        Print Receipt
                    </motion.button>
                </div>
            </motion.div>
        </div>
    );
}
