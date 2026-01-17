'use client';

import { motion } from 'framer-motion';

interface SkeletonProps {
    className?: string;
    style?: React.CSSProperties;
}

export function Skeleton({ className = '', style }: SkeletonProps) {
    return (
        <motion.div
            className={`bg-gray-200 rounded-lg ${className}`}
            style={style}
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        />
    );
}

export function ProductCardSkeleton() {
    return (
        <div className="card overflow-hidden">
            <Skeleton className="h-40 w-full rounded-none" />
            <div className="p-4 space-y-3">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-10 w-full rounded-full" />
            </div>
        </div>
    );
}

export function CategoryCardSkeleton() {
    return (
        <Skeleton className="aspect-square rounded-2xl" />
    );
}

export function OrderItemSkeleton() {
    return (
        <div className="flex gap-3 p-4">
            <Skeleton className="w-12 h-12 rounded-lg flex-shrink-0" />
            <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
            </div>
        </div>
    );
}

export function StatsCardSkeleton() {
    return (
        <div className="card p-4">
            <div className="flex items-start gap-3">
                <Skeleton className="w-10 h-10 rounded-lg" />
                <div className="flex-1 space-y-2">
                    <Skeleton className="h-3 w-16" />
                    <Skeleton className="h-6 w-24" />
                    <Skeleton className="h-3 w-20" />
                </div>
            </div>
        </div>
    );
}

export function TableRowSkeleton() {
    return (
        <div className="flex items-center gap-4 py-3">
            <Skeleton className="w-8 h-8 rounded-full" />
            <Skeleton className="h-4 flex-1" />
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-20" />
        </div>
    );
}

export function ChartSkeleton() {
    return (
        <div className="h-64 flex items-end gap-2 p-4">
            {[40, 65, 45, 80, 55, 70, 60, 75, 50, 85, 65, 70].map((height, i) => (
                <Skeleton
                    key={i}
                    className="flex-1 rounded-t"
                    style={{ height: `${height}%` }}
                />
            ))}
        </div>
    );
}
