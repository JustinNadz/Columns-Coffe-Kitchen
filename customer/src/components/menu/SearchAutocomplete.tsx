'use client';

import { useState, useMemo, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Clock, TrendingUp } from 'lucide-react';

interface SearchResult {
    id: string;
    name: string;
    category: string;
    price: number;
}

interface SearchAutocompleteProps {
    products: SearchResult[];
    onSelect: (product: SearchResult) => void;
    onSearch: (query: string) => void;
    placeholder?: string;
}

const RECENT_SEARCHES_KEY = 'recent-searches';
const MAX_RECENT = 5;

export default function SearchAutocomplete({
    products,
    onSelect,
    onSearch,
    placeholder = "Search menu..."
}: SearchAutocompleteProps) {
    const [query, setQuery] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const [recentSearches, setRecentSearches] = useState<string[]>([]);
    const inputRef = useRef<HTMLInputElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    // Load recent searches from localStorage
    useEffect(() => {
        const stored = localStorage.getItem(RECENT_SEARCHES_KEY);
        if (stored) {
            setRecentSearches(JSON.parse(stored));
        }
    }, []);

    // Filter products based on query
    const suggestions = useMemo(() => {
        if (query.length < 2) return [];
        const lowerQuery = query.toLowerCase();
        return products
            .filter(p =>
                p.name.toLowerCase().includes(lowerQuery) ||
                p.category.toLowerCase().includes(lowerQuery)
            )
            .slice(0, 6);
    }, [query, products]);

    // Popular items (mock - could be from analytics)
    const popularItems = useMemo(() => {
        return products.slice(0, 3);
    }, [products]);

    const handleSelect = (product: SearchResult) => {
        // Add to recent searches
        const updated = [product.name, ...recentSearches.filter(s => s !== product.name)].slice(0, MAX_RECENT);
        setRecentSearches(updated);
        localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(updated));

        setQuery('');
        setIsFocused(false);
        onSelect(product);
    };

    const handleRecentClick = (searchTerm: string) => {
        setQuery(searchTerm);
        onSearch(searchTerm);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (query.trim()) {
            // Add to recent
            const updated = [query, ...recentSearches.filter(s => s !== query)].slice(0, MAX_RECENT);
            setRecentSearches(updated);
            localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(updated));

            onSearch(query);
            setIsFocused(false);
        }
    };

    const clearRecent = () => {
        setRecentSearches([]);
        localStorage.removeItem(RECENT_SEARCHES_KEY);
    };

    // Close dropdown on outside click
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
                setIsFocused(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const showDropdown = isFocused && (suggestions.length > 0 || recentSearches.length > 0 || query.length === 0);

    return (
        <div ref={containerRef} className="relative w-full max-w-md">
            <form onSubmit={handleSubmit}>
                <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--text-muted)]" />
                    <input
                        ref={inputRef}
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onFocus={() => setIsFocused(true)}
                        placeholder={placeholder}
                        className="input pl-12 pr-10 w-full"
                    />
                    {query && (
                        <button
                            type="button"
                            onClick={() => setQuery('')}
                            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-100 rounded-full"
                        >
                            <X className="w-4 h-4 text-gray-400" />
                        </button>
                    )}
                </div>
            </form>

            {/* Dropdown */}
            <AnimatePresence>
                {showDropdown && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-[var(--border)] overflow-hidden z-50"
                    >
                        {/* Search Results */}
                        {suggestions.length > 0 && (
                            <div className="p-2">
                                <p className="text-xs text-[var(--text-muted)] px-2 mb-1">Results</p>
                                {suggestions.map((product) => (
                                    <button
                                        key={product.id}
                                        onClick={() => handleSelect(product)}
                                        className="w-full flex items-center justify-between p-2 hover:bg-[var(--background-alt)] rounded-lg transition-colors"
                                    >
                                        <div className="text-left">
                                            <p className="font-medium text-sm">{product.name}</p>
                                            <p className="text-xs text-[var(--text-muted)]">{product.category}</p>
                                        </div>
                                        <span className="text-sm font-semibold text-[var(--primary)]">
                                            ₱{product.price}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        )}

                        {/* Recent Searches */}
                        {query.length === 0 && recentSearches.length > 0 && (
                            <div className="p-2 border-t border-[var(--border)]">
                                <div className="flex items-center justify-between px-2 mb-1">
                                    <p className="text-xs text-[var(--text-muted)] flex items-center gap-1">
                                        <Clock className="w-3 h-3" />
                                        Recent
                                    </p>
                                    <button
                                        onClick={clearRecent}
                                        className="text-xs text-red-500 hover:underline"
                                    >
                                        Clear
                                    </button>
                                </div>
                                {recentSearches.map((term, i) => (
                                    <button
                                        key={i}
                                        onClick={() => handleRecentClick(term)}
                                        className="w-full text-left p-2 text-sm hover:bg-[var(--background-alt)] rounded-lg"
                                    >
                                        {term}
                                    </button>
                                ))}
                            </div>
                        )}

                        {/* Popular */}
                        {query.length === 0 && popularItems.length > 0 && (
                            <div className="p-2 border-t border-[var(--border)]">
                                <p className="text-xs text-[var(--text-muted)] px-2 mb-1 flex items-center gap-1">
                                    <TrendingUp className="w-3 h-3" />
                                    Popular
                                </p>
                                {popularItems.map((product) => (
                                    <button
                                        key={product.id}
                                        onClick={() => handleSelect(product)}
                                        className="w-full flex items-center justify-between p-2 hover:bg-[var(--background-alt)] rounded-lg"
                                    >
                                        <span className="text-sm">{product.name}</span>
                                        <span className="text-sm font-semibold text-[var(--primary)]">
                                            ₱{product.price}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        )}

                        {/* No results */}
                        {query.length >= 2 && suggestions.length === 0 && (
                            <div className="p-4 text-center text-[var(--text-muted)]">
                                <p className="text-sm">No results for "{query}"</p>
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
