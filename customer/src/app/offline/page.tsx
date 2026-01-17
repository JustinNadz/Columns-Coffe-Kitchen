'use client';

export default function OfflinePage() {
    return (
        <div className="min-h-screen bg-[var(--background-alt)] flex items-center justify-center p-4">
            <div className="text-center max-w-md">
                <div className="w-24 h-24 bg-[var(--primary)] rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg
                        className="w-12 h-12 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M18.364 5.636a9 9 0 010 12.728m0 0l-2.829-2.829m2.829 2.829L21 21M15.536 8.464a5 5 0 010 7.072m0 0l-2.829-2.829m-4.243 2.829a4.978 4.978 0 01-1.414-2.83m-1.414 5.658a9 9 0 01-2.167-9.238m7.824 2.167a1 1 0 111.414 1.414m-1.414-1.414L3 3"
                        />
                    </svg>
                </div>

                <h1 className="text-2xl font-bold mb-2">You're Offline</h1>
                <p className="text-[var(--text-muted)] mb-6">
                    It looks like you've lost your internet connection.
                    Don't worry, you can still browse your cached items!
                </p>

                <div className="space-y-3">
                    <button
                        onClick={() => window.location.reload()}
                        className="w-full btn btn-primary py-3"
                    >
                        Try Again
                    </button>

                    <a
                        href="/cart"
                        className="block w-full btn btn-outline py-3"
                    >
                        View Saved Cart
                    </a>
                </div>

                <p className="mt-8 text-sm text-[var(--text-muted)]">
                    Your orders will sync automatically when you're back online
                </p>
            </div>
        </div>
    );
}
