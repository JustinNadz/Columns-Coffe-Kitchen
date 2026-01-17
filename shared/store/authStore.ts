import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Role = 'customer' | 'cashier' | 'admin';

interface User {
    id: string;
    name: string;
    email: string;
    role: Role;
    avatar?: string;
}

interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    sessionExpiry: number | null;

    login: (email: string, password: string, role?: Role) => Promise<boolean>;
    loginWithPin: (pin: string) => Promise<boolean>;
    logout: () => void;
    checkSession: () => boolean;
}

// Demo mode - In production, this would be replaced with API calls
// These are NOT real credentials - just for demo/development purposes
const getDemoUsers = (): Record<string, { passwordHash: string; pin?: string; user: User }> => ({
    'demo-admin': {
        passwordHash: 'demo', // In production: use proper hashing
        user: {
            id: '1',
            name: 'Demo Admin',
            email: 'admin@demo.local',
            role: 'admin',
            avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100',
        },
    },
    'demo-cashier': {
        passwordHash: 'demo',
        pin: '0000', // Demo PIN only
        user: {
            id: '2',
            name: 'Demo Cashier',
            email: 'cashier@demo.local',
            role: 'cashier',
            avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100',
        },
    },
    'demo-customer': {
        passwordHash: 'demo',
        user: {
            id: '3',
            name: 'Demo Customer',
            email: 'customer@demo.local',
            role: 'customer',
        },
    },
});

const SESSION_DURATION = 8 * 60 * 60 * 1000; // 8 hours

export const useAuthStore = create<AuthState>()(
    persist(
        (set, get) => ({
            user: null,
            isAuthenticated: false,
            isLoading: false,
            sessionExpiry: null,

            login: async (email: string, password: string, role?: Role) => {
                set({ isLoading: true });

                // Simulate API call delay
                await new Promise(resolve => setTimeout(resolve, 1000));

                // In production: Replace with actual API authentication
                // This is a demo-only implementation
                const demoUsers = getDemoUsers();

                // Demo login: any email with password "demo" works
                if (password === 'demo') {
                    const demoRole = role || 'customer';
                    const demoUser: User = {
                        id: Date.now().toString(),
                        name: email.split('@')[0] || 'Demo User',
                        email: email,
                        role: demoRole,
                    };

                    const expiry = Date.now() + SESSION_DURATION;
                    set({
                        user: demoUser,
                        isAuthenticated: true,
                        isLoading: false,
                        sessionExpiry: expiry,
                    });
                    return true;
                }

                set({ isLoading: false });
                return false;
            },

            loginWithPin: async (pin: string) => {
                set({ isLoading: true });

                await new Promise(resolve => setTimeout(resolve, 500));

                // Demo PIN login: PIN "0000" works for demo
                if (pin === '0000') {
                    const expiry = Date.now() + SESSION_DURATION;
                    set({
                        user: {
                            id: '2',
                            name: 'Demo Cashier',
                            email: 'cashier@demo.local',
                            role: 'cashier',
                        },
                        isAuthenticated: true,
                        isLoading: false,
                        sessionExpiry: expiry,
                    });
                    return true;
                }

                set({ isLoading: false });
                return false;
            },

            logout: () => {
                set({
                    user: null,
                    isAuthenticated: false,
                    sessionExpiry: null,
                });
            },

            checkSession: () => {
                const { sessionExpiry } = get();
                if (!sessionExpiry) return false;

                if (Date.now() > sessionExpiry) {
                    get().logout();
                    return false;
                }

                return true;
            },
        }),
        {
            name: 'auth-storage',
        }
    )
);
