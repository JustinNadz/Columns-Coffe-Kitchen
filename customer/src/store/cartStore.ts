import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CartItem {
    productId: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
    notes?: string;
    addons?: { name: string; price: number }[];
}

interface CartState {
    items: CartItem[];
    addItem: (item: Omit<CartItem, 'quantity'>) => void;
    removeItem: (productId: string) => void;
    updateQuantity: (productId: string, quantity: number) => void;
    clearCart: () => void;
    getSubtotal: () => number;
    getTax: () => number;
    getTotal: () => number;
}

const TAX_RATE = 0.12; // 12% VAT (Philippines)

export const useCartStore = create<CartState>()(
    persist(
        (set, get) => ({
            items: [],

            addItem: (item) => {
                set((state) => {
                    const existingItem = state.items.find((i) => i.productId === item.productId);

                    if (existingItem) {
                        return {
                            items: state.items.map((i) =>
                                i.productId === item.productId
                                    ? { ...i, quantity: i.quantity + 1 }
                                    : i
                            ),
                        };
                    }

                    return {
                        items: [...state.items, { ...item, quantity: 1 }],
                    };
                });
            },

            removeItem: (productId) => {
                set((state) => ({
                    items: state.items.filter((i) => i.productId !== productId),
                }));
            },

            updateQuantity: (productId, quantity) => {
                if (quantity <= 0) {
                    get().removeItem(productId);
                    return;
                }

                set((state) => ({
                    items: state.items.map((i) =>
                        i.productId === productId ? { ...i, quantity } : i
                    ),
                }));
            },

            clearCart: () => {
                set({ items: [] });
            },

            getSubtotal: () => {
                const { items } = get();
                return items.reduce((acc, item) => {
                    const addonTotal = item.addons?.reduce((a, addon) => a + addon.price, 0) || 0;
                    return acc + (item.price + addonTotal) * item.quantity;
                }, 0);
            },

            getTax: () => {
                return get().getSubtotal() * TAX_RATE;
            },

            getTotal: () => {
                return get().getSubtotal() + get().getTax();
            },
        }),
        {
            name: 'cart-storage',
        }
    )
);
