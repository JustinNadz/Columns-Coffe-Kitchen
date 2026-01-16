'use client';

import Image from 'next/image';
import { Repeat } from 'lucide-react';

interface QuickOrderCardProps {
    id: string;
    name: string;
    description: string;
    image: string;
    onReorder: () => void;
}

export default function QuickOrderCard({
    id,
    name,
    description,
    image,
    onReorder
}: QuickOrderCardProps) {
    return (
        <div className="card overflow-hidden">
            <div className="relative h-40 bg-[var(--background-alt)]">
                <div
                    className="w-full h-full bg-cover bg-center"
                    style={{
                        backgroundImage: `url(${image})`,
                        backgroundColor: '#F0EBE5'
                    }}
                />
            </div>
            <div className="p-4">
                <h3 className="font-semibold text-sm mb-1">{name}</h3>
                <p className="text-xs text-[var(--text-muted)] mb-3 line-clamp-2">
                    {description}
                </p>
                <button
                    onClick={onReorder}
                    className="w-full btn btn-outline text-xs py-2"
                >
                    <Repeat className="w-3.5 h-3.5" />
                    Reorder
                </button>
            </div>
        </div>
    );
}
