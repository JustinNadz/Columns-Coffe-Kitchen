export interface InventoryItem {
    id: string;
    productId: string;
    productName: string;
    currentStock: number;
    minimumStock: number;
    unit: string;
    lastUpdated: Date;
    status: "healthy" | "low" | "critical";
}

export interface InventoryAlert {
    id: string;
    productId: string;
    productName: string;
    productImage: string;
    currentStock: number;
    minimumStock: number;
    alertType: "low" | "critical" | "out";
    createdAt: Date;
}
