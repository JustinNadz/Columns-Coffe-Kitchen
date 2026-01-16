export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    image: string;
    category: string;
    inStock: boolean;
    stockQuantity: number;
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
    itemCount: number;
    slug: string;
}
