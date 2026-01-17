'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ConfettiPiece {
    id: number;
    x: number;
    delay: number;
    color: string;
    size: number;
    rotation: number;
}

interface ConfettiProps {
    isActive: boolean;
    duration?: number;
    onComplete?: () => void;
}

const colors = ['#5C8D4D', '#D97706', '#EC4899', '#3B82F6', '#10B981', '#F59E0B', '#8B5CF6'];

export default function Confetti({ isActive, duration = 3000, onComplete }: ConfettiProps) {
    const [pieces, setPieces] = useState<ConfettiPiece[]>([]);

    useEffect(() => {
        if (isActive) {
            // Generate confetti pieces
            const newPieces: ConfettiPiece[] = Array.from({ length: 50 }, (_, i) => ({
                id: i,
                x: Math.random() * 100,
                delay: Math.random() * 0.5,
                color: colors[Math.floor(Math.random() * colors.length)],
                size: Math.random() * 10 + 5,
                rotation: Math.random() * 360,
            }));
            setPieces(newPieces);

            // Clear after duration
            const timer = setTimeout(() => {
                setPieces([]);
                onComplete?.();
            }, duration);

            return () => clearTimeout(timer);
        }
    }, [isActive, duration, onComplete]);

    return (
        <AnimatePresence>
            {pieces.length > 0 && (
                <div className="fixed inset-0 pointer-events-none z-[1000] overflow-hidden">
                    {pieces.map((piece) => (
                        <motion.div
                            key={piece.id}
                            initial={{
                                x: `${piece.x}vw`,
                                y: -20,
                                rotate: 0,
                                opacity: 1,
                            }}
                            animate={{
                                y: '110vh',
                                rotate: piece.rotation + 720,
                                opacity: [1, 1, 0],
                            }}
                            exit={{ opacity: 0 }}
                            transition={{
                                duration: 2.5 + Math.random(),
                                delay: piece.delay,
                                ease: 'easeOut',
                            }}
                            style={{
                                position: 'absolute',
                                width: piece.size,
                                height: piece.size,
                                backgroundColor: piece.color,
                                borderRadius: Math.random() > 0.5 ? '50%' : '2px',
                            }}
                        />
                    ))}

                    {/* Celebration emoji burst */}
                    <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: [0, 1.5, 1], opacity: [0, 1, 1] }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 text-6xl"
                    >
                        🎉
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}

// Success checkmark animation
export function SuccessCheckmark() {
    return (
        <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 10 }}
            className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto"
        >
            <motion.svg
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="w-10 h-10 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={3}
            >
                <motion.path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                />
            </motion.svg>
        </motion.div>
    );
}
