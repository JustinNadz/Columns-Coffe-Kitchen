'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ChevronLeft,
    Plus,
    Edit2,
    Trash2,
    Image as ImageIcon,
    Save,
    X,
    Search,
    Leaf
} from 'lucide-react';
import Link from 'next/link';
import AdminSidebar from '@/components/layout/AdminSidebar';

interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    category: string;
    image: string;
    inStock: boolean;
}

// Real Columns Coffee + Kitchen menu items (PHP prices)
const initialProducts: Product[] = [
    // SPECIALTY COFFEE
    { id: 'espresso', name: 'Espresso', description: 'Single shot 100% Arabica', price: 100, category: 'Coffee', image: 'https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?w=300', inStock: true },
    { id: 'americano', name: 'Americano', description: 'Espresso with hot water', price: 120, category: 'Coffee', image: 'https://images.unsplash.com/photo-1551030173-122aabc4489c?w=300', inStock: true },
    { id: 'cappuccino', name: 'Cappuccino', description: 'Espresso, oat milk, foam', price: 180, category: 'Coffee', image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=300', inStock: true },
    { id: 'caffe-latte', name: 'Caffe Latte', description: 'Espresso with creamy oat milk', price: 190, category: 'Coffee', image: 'https://images.unsplash.com/photo-1561047029-3000c68339ca?w=300', inStock: true },
    { id: 'cafe-mocha', name: 'Café Mocha', description: 'Espresso, chocolate, oat milk', price: 210, category: 'Coffee', image: 'https://images.unsplash.com/photo-1578314675249-a6910f80cc4e?w=300', inStock: true },

    // SIGNATURE
    { id: 'spanish-latte', name: 'Spanish Latte', description: 'Espresso, oat milk, oat condensed', price: 210, category: 'Signature', image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=300', inStock: true },
    { id: 'tiramisu-latte', name: 'Tiramisu Latte', description: 'Espresso, dark chocolate, cream', price: 230, category: 'Signature', image: 'https://images.unsplash.com/photo-1485808191679-5f86510681a2?w=300', inStock: true },
    { id: 'caramel-seasalt-latte', name: 'Caramel Seasalt Latte', description: 'Sweet and salty layers', price: 230, category: 'Signature', image: 'https://images.unsplash.com/photo-1485808191679-5f86510681a2?w=300', inStock: true },

    // MATCHA
    { id: 'matcha-latte', name: 'Matcha Latte', description: 'Ceremonial Uji matcha, oat milk', price: 210, category: 'Matcha', image: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?w=300', inStock: true },
    { id: 'strawberry-matcha', name: 'Strawberry Matcha', description: 'Green meets red berry heaven', price: 250, category: 'Matcha', image: 'https://images.unsplash.com/photo-1515823064-d6e0c04616a7?w=300', inStock: true },

    // SMOOTHIES
    { id: 'mango-mania', name: 'Mango Mania', description: 'Mango, banana, plant-milk', price: 230, category: 'Smoothies', image: 'https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?w=300', inStock: true },
    { id: 'blue-planet', name: 'Blue Planet', description: 'Mango, blue spirulina, ginger', price: 250, category: 'Smoothies', image: 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=300', inStock: true },

    // BREAKFAST
    { id: 'vanilla-pancake', name: 'Vanilla Pancake', description: 'Granola, banana, seasonal fruit', price: 250, category: 'Breakfast', image: 'https://images.unsplash.com/photo-1528207776546-365bb710ee93?w=300', inStock: true },
    { id: 'banana-waffle', name: 'Banana Waffle', description: 'Caramelised banana, granola', price: 260, category: 'Breakfast', image: 'https://images.unsplash.com/photo-1562376552-0d160a2f238d?w=300', inStock: true },
    { id: 'chia-pudding', name: 'Chia Pudding', description: 'Granola, blueberries, banana', price: 260, category: 'Breakfast', image: 'https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?w=300', inStock: true },

    // BURGERS
    { id: 'beefless-burger', name: 'Beefless Burger', description: 'Plant patty, caramelised onion', price: 270, category: 'Burgers', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300', inStock: true },
    { id: 'crispy-chicken-burger', name: "Crispy Chick'n Burger", description: 'Fried chicken, mustard, slaw', price: 270, category: 'Burgers', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300', inStock: true },
    { id: 'falafel-wrap', name: 'Falafel Wrap', description: 'Falafel, hummus, pickles', price: 270, category: 'Burgers', image: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=300', inStock: true },

    // RICE BOWLS
    { id: 'bibimbap', name: 'Bibimbap', description: 'Korean rice bowl, gochujang', price: 350, category: 'Rice Bowls', image: 'https://images.unsplash.com/photo-1553163147-622ab57be1c7?w=300', inStock: true },
    { id: 'teriyaki-bowl', name: 'Teriyaki Bowl', description: 'Glazed protein, pickled ginger', price: 340, category: 'Rice Bowls', image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300', inStock: true },

    // FILO FAVES
    { id: 'sisig', name: 'Sisig', description: 'Classic Filipino sisig', price: 250, category: 'Filo Faves', image: 'https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?w=300', inStock: true },
    { id: 'adobo-rice', name: 'Adobo Rice', description: 'Traditional adobo with rice', price: 230, category: 'Filo Faves', image: 'https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?w=300', inStock: true },

    // PASTA
    { id: 'garlic-butter-pasta', name: 'Garlic Butter Pasta', description: 'Herbs, mushrooms, bread', price: 280, category: 'Pasta', image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=300', inStock: true },
    { id: 'spaghetti-arrabbiata', name: 'Spaghetti Arrabbiata', description: 'Garlic, chili, fresh tomatoes', price: 280, category: 'Pasta', image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=300', inStock: true },
];

const categories = ['All', 'Coffee', 'Signature', 'Matcha', 'Smoothies', 'Breakfast', 'Burgers', 'Rice Bowls', 'Filo Faves', 'Pasta'];

export default function MenuPage() {
    const [products, setProducts] = useState(initialProducts);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterCategory, setFilterCategory] = useState('All');
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const [showAddModal, setShowAddModal] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        category: 'Coffee',
        image: '',
        inStock: true,
    });

    const filteredProducts = products.filter(p => {
        const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = filterCategory === 'All' || p.category === filterCategory;
        return matchesSearch && matchesCategory;
    });

    const handleEdit = (product: Product) => {
        setEditingProduct(product);
        setFormData({
            name: product.name,
            description: product.description,
            price: product.price.toString(),
            category: product.category,
            image: product.image,
            inStock: product.inStock,
        });
        setShowAddModal(true);
    };

    const handleDelete = (id: string) => {
        if (confirm('Are you sure you want to delete this product?')) {
            setProducts(prev => prev.filter(p => p.id !== id));
        }
    };

    const handleSave = () => {
        if (editingProduct) {
            setProducts(prev => prev.map(p =>
                p.id === editingProduct.id
                    ? { ...p, ...formData, price: parseFloat(formData.price) }
                    : p
            ));
        } else {
            setProducts(prev => [...prev, {
                id: Date.now().toString(),
                name: formData.name,
                description: formData.description,
                price: parseFloat(formData.price),
                category: formData.category,
                image: formData.image || 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=300',
                inStock: formData.inStock,
            }]);
        }
        closeModal();
    };

    const closeModal = () => {
        setShowAddModal(false);
        setEditingProduct(null);
        setFormData({
            name: '',
            description: '',
            price: '',
            category: 'Coffee',
            image: '',
            inStock: true,
        });
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
                                <div className="flex items-center gap-2">
                                    <h1 className="text-xl font-semibold">Menu Editor</h1>
                                    <span className="flex items-center gap-1 text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full">
                                        <Leaf className="w-3 h-3" />
                                        Plant-Based
                                    </span>
                                </div>
                                <p className="text-sm text-[var(--text-muted)]">{products.length} items • Columns Coffee + Kitchen</p>
                            </div>
                        </div>
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setShowAddModal(true)}
                            className="btn btn-primary"
                        >
                            <Plus className="w-4 h-4" />
                            Add Product
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
                                placeholder="Search products..."
                                className="input pl-9 w-full"
                            />
                        </div>
                        <div className="flex gap-2 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
                            {categories.map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => setFilterCategory(cat)}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${filterCategory === cat
                                        ? 'bg-[var(--primary)] text-white'
                                        : 'bg-[var(--background-alt)] text-[var(--text-primary)] hover:bg-[var(--border)]'
                                        }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Products Grid */}
                <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        <AnimatePresence>
                            {filteredProducts.map((product, index) => (
                                <motion.div
                                    key={product.id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ delay: index * 0.03 }}
                                    className="card overflow-hidden group"
                                >
                                    <div className="relative h-40">
                                        <div
                                            className="w-full h-full bg-cover bg-center"
                                            style={{ backgroundImage: `url(${product.image})` }}
                                        />
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                                            <button
                                                onClick={() => handleEdit(product)}
                                                className="p-2 bg-white rounded-lg hover:bg-gray-100"
                                            >
                                                <Edit2 className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(product.id)}
                                                className="p-2 bg-white rounded-lg hover:bg-red-50 text-red-500"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                        {!product.inStock && (
                                            <span className="absolute top-2 left-2 px-2 py-1 bg-red-500 text-white text-xs rounded-full">
                                                Out of Stock
                                            </span>
                                        )}
                                        <span className="absolute top-2 right-2 px-2 py-1 bg-[var(--primary)] text-white text-xs rounded-full">
                                            {product.category}
                                        </span>
                                    </div>
                                    <div className="p-4">
                                        <div className="flex justify-between items-start mb-1">
                                            <h3 className="font-semibold">{product.name}</h3>
                                            <span className="font-bold text-[var(--primary)]">₱{product.price}</span>
                                        </div>
                                        <p className="text-sm text-[var(--text-muted)] line-clamp-2">{product.description}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                </div>
            </main>

            {/* Add/Edit Modal */}
            <AnimatePresence>
                {showAddModal && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={closeModal}
                            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg z-50 p-4"
                        >
                            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
                                <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--border)]">
                                    <h2 className="text-lg font-semibold">
                                        {editingProduct ? 'Edit Product' : 'Add Product'}
                                    </h2>
                                    <button onClick={closeModal} className="p-2 hover:bg-[var(--background-alt)] rounded-lg">
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>

                                <div className="p-6 space-y-4">
                                    <div>
                                        <label className="text-sm text-[var(--text-muted)] mb-1 block">Product Name</label>
                                        <input
                                            type="text"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            placeholder="e.g., Spanish Latte"
                                            className="input"
                                        />
                                    </div>

                                    <div>
                                        <label className="text-sm text-[var(--text-muted)] mb-1 block">Description</label>
                                        <textarea
                                            value={formData.description}
                                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                            placeholder="Short description..."
                                            className="input resize-none h-20"
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="text-sm text-[var(--text-muted)] mb-1 block">Price (₱)</label>
                                            <div className="relative">
                                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]">₱</span>
                                                <input
                                                    type="number"
                                                    value={formData.price}
                                                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                                    placeholder="0"
                                                    step="1"
                                                    className="input pl-8"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="text-sm text-[var(--text-muted)] mb-1 block">Category</label>
                                            <select
                                                value={formData.category}
                                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                                className="input"
                                            >
                                                {categories.filter(c => c !== 'All').map(cat => (
                                                    <option key={cat} value={cat}>{cat}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="text-sm text-[var(--text-muted)] mb-1 block">Image URL</label>
                                        <div className="relative">
                                            <ImageIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" />
                                            <input
                                                type="url"
                                                value={formData.image}
                                                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                                                placeholder="https://..."
                                                className="input pl-9"
                                            />
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <input
                                            type="checkbox"
                                            id="inStock"
                                            checked={formData.inStock}
                                            onChange={(e) => setFormData({ ...formData, inStock: e.target.checked })}
                                            className="w-4 h-4 rounded border-gray-300 text-[var(--primary)] focus:ring-[var(--primary)]"
                                        />
                                        <label htmlFor="inStock" className="text-sm">In Stock</label>
                                    </div>

                                    <div className="flex gap-3 pt-4">
                                        <button onClick={closeModal} className="flex-1 btn btn-outline">
                                            Cancel
                                        </button>
                                        <motion.button
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            onClick={handleSave}
                                            disabled={!formData.name || !formData.price}
                                            className="flex-1 btn btn-primary disabled:opacity-50"
                                        >
                                            <Save className="w-4 h-4" />
                                            {editingProduct ? 'Update' : 'Create'}
                                        </motion.button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}
