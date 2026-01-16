import { Order } from '../types';

export const orders: Order[] = [
    {
        id: '1',
        orderNumber: 2045,
        items: [
            {
                productId: '1',
                name: 'Avocado Toast',
                price: 12.00,
                quantity: 1,
                image: '/images/products/avocado-toast.jpg',
                addons: [{ name: 'Fried Egg', price: 2.00 }],
                notes: 'No Chili Flakes',
            },
            {
                productId: '7',
                name: 'Oat Latte',
                price: 5.50,
                quantity: 2,
                image: '/images/products/oat-latte.jpg',
                notes: 'Double Shot',
            },
            {
                productId: '2',
                name: 'Croissant',
                price: 4.00,
                quantity: 1,
                image: '/images/products/croissant.jpg',
            },
        ],
        subtotal: 29.00,
        tax: 2.32,
        discount: 0,
        total: 31.32,
        status: 'pending',
        type: 'dine-in',
        createdAt: new Date(),
        cashierId: 'cashier-1',
        customerName: 'Cassie M.',
    },
    {
        id: '2',
        orderNumber: 2044,
        items: [
            {
                productId: '4',
                name: 'The Classic Stack',
                price: 14.00,
                quantity: 2,
                image: '/images/products/burger.jpg',
            },
            {
                productId: '13',
                name: 'Sweet Potato Fries',
                price: 5.00,
                quantity: 2,
                image: '/images/products/sweet-fries.jpg',
            },
        ],
        subtotal: 38.00,
        tax: 3.04,
        discount: 0,
        total: 41.04,
        status: 'preparing',
        type: 'takeout',
        createdAt: new Date(Date.now() - 1000 * 60 * 15),
        cashierId: 'cashier-1',
    },
    {
        id: '3',
        orderNumber: 2043,
        items: [
            {
                productId: '10',
                name: 'Iced Matcha',
                price: 6.00,
                quantity: 1,
                image: '/images/products/iced-matcha.jpg',
            },
        ],
        subtotal: 6.00,
        tax: 0.48,
        discount: 0,
        total: 6.48,
        status: 'completed',
        type: 'takeout',
        createdAt: new Date(Date.now() - 1000 * 60 * 30),
        cashierId: 'cashier-2',
    },
];

export const getOrderById = (id: string): Order | undefined => {
    return orders.find((o) => o.id === id);
};

export const getOrdersByStatus = (status: Order['status']): Order[] => {
    return orders.filter((o) => o.status === status);
};
