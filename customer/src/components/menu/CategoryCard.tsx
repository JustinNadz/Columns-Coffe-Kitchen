'use client';

import Image from 'next/image';
import Link from 'next/link';

interface CategoryCardProps {
    id: string;
    name: string;
    image: string;
    slug: string;
}

export default function CategoryCard({ id, name, image, slug }: CategoryCardProps) {
    return (
        <Link
            href={`/menu?category=${slug}`}
            className="group relative overflow-hidden rounded-2xl aspect-square card card-hover"
        >
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent z-10" />
            <div className="w-full h-full bg-[var(--background-alt)] relative">
                <div
                    className="w-full h-full bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
                    style={{
                        backgroundImage: `url(${image})`,
                        backgroundColor: '#E8DDD4'
                    }}
                />
            </div>
            <div className="absolute bottom-4 left-4 z-20">
                <h3 className="text-white font-semibold text-sm">{name}</h3>
            </div>
        </Link>
    );
}
