'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

interface LazyImageProps {
    src: string;
    alt: string;
    className?: string;
    blurHash?: string;
}

export default function LazyImage({ src, alt, className = '' }: LazyImageProps) {
    const [isLoaded, setIsLoaded] = useState(false);
    const [isInView, setIsInView] = useState(false);
    const imgRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsInView(true);
                    observer.disconnect();
                }
            },
            { rootMargin: '100px' }
        );

        if (imgRef.current) {
            observer.observe(imgRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <div ref={imgRef} className={`relative overflow-hidden ${className}`}>
            {/* Placeholder */}
            <motion.div
                className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300"
                initial={{ opacity: 1 }}
                animate={{ opacity: isLoaded ? 0 : 1 }}
                transition={{ duration: 0.3 }}
            >
                {/* Shimmer effect */}
                <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                    animate={{ x: ['-100%', '100%'] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                />
            </motion.div>

            {/* Actual Image */}
            {isInView && (
                <motion.img
                    src={src}
                    alt={alt}
                    className={`w-full h-full object-cover ${className}`}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{
                        opacity: isLoaded ? 1 : 0,
                        scale: isLoaded ? 1 : 1.1
                    }}
                    transition={{ duration: 0.4 }}
                    onLoad={() => setIsLoaded(true)}
                />
            )}
        </div>
    );
}

// Simple blur image with low-res placeholder
export function BlurImage({ src, alt, className = '' }: LazyImageProps) {
    const [isLoaded, setIsLoaded] = useState(false);

    return (
        <div className={`relative overflow-hidden ${className}`}>
            {/* Blur placeholder */}
            <div
                className={`absolute inset-0 bg-gray-200 transition-opacity duration-500 ${isLoaded ? 'opacity-0' : 'opacity-100'}`}
                style={{ filter: 'blur(20px)', transform: 'scale(1.1)' }}
            />

            <img
                src={src}
                alt={alt}
                className={`w-full h-full object-cover transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
                onLoad={() => setIsLoaded(true)}
                loading="lazy"
            />
        </div>
    );
}
