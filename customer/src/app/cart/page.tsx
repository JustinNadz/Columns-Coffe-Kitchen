'use client';

import Link from 'next/link';
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';

export default function CartPage() {
    const { items, updateQuantity, removeItem, clearCart, getSubtotal, getTax, getTotal } = useCartStore();

    if (items.length === 0) {
        return (
            <div className="min-h-screen bg-[var(--background)] flex items-center justify-center p-4">
                <div className="text-center">
                    <div className="w-20 h-20 bg-[var(--background-alt)] rounded-full flex items-center justify-center mx-auto mb-4">
                        <ShoppingBag className="w-10 h-10 text-[var(--text-muted)]" />
                    </div>
                    <h2 className="text-xl font-semibold mb-2">Your cart is empty</h2>
                    <p className="text-[var(--text-muted)] mb-6">Add some items to get started!</p>
                    <Link href="/menu" className="btn btn-primary">
                        Browse Menu
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[var(--background)]">
            <div className="max-w-4xl mx-auto p-4 py-8">
                <div className="flex items-center gap-4 mb-8">
                    <Link href="/menu" className="p-2 hover:bg-[var(--background-alt)] rounded-full">
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                    <h1 className="text-2xl font-bold">Your Cart</h1>
                    <span className="text-[var(--text-muted)]">({items.length} items)</span>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {/* Cart Items */}
                    <div className="md:col-span-2 space-y-4">
                        {items.map((item) => (
                            <div key={item.productId} className="card p-4 flex gap-4">
                                <div
                                    className="w-20 h-20 rounded-xl bg-cover bg-center flex-shrink-0"
                                    style={{
                                        backgroundImage: `url(${item.image})`,
                                        backgroundColor: '#F0EBE5'
                                    }}
                                />
                                <div className="flex-1">
                                    <div className="flex justify-between">
                                        <h3 className="font-semibold">{item.name}</h3>
                                        <span className="font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
                                    </div>
                                    {item.notes && (
                                        <p className="text-xs text-[var(--text-muted)] mt-1">{item.notes}</p>
                                    )}
                                    {item.addons && item.addons.length > 0 && (
                                        <p className="text-xs text-[var(--primary)] mt-1">
                                            + {item.addons.map(a => a.name).join(', ')}
                                        </p>
                                    )}
                                    <div className="flex items-center justify-between mt-3">
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                                                className="w-8 h-8 rounded-full border border-[var(--border)] flex items-center justify-center hover:bg-[var(--background-alt)]"
                                            >
                                                <Minus className="w-4 h-4" />
                                            </button>
                                            <span className="w-8 text-center font-medium">{item.quantity}</span>
                                            <button
                                                onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                                                className="w-8 h-8 rounded-full border border-[var(--border)] flex items-center justify-center hover:bg-[var(--background-alt)]"
                                            >
                                                <Plus className="w-4 h-4" />
                                            </button>
                                        </div>
                                        <button
                                            onClick={() => removeItem(item.productId)}
                                            className="p-2 text-[var(--error)] hover:bg-red-50 rounded-full"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}

                        <button
                            onClick={clearCart}
                            className="text-sm text-[var(--error)] hover:underline"
                        >
                            Clear Cart
                        </button>
                    </div>

                    {/* Order Summary */}
                    <div className="md:col-span-1">
                        <div className="card p-6 sticky top-24">
                            <h3 className="font-semibold mb-4">Order Summary</h3>

                            <div className="space-y-3 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-[var(--text-muted)]">Subtotal</span>
                                    <span>${getSubtotal().toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-[var(--text-muted)]">Tax (8%)</span>
                                    <span>${getTax().toFixed(2)}</span>
                                </div>
                                <div className="border-t border-[var(--border)] pt-3">
                                    <div className="flex justify-between font-semibold text-lg">
                                        <span>Total</span>
                                        <span>${getTotal().toFixed(2)}</span>
                                    </div>
                                </div>
                            </div>

                            <button className="w-full btn btn-primary mt-6">
                                Checkout
                            </button>

                            <p className="text-xs text-center text-[var(--text-muted)] mt-4">
                                Taxes calculated at checkout
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
