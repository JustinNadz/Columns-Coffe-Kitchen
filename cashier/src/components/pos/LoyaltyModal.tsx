'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Star,
    Gift,
    Award,
    ChevronRight,
    X,
    Crown,
    Sparkles,
    Coffee
} from 'lucide-react';

interface LoyaltyModalProps {
    isOpen: boolean;
    onClose: () => void;
    onRedeem: (points: number, reward: string) => void;
    customerPoints: number;
    orderTotal: number;
}

const tiers = [
    { name: 'Bronze', minPoints: 0, color: '#CD7F32', discount: 0 },
    { name: 'Silver', minPoints: 500, color: '#C0C0C0', discount: 5 },
    { name: 'Gold', minPoints: 1000, color: '#FFD700', discount: 10 },
    { name: 'Platinum', minPoints: 2500, color: '#E5E4E2', discount: 15 },
];

const rewards = [
    { id: '1', name: 'Free Coffee', points: 100, icon: Coffee },
    { id: '2', name: '₱5 Off', points: 200, icon: Gift },
    { id: '3', name: 'Free Pastry', points: 150, icon: Sparkles },
    { id: '4', name: '₱10 Off', points: 350, icon: Gift },
    { id: '5', name: 'Free Meal', points: 500, icon: Award },
];

export default function LoyaltyModal({
    isOpen,
    onClose,
    onRedeem,
    customerPoints = 750,
    orderTotal
}: LoyaltyModalProps) {
    const [selectedReward, setSelectedReward] = useState<string | null>(null);

    const currentTier = [...tiers].reverse().find(t => customerPoints >= t.minPoints) || tiers[0];
    const nextTier = tiers.find(t => t.minPoints > customerPoints);
    const pointsToNext = nextTier ? nextTier.minPoints - customerPoints : 0;
    const earnablePoints = Math.floor(orderTotal);

    const handleRedeem = () => {
        const reward = rewards.find(r => r.id === selectedReward);
        if (reward && customerPoints >= reward.points) {
            onRedeem(reward.points, reward.name);
            onClose();
        }
    };

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
                        className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md z-50 p-4"
                    >
                        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
                            {/* Header with Tier */}
                            <div
                                className="px-6 py-6 text-white relative overflow-hidden"
                                style={{ background: `linear-gradient(135deg, ${currentTier.color}, ${currentTier.color}99)` }}
                            >
                                <button
                                    onClick={onClose}
                                    className="absolute top-4 right-4 p-2 rounded-lg bg-white/20 hover:bg-white/30"
                                >
                                    <X className="w-5 h-5" />
                                </button>

                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                                        <Crown className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="text-white/80 text-sm">Current Tier</p>
                                        <h2 className="text-xl font-bold">{currentTier.name} Member</h2>
                                    </div>
                                </div>

                                <div className="flex items-baseline gap-2">
                                    <span className="text-4xl font-bold">{customerPoints}</span>
                                    <span className="text-white/80">points</span>
                                </div>

                                {nextTier && (
                                    <div className="mt-4">
                                        <div className="flex justify-between text-sm mb-1">
                                            <span className="text-white/80">{pointsToNext} points to {nextTier.name}</span>
                                        </div>
                                        <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: `${((customerPoints - currentTier.minPoints) / (nextTier.minPoints - currentTier.minPoints)) * 100}%` }}
                                                className="h-full bg-white rounded-full"
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="p-6">
                                {/* Points to Earn */}
                                <div className="mb-6 p-4 bg-green-50 rounded-xl flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-green-600">Points from this order</p>
                                        <p className="text-2xl font-bold text-green-700">+{earnablePoints}</p>
                                    </div>
                                    <Star className="w-8 h-8 text-green-500" />
                                </div>

                                {/* Available Rewards */}
                                <h3 className="font-semibold mb-3">Redeem Rewards</h3>
                                <div className="space-y-2 max-h-48 overflow-auto">
                                    {rewards.map((reward) => {
                                        const canRedeem = customerPoints >= reward.points;
                                        const Icon = reward.icon;

                                        return (
                                            <button
                                                key={reward.id}
                                                onClick={() => canRedeem && setSelectedReward(reward.id)}
                                                disabled={!canRedeem}
                                                className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all ${selectedReward === reward.id
                                                    ? 'bg-[var(--primary)] text-white'
                                                    : canRedeem
                                                        ? 'bg-[var(--background-alt)] hover:bg-[var(--border)]'
                                                        : 'bg-gray-100 opacity-50 cursor-not-allowed'
                                                    }`}
                                            >
                                                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${selectedReward === reward.id ? 'bg-white/20' : 'bg-white'
                                                    }`}>
                                                    <Icon className={`w-5 h-5 ${selectedReward === reward.id ? 'text-white' : 'text-[var(--primary)]'}`} />
                                                </div>
                                                <div className="flex-1 text-left">
                                                    <p className="font-medium">{reward.name}</p>
                                                    <p className={`text-xs ${selectedReward === reward.id ? 'text-white/80' : 'text-[var(--text-muted)]'}`}>
                                                        {reward.points} points
                                                    </p>
                                                </div>
                                                {canRedeem && <ChevronRight className="w-4 h-4" />}
                                            </button>
                                        );
                                    })}
                                </div>

                                {/* Actions */}
                                <div className="flex gap-3 mt-6">
                                    <button onClick={onClose} className="flex-1 btn btn-outline">
                                        Skip
                                    </button>
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={handleRedeem}
                                        disabled={!selectedReward}
                                        className="flex-1 btn btn-primary disabled:opacity-50"
                                    >
                                        Redeem
                                    </motion.button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
