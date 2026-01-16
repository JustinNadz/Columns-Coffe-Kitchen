'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    Coffee,
    LayoutDashboard,
    TrendingUp,
    Package,
    UtensilsCrossed,
    Users,
    LogOut
} from 'lucide-react';

const navItems = [
    { href: '/', icon: LayoutDashboard, label: 'Dashboard' },
    { href: '/analytics', icon: TrendingUp, label: 'Sales Analytics' },
    { href: '/inventory', icon: Package, label: 'Inventory' },
    { href: '/menu', icon: UtensilsCrossed, label: 'Menu Editor' },
    { href: '/staff', icon: Users, label: 'Staff Schedules' },
];

interface AdminSidebarProps {
    currentUser?: {
        name: string;
        position: string;
        avatar?: string;
    };
}

export default function AdminSidebar({ currentUser }: AdminSidebarProps) {
    const pathname = usePathname();

    return (
        <aside className="w-56 bg-[var(--background-sidebar)] flex flex-col min-h-screen">
            {/* Logo */}
            <div className="p-4 flex items-center gap-3">
                <div className="w-10 h-10 bg-[var(--primary)] rounded-lg flex items-center justify-center">
                    <Coffee className="w-5 h-5 text-white" />
                </div>
                <div>
                    <h1 className="text-white font-semibold text-sm">Columns</h1>
                    <p className="text-gray-400 text-xs">Coffee + Kitchen</p>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-3 py-4">
                <ul className="space-y-1">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <li key={item.href}>
                                <Link
                                    href={item.href}
                                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${isActive
                                            ? 'bg-[var(--primary)] text-white'
                                            : 'text-gray-400 hover:bg-white/10 hover:text-white'
                                        }`}
                                >
                                    <item.icon className="w-5 h-5" />
                                    {item.label}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>

            {/* User Profile */}
            <div className="p-4 border-t border-white/10">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[var(--secondary)] flex items-center justify-center text-white font-medium">
                        {currentUser?.name?.charAt(0) || 'J'}
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-white text-sm font-medium truncate">
                            {currentUser?.name || 'James Anderson'}
                        </p>
                        <p className="text-gray-400 text-xs truncate">
                            {currentUser?.position || 'Store Manager'}
                        </p>
                    </div>
                    <button className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-white/10">
                        <LogOut className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </aside>
    );
}
