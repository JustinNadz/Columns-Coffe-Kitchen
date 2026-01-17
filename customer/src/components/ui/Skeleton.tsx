'use client';

import { motion } from 'framer-motion';

// Product Card Skeleton
export function ProductCardSkeleton() {
    return (
        <div className="card overflow-hidden animate-pulse">
            <div className="h-40 bg-gray-200" />
            <div className="p-4 space-y-2">
                <div className="h-4 bg-gray-200 rounded w-3/4" />
                <div className="h-3 bg-gray-200 rounded w-full" />
            </div>
        </div>
    );
}

// Product Grid Skeleton
export function ProductGridSkeleton({ count = 8 }: { count?: number }) {
    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.from({ length: count }).map((_, i) => (
                <ProductCardSkeleton key={i} />
            ))}
        </div>
    );
}

// Category Tab Skeleton
export function CategoryTabsSkeleton() {
    return (
        <div className="flex gap-2 overflow-x-auto animate-pulse">
            {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-10 w-24 bg-gray-200 rounded-full flex-shrink-0" />
            ))}
        </div>
    );
}

// Order Card Skeleton
export function OrderCardSkeleton() {
    return (
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden animate-pulse">
            <div className="p-4 border-b border-gray-100">
                <div className="flex justify-between mb-2">
                    <div className="h-5 w-20 bg-gray-200 rounded" />
                    <div className="h-5 w-16 bg-gray-200 rounded-full" />
                </div>
                <div className="flex gap-2">
                    <div className="h-4 w-16 bg-gray-200 rounded" />
                    <div className="h-4 w-20 bg-gray-200 rounded" />
                </div>
            </div>
            <div className="p-4 space-y-2">
                <div className="h-4 bg-gray-200 rounded w-full" />
                <div className="h-4 bg-gray-200 rounded w-3/4" />
            </div>
            <div className="p-4 bg-gray-50">
                <div className="h-10 bg-gray-200 rounded-lg" />
            </div>
        </div>
    );
}

// Dashboard Stats Skeleton
export function DashboardStatsSkeleton() {
    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-pulse">
            {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="bg-white rounded-xl p-4 border border-gray-100">
                    <div className="h-4 w-20 bg-gray-200 rounded mb-2" />
                    <div className="h-8 w-16 bg-gray-200 rounded" />
                </div>
            ))}
        </div>
    );
}

// Table Row Skeleton
export function TableRowSkeleton({ cols = 5 }: { cols?: number }) {
    return (
        <tr className="animate-pulse">
            {Array.from({ length: cols }).map((_, i) => (
                <td key={i} className="p-4">
                    <div className="h-4 bg-gray-200 rounded w-full" />
                </td>
            ))}
        </tr>
    );
}

// Shimmer effect component
export function Shimmer({ className = '' }: { className?: string }) {
    return (
        <motion.div
            className={`bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 ${className}`}
            animate={{
                backgroundPosition: ['200% 0', '-200% 0'],
            }}
            transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: 'linear',
            }}
            style={{ backgroundSize: '200% 100%' }}
        />
    );
}

// Page Loading Skeleton
export function PageLoadingSkeleton() {
    return (
        <div className="min-h-screen bg-[var(--background)] animate-pulse">
            <div className="h-32 bg-gray-200" />
            <div className="max-w-6xl mx-auto p-4 space-y-4">
                <div className="h-10 bg-gray-200 rounded-lg w-1/3" />
                <CategoryTabsSkeleton />
                <ProductGridSkeleton />
            </div>
        </div>
    );
}
