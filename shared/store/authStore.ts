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

// Mock users for demo
const mockUsers: Record<string, { password: string; pin?: string; user: User }> = {
    'admin@columns.com': {
        password: 'admin123',
        user: {
            id: '1',
            name: 'Admin User',
            email: 'admin@columns.com',
            role: 'admin',
            avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100',
        },
    },
    'cashier@columns.com': {
        password: 'cashier123',
        pin: '1234',
        user: {
            id: '2',
            name: 'Cassie M.',
            email: 'cashier@columns.com',
            role: 'cashier',
            avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100',
        },
    },
    'customer@example.com': {
        password: 'customer123',
        user: {
            id: '3',
            name: 'John Doe',
            email: 'customer@example.com',
            role: 'customer',
        },
    },
};

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

                // Simulate API call
                await new Promise(resolve => setTimeout(resolve, 1000));

                const userEntry = mockUsers[email.toLowerCase()];

                if (userEntry && userEntry.password === password) {
                    // Check role if specified
                    if (role && userEntry.user.role !== role) {
                        set({ isLoading: false });
                        return false;
                    }

                    const expiry = Date.now() + SESSION_DURATION;
                    set({
                        user: userEntry.user,
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

                // Find cashier with matching PIN
                const cashier = Object.values(mockUsers).find(
                    u => u.pin === pin && u.user.role === 'cashier'
                );

                if (cashier) {
                    const expiry = Date.now() + SESSION_DURATION;
                    set({
                        user: cashier.user,
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
