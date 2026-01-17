'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Package,
    Search,
    Plus,
    Edit2,
    Trash2,
    AlertTriangle,
    ArrowUpDown,
    Filter,
    X,
    Save,
    ChevronLeft
} from 'lucide-react';
import Link from 'next/link';
import AdminSidebar from '@/components/layout/AdminSidebar';

interface InventoryItem {
    id: string;
    name: string;
    category: string;
    currentStock: number;
    minStock: number;
    unit: string;
    lastUpdated: Date;
    price: number;
    image: string;
}

// Mock inventory data
const mockInventory: InventoryItem[] = [
    { id: '1', name: 'Oat Milk', category: 'Supplies', currentStock: 24, minStock: 10, unit: 'liters', lastUpdated: new Date(), price: 4.50, image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=100' },
    { id: '2', name: 'Espresso Beans', category: 'Coffee', currentStock: 8, minStock: 20, unit: 'kg', lastUpdated: new Date(), price: 28.00, image: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=100' },
    { id: '3', name: '12oz Paper Cups', category: 'Supplies', currentStock: 150, minStock: 100, unit: 'units', lastUpdated: new Date(), price: 0.15, image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=100' },
    { id: '4', name: 'Almond Milk', category: 'Supplies', currentStock: 5, minStock: 10, unit: 'liters', lastUpdated: new Date(), price: 5.00, image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=100' },
    { id: '5', name: 'Vanilla Syrup', category: 'Syrups', currentStock: 12, minStock: 5, unit: 'bottles', lastUpdated: new Date(), price: 8.00, image: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=100' },
    { id: '6', name: 'Croissants', category: 'Bakery', currentStock: 0, minStock: 15, unit: 'units', lastUpdated: new Date(), price: 2.50, image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=100' },
];

export default function InventoryPage() {
    const [inventory, setInventory] = useState(mockInventory);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterCategory, setFilterCategory] = useState('all');
    const [showLowStock, setShowLowStock] = useState(false);
    const [editingItem, setEditingItem] = useState<InventoryItem | null>(null);
    const [showAddModal, setShowAddModal] = useState(false);

    const categories = ['all', ...new Set(inventory.map(i => i.category))];

    const filteredInventory = inventory.filter(item => {
        const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = filterCategory === 'all' || item.category === filterCategory;
        const matchesLowStock = !showLowStock || item.currentStock <= item.minStock;
        return matchesSearch && matchesCategory && matchesLowStock;
    });

    const getStockStatus = (item: InventoryItem) => {
        if (item.currentStock === 0) return { label: 'Out of Stock', color: 'bg-red-100 text-red-700' };
        if (item.currentStock <= item.minStock) return { label: 'Low Stock', color: 'bg-yellow-100 text-yellow-700' };
        return { label: 'In Stock', color: 'bg-green-100 text-green-700' };
    };

    const handleUpdateStock = (id: string, newStock: number) => {
        setInventory(prev => prev.map(item =>
            item.id === id ? { ...item, currentStock: newStock, lastUpdated: new Date() } : item
        ));
    };

    const handleDeleteItem = (id: string) => {
        if (confirm('Are you sure you want to delete this item?')) {
            setInventory(prev => prev.filter(item => item.id !== id));
        }
    };

    return (
        <div className="flex min-h-screen bg-[var(--background)]">
            <AdminSidebar />

            <main className="flex-1 overflow-auto">
                {/* Header */}
                <header className="bg-white border-b border-[var(--border)] px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <Link href="/" className="p-2 hover:bg-[var(--background-alt)] rounded-lg">
                                <ChevronLeft className="w-5 h-5" />
                            </Link>
                            <div>
                                <h1 className="text-xl font-semibold">Inventory Management</h1>
                                <p className="text-sm text-[var(--text-muted)]">{inventory.length} items total</p>
                            </div>
                        </div>
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setShowAddModal(true)}
                            className="btn btn-primary"
                        >
                            <Plus className="w-4 h-4" />
                            Add Item
                        </motion.button>
                    </div>
                </header>

                {/* Filters */}
                <div className="px-6 py-4 bg-white border-b border-[var(--border)]">
                    <div className="flex flex-wrap items-center gap-4">
                        <div className="relative flex-1 min-w-64">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search inventory..."
                                className="input pl-9 w-full"
                            />
                        </div>

                        <select
                            value={filterCategory}
                            onChange={(e) => setFilterCategory(e.target.value)}
                            className="input w-40"
                        >
                            {categories.map(cat => (
                                <option key={cat} value={cat}>
                                    {cat === 'all' ? 'All Categories' : cat}
                                </option>
                            ))}
                        </select>

                        <button
                            onClick={() => setShowLowStock(!showLowStock)}
                            className={`btn ${showLowStock ? 'btn-primary' : 'btn-outline'}`}
                        >
                            <AlertTriangle className="w-4 h-4" />
                            Low Stock Only
                        </button>
                    </div>
                </div>

                {/* Inventory Table */}
                <div className="p-6">
                    <div className="card overflow-hidden">
                        <table className="w-full">
                            <thead className="bg-[var(--background-alt)]">
                                <tr className="text-sm text-[var(--text-muted)]">
                                    <th className="text-left p-4 font-medium">Item</th>
                                    <th className="text-left p-4 font-medium">Category</th>
                                    <th className="text-left p-4 font-medium">Stock</th>
                                    <th className="text-left p-4 font-medium">Status</th>
                                    <th className="text-left p-4 font-medium">Last Updated</th>
                                    <th className="text-right p-4 font-medium">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <AnimatePresence>
                                    {filteredInventory.map((item, index) => {
                                        const status = getStockStatus(item);
                                        return (
                                            <motion.tr
                                                key={item.id}
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -10 }}
                                                transition={{ delay: index * 0.03 }}
                                                className="border-t border-[var(--border)] hover:bg-[var(--background-alt)]"
                                            >
                                                <td className="p-4">
                                                    <div className="flex items-center gap-3">
                                                        <div
                                                            className="w-10 h-10 rounded-lg bg-cover bg-center"
                                                            style={{
                                                                backgroundImage: `url(${item.image})`,
                                                                backgroundColor: '#F0EBE5'
                                                            }}
                                                        />
                                                        <div>
                                                            <p className="font-medium">{item.name}</p>
                                                            <p className="text-xs text-[var(--text-muted)]">${item.price.toFixed(2)} / {item.unit}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="p-4 text-sm">{item.category}</td>
                                                <td className="p-4">
                                                    <div className="flex items-center gap-2">
                                                        <input
                                                            type="number"
                                                            value={item.currentStock}
                                                            onChange={(e) => handleUpdateStock(item.id, parseInt(e.target.value) || 0)}
                                                            className="w-16 px-2 py-1 text-sm border border-[var(--border)] rounded"
                                                            min="0"
                                                        />
                                                        <span className="text-xs text-[var(--text-muted)]">
                                                            / {item.minStock} min
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="p-4">
                                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${status.color}`}>
                                                        {status.label}
                                                    </span>
                                                </td>
                                                <td className="p-4 text-sm text-[var(--text-muted)]">
                                                    {item.lastUpdated.toLocaleDateString()}
                                                </td>
                                                <td className="p-4">
                                                    <div className="flex justify-end gap-2">
                                                        <button
                                                            onClick={() => setEditingItem(item)}
                                                            className="p-2 hover:bg-[var(--background)] rounded-lg"
                                                        >
                                                            <Edit2 className="w-4 h-4 text-[var(--text-muted)]" />
                                                        </button>
                                                        <button
                                                            onClick={() => handleDeleteItem(item.id)}
                                                            className="p-2 hover:bg-red-50 rounded-lg"
                                                        >
                                                            <Trash2 className="w-4 h-4 text-red-500" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </motion.tr>
                                        );
                                    })}
                                </AnimatePresence>
                            </tbody>
                        </table>

                        {filteredInventory.length === 0 && (
                            <div className="py-12 text-center text-[var(--text-muted)]">
                                <Package className="w-12 h-12 mx-auto mb-3 opacity-50" />
                                <p>No items found</p>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}
