import { StaffMember, InventoryAlert } from '../types';

export interface DashboardStats {
    dailyRevenue: number;
    revenueChange: number;
    totalOrders: number;
    ordersChange: number;
    activeStaff: number;
    totalStaff: number;
    lowStockAlerts: number;
}

export const dashboardStats: DashboardStats = {
    dailyRevenue: 2450.00,
    revenueChange: 12.5,
    totalOrders: 142,
    ordersChange: 5,
    activeStaff: 8,
    totalStaff: 12,
    lowStockAlerts: 2,
};

export const revenueData = [
    { time: '6AM', revenue: 120 },
    { time: '7AM', revenue: 280 },
    { time: '8AM', revenue: 450 },
    { time: '9AM', revenue: 520 },
    { time: '10AM', revenue: 380 },
    { time: '11AM', revenue: 420 },
    { time: '12PM', revenue: 580 },
    { time: '1PM', revenue: 650 },
    { time: '2PM', revenue: 480 },
    { time: '3PM', revenue: 320 },
    { time: '4PM', revenue: 290 },
    { time: '5PM', revenue: 380 },
];

export const topSellingItems = [
    { rank: 1, name: 'Oat Flat White', category: 'Coffee', qtySold: 84, revenue: 378.00 },
    { rank: 2, name: 'Avocado Toast', category: 'Food', qtySold: 42, revenue: 504.00 },
    { rank: 3, name: 'Iced Matcha', category: 'Drinks', qtySold: 38, revenue: 228.00 },
    { rank: 4, name: 'Butter Croissant', category: 'Food', qtySold: 35, revenue: 140.00 },
    { rank: 5, name: 'Espresso', category: 'Coffee', qtySold: 32, revenue: 112.00 },
];

export const inventoryAlerts: InventoryAlert[] = [
    {
        id: '1',
        productId: '7',
        productName: 'Almond Milk',
        productImage: '/images/products/almond-milk.jpg',
        currentStock: 2,
        minimumStock: 10,
        alertType: 'critical',
        createdAt: new Date(),
    },
    {
        id: '2',
        productId: '14',
        productName: '12oz Paper Cups',
        productImage: '/images/products/paper-cups.jpg',
        currentStock: 1,
        minimumStock: 5,
        alertType: 'low',
        createdAt: new Date(),
    },
    {
        id: '3',
        productId: '8',
        productName: 'Espresso Beans',
        productImage: '/images/products/espresso.jpg',
        currentStock: 15,
        minimumStock: 20,
        alertType: 'low',
        createdAt: new Date(),
    },
];

export const staffOnShift: StaffMember[] = [
    {
        id: '1',
        name: 'Sarah Jenkins',
        email: 'sarah@columns.com',
        role: 'cashier',
        position: 'Barista',
        avatar: '/images/staff/sarah.jpg',
        clockedIn: true,
        clockedInAt: new Date(Date.now() - 1000 * 60 * 60 * 3),
    },
    {
        id: '2',
        name: 'Michael Chen',
        email: 'michael@columns.com',
        role: 'cashier',
        position: 'Cashier',
        avatar: '/images/staff/michael.jpg',
        clockedIn: true,
        clockedInAt: new Date(Date.now() - 1000 * 60 * 60 * 2.5),
    },
    {
        id: '3',
        name: 'Emma Wilson',
        email: 'emma@columns.com',
        role: 'cashier',
        position: 'Server',
        avatar: '/images/staff/emma.jpg',
        clockedIn: true,
        clockedInAt: new Date(Date.now() - 1000 * 60 * 60 * 4),
    },
];

export const currentUser: StaffMember = {
    id: 'admin-1',
    name: 'James Anderson',
    email: 'james@columns.com',
    role: 'admin',
    position: 'Store Manager',
    avatar: '/images/staff/james.jpg',
    clockedIn: true,
};
