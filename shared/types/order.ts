export interface OrderItem {
    productId: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
    notes?: string;
    addons?: { name: string; price: number }[];
}

export type OrderStatus = "pending" | "preparing" | "ready" | "completed" | "cancelled";
export type OrderType = "dine-in" | "takeout" | "delivery";

export interface Order {
    id: string;
    orderNumber: number;
    items: OrderItem[];
    subtotal: number;
    tax: number;
    discount: number;
    total: number;
    status: OrderStatus;
    type: OrderType;
    createdAt: Date;
    customerId?: string;
    cashierId?: string;
    customerName?: string;
    notes?: string;
}
