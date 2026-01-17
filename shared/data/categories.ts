// Real categories from Columns Coffee + Kitchen

export interface Category {
    id: string;
    name: string;
    image: string;
    description: string;
    itemCount?: number;
}

export const categories: Category[] = [
    {
        id: 'burgers-wraps',
        name: 'Burgers & Wraps',
        image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400',
        description: 'Made with fresh, plant-based ingredients. Full of flavour and made to satisfy.',
        itemCount: 8,
    },
    {
        id: 'salad-bowls',
        name: 'Salad & Grain Bowls',
        image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400',
        description: 'Thoughtfully crafted for a balanced, colorful meal with wholesome nutrients.',
        itemCount: 5,
    },
    {
        id: 'filo-faves',
        name: 'Filo Faves',
        image: 'https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?w=400',
        description: 'Rich, comforting flavors of traditional Filipino dishes with a plant-based twist.',
        itemCount: 6,
    },
    {
        id: 'rice-bowls',
        name: 'Rice & Adlai Bowls',
        image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400',
        description: 'Hearty, nutritious bowls packed with protein, fiber, and essential nutrients.',
        itemCount: 6,
    },
    {
        id: 'to-share',
        name: 'To Share',
        image: 'https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?w=400',
        description: 'Gather and share the goodness with plant-based sharing plates.',
        itemCount: 7,
    },
    {
        id: 'juices',
        name: 'Fresh-Pressed Juices',
        image: 'https://images.unsplash.com/photo-1610970881699-44a5587cabec?w=400',
        description: '100% fresh, no water, no fillers. Slow-juiced to preserve fiber.',
        itemCount: 3,
    },
    {
        id: 'extras',
        name: 'Extras',
        image: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=400',
        description: 'Add-ons and take-home items.',
        itemCount: 3,
    },
];

// Get category by ID
export const getCategoryById = (id: string): Category | undefined => {
    return categories.find(c => c.id === id);
};

// Get category name by ID
export const getCategoryName = (id: string): string => {
    const category = categories.find(c => c.id === id);
    return category?.name || id;
};
