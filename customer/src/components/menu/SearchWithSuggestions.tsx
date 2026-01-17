'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Clock, TrendingUp, X } from 'lucide-react';

interface SearchWithSuggestionsProps {
    onSearch: (query: string) => void;
    placeholder?: string;
}

const popularSearches = [
    'Oat Latte',
    'Avocado Toast',
    'Iced Matcha',
    'Croissant',
    'Espresso',
];

export default function SearchWithSuggestions({ onSearch, placeholder = 'Search menu...' }: SearchWithSuggestionsProps) {
    const [query, setQuery] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const [recentSearches, setRecentSearches] = useState<string[]>([]);
    const inputRef = useRef<HTMLInputElement>(null);

    // Load recent searches from localStorage
    useEffect(() => {
        const stored = localStorage.getItem('recentSearches');
        if (stored) {
            setRecentSearches(JSON.parse(stored));
        }
    }, []);

    const handleSearch = (searchQuery: string) => {
        if (!searchQuery.trim()) return;

        onSearch(searchQuery);
        setQuery(searchQuery);
        setIsFocused(false);

        // Save to recent searches
        const updated = [searchQuery, ...recentSearches.filter(s => s !== searchQuery)].slice(0, 5);
        setRecentSearches(updated);
        localStorage.setItem('recentSearches', JSON.stringify(updated));
    };

    const clearRecentSearches = () => {
        setRecentSearches([]);
        localStorage.removeItem('recentSearches');
    };

    const showDropdown = isFocused && (recentSearches.length > 0 || query === '');

    return (
        <div className="relative">
            <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--text-muted)]" />
                <input
                    ref={inputRef}
                    type="text"
                    value={query}
                    onChange={(e) => {
                        setQuery(e.target.value);
                        onSearch(e.target.value);
                    }}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setTimeout(() => setIsFocused(false), 200)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') handleSearch(query);
                    }}
                    placeholder={placeholder}
                    className="input pl-12 pr-10"
                />
                {query && (
                    <button
                        onClick={() => {
                            setQuery('');
                            onSearch('');
                            inputRef.current?.focus();
                        }}
                        className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-[var(--background-alt)] rounded-full"
                    >
                        <X className="w-4 h-4 text-[var(--text-muted)]" />
                    </button>
                )}
            </div>

            <AnimatePresence>
                {showDropdown && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-lg border border-[var(--border)] overflow-hidden z-50"
                    >
                        {/* Recent Searches */}
                        {recentSearches.length > 0 && (
                            <div className="p-3">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-xs font-medium text-[var(--text-muted)] flex items-center gap-1">
                                        <Clock className="w-3 h-3" />
                                        Recent
                                    </span>
                                    <button
                                        onClick={clearRecentSearches}
                                        className="text-xs text-[var(--text-muted)] hover:text-[var(--primary)]"
                                    >
                                        Clear
                                    </button>
                                </div>
                                <div className="space-y-1">
                                    {recentSearches.map((search, index) => (
                                        <button
                                            key={index}
                                            onClick={() => handleSearch(search)}
                                            className="w-full text-left px-3 py-2 rounded-lg hover:bg-[var(--background-alt)] text-sm transition-colors"
                                        >
                                            {search}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Popular Searches */}
                        <div className="p-3 border-t border-[var(--border)]">
                            <span className="text-xs font-medium text-[var(--text-muted)] flex items-center gap-1 mb-2">
                                <TrendingUp className="w-3 h-3" />
                                Popular
                            </span>
                            <div className="flex flex-wrap gap-2">
                                {popularSearches.map((search, index) => (
                                    <button
                                        key={index}
                                        onClick={() => handleSearch(search)}
                                        className="px-3 py-1.5 rounded-full bg-[var(--background-alt)] text-sm hover:bg-[var(--border)] transition-colors"
                                    >
                                        {search}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
