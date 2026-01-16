'use client';

import { TrendingUp, TrendingDown } from 'lucide-react';
import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
    icon: LucideIcon;
    iconBg: string;
    label: string;
    value: string;
    change?: number;
    changeLabel?: string;
}

export default function StatsCard({
    icon: Icon,
    iconBg,
    label,
    value,
    change,
    changeLabel
}: StatsCardProps) {
    const isPositive = change && change > 0;
    const isNegative = change && change < 0;

    return (
        <div className="card p-4">
            <div className="flex items-start gap-3">
                <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: iconBg }}
                >
                    <Icon className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                    <div className="flex items-center gap-2">
                        {change !== undefined && (
                            <span className={`flex items-center gap-0.5 text-xs font-medium ${isPositive ? 'text-[var(--success)]' : isNegative ? 'text-[var(--error)]' : 'text-[var(--text-muted)]'
                                }`}>
                                {isPositive ? <TrendingUp className="w-3 h-3" /> : isNegative ? <TrendingDown className="w-3 h-3" /> : null}
                                {isPositive ? '+' : ''}{change}%
                            </span>
                        )}
                    </div>
                    <p className="text-2xl font-bold mt-1">{value}</p>
                    <p className="text-xs text-[var(--text-muted)]">{label}</p>
                </div>
            </div>
        </div>
    );
}
