import { create } from 'zustand';

interface OrderItem {
    productId: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
    notes?: string;
    addons?: { name: string; price: number }[];
}

interface POSState {
    orderNumber: number;
    orderType: 'dine-in' | 'takeout' | 'delivery';
    customerName: string;
    items: OrderItem[];
    discount: number;

    // Actions
    setOrderType: (type: 'dine-in' | 'takeout' | 'delivery') => void;
    setCustomerName: (name: string) => void;
    addItem: (item: Omit<OrderItem, 'quantity'>) => void;
    removeItem: (productId: string) => void;
    updateQuantity: (productId: string, quantity: number) => void;
    updateNotes: (productId: string, notes: string) => void;
    setDiscount: (amount: number) => void;
    clearOrder: () => void;
    getSubtotal: () => number;
    getTax: () => number;
    getTotal: () => number;
    checkout: () => void;
}

const TAX_RATE = 0.12; // 12% VAT (Philippines)

export const usePOSStore = create<POSState>((set, get) => ({
    orderNumber: 2045,
    orderType: 'dine-in',
    customerName: '',
    items: [],
    discount: 0,

    setOrderType: (type) => set({ orderType: type }),

    setCustomerName: (name) => set({ customerName: name }),

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

    updateNotes: (productId, notes) => {
        set((state) => ({
            items: state.items.map((i) =>
                i.productId === productId ? { ...i, notes } : i
            ),
        }));
    },

    setDiscount: (amount) => set({ discount: amount }),

    clearOrder: () => {
        set((state) => ({
            items: [],
            discount: 0,
            customerName: '',
            orderNumber: state.orderNumber + 1,
        }));
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
        return get().getSubtotal() + get().getTax() - get().discount;
    },

    checkout: () => {
        // Simulate checkout
        console.log('Order processed:', {
            orderNumber: get().orderNumber,
            items: get().items,
            total: get().getTotal(),
        });
        get().clearOrder();
    },
}));
