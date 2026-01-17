export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    image: string;
    category: string;
    inStock: boolean;
    stockQuantity?: number; // Optional for menu items
    addons?: Addon[];
}

export interface Addon {
    id: string;
    name: string;
    price: number;
}

export interface Category {
    id: string;
    name: string;
    image: string;
    description?: string;
    itemCount?: number;
    slug?: string;
}

