import { Category } from '../types';

export const categories: Category[] = [
    {
        id: '1',
        name: 'Specialty Coffee',
        slug: 'coffee',
        image: '/images/categories/coffee.jpg',
        itemCount: 12,
    },
    {
        id: '2',
        name: 'Artisan Burgers',
        slug: 'burgers',
        image: '/images/categories/burgers.jpg',
        itemCount: 8,
    },
    {
        id: '3',
        name: 'Breakfast',
        slug: 'breakfast',
        image: '/images/categories/breakfast.jpg',
        itemCount: 10,
    },
    {
        id: '4',
        name: 'Smoothies & Bowls',
        slug: 'smoothies',
        image: '/images/categories/smoothies.jpg',
        itemCount: 6,
    },
];

export const posCategories = [
    { id: 'food', name: 'Food', icon: '🍽️' },
    { id: 'drinks', name: 'Drinks', icon: '☕' },
    { id: 'sides', name: 'Sides', icon: '🥗' },
    { id: 'retail', name: 'Retail', icon: '🛍️' },
    { id: 'seasonal', name: 'Seasonal', icon: '🍂' },
];
