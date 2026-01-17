'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wifi, WifiOff, RefreshCw } from 'lucide-react';

export default function NetworkStatus() {
    const [isOnline, setIsOnline] = useState(true);
    const [showBanner, setShowBanner] = useState(false);
    const [pendingSync, setPendingSync] = useState(0);

    useEffect(() => {
        // Set initial state
        setIsOnline(navigator.onLine);

        const handleOnline = () => {
            setIsOnline(true);
            setShowBanner(true);
            setTimeout(() => setShowBanner(false), 3000);

            // Trigger background sync (experimental API)
            if ('serviceWorker' in navigator) {
                navigator.serviceWorker.ready.then((registration) => {
                    // Background Sync API (experimental)
                    const reg = registration as ServiceWorkerRegistration & {
                        sync?: { register: (tag: string) => Promise<void> }
                    };
                    if (reg.sync) {
                        reg.sync.register('sync-orders');
                    }
                });
            }
        };

        const handleOffline = () => {
            setIsOnline(false);
            setShowBanner(true);
        };

        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        // Check pending orders
        const checkPending = async () => {
            try {
                const pending = localStorage.getItem('pendingOrders');
                if (pending) {
                    setPendingSync(JSON.parse(pending).length);
                }
            } catch {
                // Ignore
            }
        };
        checkPending();

        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, []);

    if (!showBanner && isOnline) return null;

    return (
        <AnimatePresence>
            {showBanner && (
                <motion.div
                    initial={{ y: -100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -100, opacity: 0 }}
                    className={`fixed top-0 left-0 right-0 z-[200] p-3 flex items-center justify-center gap-3 ${isOnline ? 'bg-green-500' : 'bg-red-500'
                        } text-white text-sm font-medium`}
                >
                    {isOnline ? (
                        <>
                            <Wifi className="w-4 h-4" />
                            Back online
                            {pendingSync > 0 && (
                                <span className="flex items-center gap-1">
                                    <RefreshCw className="w-4 h-4 animate-spin" />
                                    Syncing {pendingSync} orders...
                                </span>
                            )}
                        </>
                    ) : (
                        <>
                            <WifiOff className="w-4 h-4" />
                            You're offline. Some features may be limited.
                        </>
                    )}
                    <button
                        onClick={() => setShowBanner(false)}
                        className="ml-4 p-1 hover:bg-white/20 rounded"
                    >
                        ✕
                    </button>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

// Install Prompt Component
export function InstallPrompt() {
    const [showPrompt, setShowPrompt] = useState(false);
    const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);

    interface BeforeInstallPromptEvent extends Event {
        prompt: () => Promise<void>;
        userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
    }

    useEffect(() => {
        const handler = (e: Event) => {
            e.preventDefault();
            setDeferredPrompt(e as BeforeInstallPromptEvent);

            // Show prompt after 30 seconds
            setTimeout(() => setShowPrompt(true), 30000);
        };

        window.addEventListener('beforeinstallprompt', handler);

        return () => window.removeEventListener('beforeinstallprompt', handler);
    }, []);

    const handleInstall = async () => {
        if (!deferredPrompt) return;

        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;

        if (outcome === 'accepted') {
            setDeferredPrompt(null);
        }
        setShowPrompt(false);
    };

    if (!showPrompt || !deferredPrompt) return null;

    return (
        <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-80 bg-white rounded-2xl shadow-2xl p-4 z-50 border border-[var(--border)]"
        >
            <div className="flex items-start gap-3">
                <div className="w-12 h-12 bg-[var(--primary)] rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">☕</span>
                </div>
                <div className="flex-1">
                    <h4 className="font-semibold">Install App</h4>
                    <p className="text-sm text-[var(--text-muted)]">
                        Add Columns Coffee to your home screen for quick access!
                    </p>
                </div>
            </div>
            <div className="flex gap-2 mt-4">
                <button
                    onClick={() => setShowPrompt(false)}
                    className="flex-1 btn btn-outline text-sm"
                >
                    Not now
                </button>
                <button
                    onClick={handleInstall}
                    className="flex-1 btn btn-primary text-sm"
                >
                    Install
                </button>
            </div>
        </motion.div>
    );
}
