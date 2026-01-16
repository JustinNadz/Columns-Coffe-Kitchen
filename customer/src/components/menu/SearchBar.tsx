'use client';

import { Search } from 'lucide-react';

interface SearchBarProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    onSearch?: () => void;
}

export default function SearchBar({
    value,
    onChange,
    placeholder = "Search for coffee, burgers, matcha...",
    onSearch
}: SearchBarProps) {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSearch?.();
    };

    return (
        <form onSubmit={handleSubmit} className="relative w-full max-w-xl">
            <div className="relative flex items-center">
                <Search className="absolute left-4 w-5 h-5 text-[var(--text-muted)]" />
                <input
                    type="text"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder={placeholder}
                    className="input pl-12 pr-24"
                />
                <button
                    type="submit"
                    className="absolute right-1.5 btn btn-primary text-sm py-2 px-5"
                >
                    Search
                </button>
            </div>
        </form>
    );
}
