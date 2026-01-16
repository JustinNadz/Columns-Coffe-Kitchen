'use client';

import { AlertTriangle, AlertCircle, XCircle } from 'lucide-react';

interface InventoryAlertProps {
    productName: string;
    productImage: string;
    currentStock: number;
    minimumStock: number;
    alertType: 'low' | 'critical' | 'out';
}

export default function InventoryAlert({
    productName,
    productImage,
    currentStock,
    minimumStock,
    alertType
}: InventoryAlertProps) {
    const getAlertConfig = () => {
        switch (alertType) {
            case 'critical':
                return {
                    icon: AlertCircle,
                    color: 'text-[var(--error)]',
                    bg: 'bg-red-50',
                    label: `${currentStock} units left`,
                };
            case 'out':
                return {
                    icon: XCircle,
                    color: 'text-[var(--error)]',
                    bg: 'bg-red-50',
                    label: 'Out of stock',
                };
            default:
                return {
                    icon: AlertTriangle,
                    color: 'text-[var(--warning)]',
                    bg: 'bg-yellow-50',
                    label: `${currentStock} items left`,
                };
        }
    };

    const config = getAlertConfig();
    const Icon = config.icon;

    return (
        <div className="flex items-center gap-3 py-2">
            <div
                className="w-10 h-10 rounded-lg bg-cover bg-center flex-shrink-0"
                style={{
                    backgroundImage: `url(${productImage})`,
                    backgroundColor: '#F0EBE5'
                }}
            />
            <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{productName}</p>
                <p className={`text-xs flex items-center gap-1 ${config.color}`}>
                    <Icon className="w-3 h-3" />
                    {config.label}
                </p>
            </div>
        </div>
    );
}
