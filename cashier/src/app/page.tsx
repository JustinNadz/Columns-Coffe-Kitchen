'use client';

import { useState } from 'react';
import {
  Coffee,
  LayoutGrid,
  ClipboardList,
  Settings,
  LogOut,
  Search,
  X,
  MapPin,
  Minus,
  Plus,
  StickyNote,
  Percent,
  Trash2,
  ChevronRight
} from 'lucide-react';
import { usePOSStore } from '@/store/posStore';

// Mock products data
const products = [
  { id: '1', name: 'Avocado Toast', description: 'Sourdough, radish, chili', price: 12.00, image: 'https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?w=300', category: 'food', inStock: true },
  { id: '7', name: 'Oat Latte', description: 'Double shot, Minor Figures', price: 5.50, image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=300', category: 'drinks', inStock: true },
  { id: '2', name: 'Butter Croissant', description: 'House-made, French-style', price: 4.00, image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=300', category: 'food', inStock: true },
  { id: '3', name: 'Granola Bowl', description: 'Greek yogurt, seasonal fruits', price: 9.50, image: 'https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?w=300', category: 'food', inStock: true },
  { id: '10', name: 'Iced Matcha', description: 'Ceremonial grade, oat milk', price: 6.00, image: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?w=300', category: 'drinks', inStock: true },
  { id: '8', name: 'Espresso', description: 'Single origin, Ethiopia', price: 3.50, image: 'https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?w=300', category: 'drinks', inStock: true },
  { id: '6', name: 'Blueberry Muffin', description: 'Streusel topping', price: 4.50, image: 'https://images.unsplash.com/photo-1607958996333-41aef7caefaa?w=300', category: 'food', inStock: false },
  { id: '9', name: 'Iced Americano', description: 'Double shot, water, ice', price: 3.75, image: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?w=300', category: 'drinks', inStock: true },
];

const categories = [
  { id: 'food', name: 'Food' },
  { id: 'drinks', name: 'Drinks' },
  { id: 'sides', name: 'Sides' },
  { id: 'retail', name: 'Retail' },
  { id: 'seasonal', name: 'Seasonal' },
];

export default function POSPage() {
  const [activeCategory, setActiveCategory] = useState('food');
  const [searchQuery, setSearchQuery] = useState('');

  const {
    orderNumber,
    orderType,
    items,
    discount,
    setOrderType,
    addItem,
    updateQuantity,
    clearOrder,
    getSubtotal,
    getTax,
    getTotal,
    checkout,
  } = usePOSStore();

  const filteredProducts = products.filter((p) => {
    const matchesCategory = p.category === activeCategory;
    const matchesSearch = searchQuery === '' ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const currentTime = new Date().toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });

  return (
    <div className="flex h-screen bg-[var(--background-alt)]">
      {/* Sidebar */}
      <aside className="w-16 bg-[var(--background-sidebar)] flex flex-col items-center py-4">
        <div className="w-10 h-10 bg-[var(--primary)] rounded-lg flex items-center justify-center mb-8">
          <Coffee className="w-5 h-5 text-white" />
        </div>

        <nav className="flex-1 flex flex-col items-center gap-2">
          <button className="w-10 h-10 rounded-lg bg-[var(--primary)] text-white flex items-center justify-center">
            <LayoutGrid className="w-5 h-5" />
          </button>
          <button className="w-10 h-10 rounded-lg text-gray-400 hover:bg-white/10 flex items-center justify-center">
            <ClipboardList className="w-5 h-5" />
          </button>
        </nav>

        <div className="flex flex-col items-center gap-2">
          <button className="w-10 h-10 rounded-lg text-gray-400 hover:bg-white/10 flex items-center justify-center">
            <Settings className="w-5 h-5" />
          </button>
          <button className="w-10 h-10 rounded-lg text-gray-400 hover:bg-white/10 flex items-center justify-center">
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-[var(--border)] px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold">Menu</h1>
            <p className="text-xs text-[var(--text-muted)]">Columns Coffee + Kitchen</p>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder='Search items (e.g. "Latte") or scan barcode...'
                className="input pl-9 pr-4 w-80 text-sm"
              />
            </div>
            <button className="p-2 hover:bg-[var(--background-alt)] rounded-lg">
              <X className="w-5 h-5 text-[var(--text-muted)]" />
            </button>
          </div>
        </header>

        {/* Category Tabs */}
        <div className="bg-white border-b border-[var(--border)] px-6 py-3">
          <div className="flex gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${activeCategory === cat.id
                    ? 'bg-[var(--primary)] text-white'
                    : 'bg-[var(--background-alt)] text-[var(--text-primary)] hover:bg-[var(--border)]'
                  }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="flex-1 overflow-auto p-6">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredProducts.map((product) => (
              <button
                key={product.id}
                onClick={() => product.inStock && addItem({
                  productId: product.id,
                  name: product.name,
                  price: product.price,
                  image: product.image,
                })}
                disabled={!product.inStock}
                className={`card p-3 text-left transition-all hover:shadow-md ${!product.inStock ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
                  }`}
              >
                <div className="relative mb-3">
                  <div
                    className="w-full aspect-square rounded-xl bg-cover bg-center"
                    style={{
                      backgroundImage: `url(${product.image})`,
                      backgroundColor: '#F0EBE5'
                    }}
                  />
                  <span className="absolute top-2 right-2 badge badge-primary">
                    ${product.price.toFixed(2)}
                  </span>
                  {!product.inStock && (
                    <div className="absolute inset-0 bg-black/40 rounded-xl flex items-center justify-center">
                      <span className="bg-white text-xs font-medium px-2 py-1 rounded">
                        Out of Stock
                      </span>
                    </div>
                  )}
                </div>
                <h3 className="font-medium text-sm">{product.name}</h3>
                <p className="text-xs text-[var(--text-muted)] truncate">{product.description}</p>
              </button>
            ))}
          </div>
        </div>
      </main>

      {/* Order Panel */}
      <aside className="w-96 bg-white border-l border-[var(--border)] flex flex-col">
        {/* Order Header */}
        <div className="p-4 border-b border-[var(--border)]">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold">Order #{orderNumber}</h2>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setOrderType('dine-in')}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm ${orderType === 'dine-in'
                    ? 'bg-[var(--primary)] text-white'
                    : 'bg-[var(--background-alt)] text-[var(--text-secondary)]'
                  }`}
              >
                <MapPin className="w-3.5 h-3.5" />
                Dine-in
              </button>
            </div>
          </div>
          <p className="text-xs text-[var(--text-muted)]">Cassie M. • {currentTime}</p>
        </div>

        {/* Order Items */}
        <div className="flex-1 overflow-auto p-4">
          {items.length === 0 ? (
            <div className="h-full flex items-center justify-center">
              <p className="text-[var(--text-muted)] text-sm">No items added yet</p>
            </div>
          ) : (
            <div className="space-y-3">
              {items.map((item) => (
                <div key={item.productId} className="flex gap-3">
                  <div
                    className="w-12 h-12 rounded-lg bg-cover bg-center flex-shrink-0"
                    style={{
                      backgroundImage: `url(${item.image})`,
                      backgroundColor: '#F0EBE5'
                    }}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between">
                      <h4 className="font-medium text-sm truncate">{item.name}</h4>
                      <span className="font-medium text-sm">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                    {item.addons && item.addons.length > 0 && (
                      <p className="text-xs text-[var(--primary)]">
                        + {item.addons.map(a => `${a.name} ($${a.price.toFixed(2)})`).join(', ')}
                      </p>
                    )}
                    {item.notes && (
                      <p className="text-xs text-[var(--text-muted)]">{item.notes}</p>
                    )}
                    <div className="flex items-center gap-2 mt-1">
                      <button
                        onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                        className="w-6 h-6 rounded border border-[var(--border)] flex items-center justify-center text-[var(--text-muted)] hover:bg-[var(--background-alt)]"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-sm font-medium w-4 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                        className="w-6 h-6 rounded border border-[var(--border)] flex items-center justify-center text-[var(--text-muted)] hover:bg-[var(--background-alt)]"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="p-4 border-t border-[var(--border)]">
          <div className="flex gap-2 mb-4">
            <button className="flex-1 btn btn-outline text-xs py-2.5">
              <StickyNote className="w-4 h-4" />
              Add Note
            </button>
            <button className="flex-1 btn btn-outline text-xs py-2.5">
              <Percent className="w-4 h-4" />
              Discount
            </button>
            <button
              onClick={clearOrder}
              className="flex-1 btn btn-outline text-xs py-2.5"
            >
              <Trash2 className="w-4 h-4" />
              Clear
            </button>
          </div>

          {/* Totals */}
          <div className="space-y-2 text-sm mb-4">
            <div className="flex justify-between text-[var(--text-muted)]">
              <span>Subtotal</span>
              <span>${getSubtotal().toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-[var(--text-muted)]">
              <span>Tax (8%)</span>
              <span>${getTax().toFixed(2)}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-[var(--primary)]">
                <span>Discount</span>
                <span>-${discount.toFixed(2)}</span>
              </div>
            )}
          </div>

          <div className="flex justify-between items-center mb-4">
            <span className="text-lg font-semibold">Total</span>
            <span className="text-2xl font-bold">${getTotal().toFixed(2)}</span>
          </div>

          <button
            onClick={checkout}
            disabled={items.length === 0}
            className="w-full btn btn-primary py-3 text-base disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Checkout
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </aside>
    </div>
  );
}
