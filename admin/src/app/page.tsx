'use client';

import {
  DollarSign,
  ShoppingBag,
  Users,
  AlertTriangle,
  Search,
  Plus,
  ChevronDown,
  MoreHorizontal,
  Clock,
  UserPlus
} from 'lucide-react';
import AdminSidebar from '@/components/layout/AdminSidebar';
import StatsCard from '@/components/dashboard/StatsCard';
import RevenueChart from '@/components/dashboard/RevenueChart';
import InventoryAlert from '@/components/dashboard/InventoryAlert';

// Mock data
const revenueData = [
  { time: '6AM', revenue: 120 },
  { time: '9AM', revenue: 350 },
  { time: '12PM', revenue: 580 },
  { time: '3PM', revenue: 420 },
  { time: '6PM', revenue: 650 },
  { time: '9PM', revenue: 480 },
];

const inventoryAlerts = [
  { id: '1', productName: 'Almond Milk', productImage: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=100', currentStock: 2, minimumStock: 10, alertType: 'critical' as const },
  { id: '2', productName: '12oz Paper Cups', productImage: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=100', currentStock: 1, minimumStock: 5, alertType: 'low' as const },
  { id: '3', productName: 'Espresso Beans', productImage: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=100', currentStock: 15, minimumStock: 20, alertType: 'low' as const },
];

const topSellingItems = [
  { rank: 1, name: 'Oat Flat White', category: 'Coffee', qtySold: 84, revenue: 378.00 },
  { rank: 2, name: 'Avocado Toast', category: 'Food', qtySold: 42, revenue: 504.00 },
  { rank: 3, name: 'Iced Matcha', category: 'Drinks', qtySold: 38, revenue: 228.00 },
  { rank: 4, name: 'Butter Croissant', category: 'Food', qtySold: 35, revenue: 140.00 },
];

const staffOnShift = [
  { id: '1', name: 'Sarah Jenkins', clockedIn: '7:00 AM', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100' },
  { id: '2', name: 'Michael Chen', clockedIn: '7:30 AM', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100' },
  { id: '3', name: 'Emma Wilson', clockedIn: '8:00 AM', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100' },
];

export default function DashboardPage() {
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });

  const currentTime = new Date().toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });

  return (
    <div className="flex min-h-screen bg-[var(--background)]">
      <AdminSidebar />

      <main className="flex-1 overflow-auto">
        {/* Header */}
        <header className="bg-white border-b border-[var(--border)] px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-semibold">Overview</h1>
              <p className="text-sm text-[var(--text-muted)]">{today} • {currentTime}</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" />
                <input
                  type="text"
                  placeholder="Search orders, items..."
                  className="input pl-9 pr-4 w-64 text-sm"
                />
              </div>
              <button className="btn btn-primary">
                <Plus className="w-4 h-4" />
                New Order
              </button>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="p-6">
          {/* Stats Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <StatsCard
              icon={DollarSign}
              iconBg="#5C8D4D"
              label="Daily Revenue"
              value="$2,450.00"
              change={12.5}
            />
            <StatsCard
              icon={ShoppingBag}
              iconBg="#6366F1"
              label="Total Orders"
              value="142"
              change={5}
            />
            <StatsCard
              icon={Users}
              iconBg="#F59E0B"
              label="Active Staff"
              value="8 / 12"
            />
            <div className="card p-4 bg-[var(--secondary)]">
              <div className="flex items-center gap-2 text-white/80 mb-2">
                <AlertTriangle className="w-4 h-4" />
                <span className="text-xs font-medium">Low Stock Alerts</span>
              </div>
              <p className="text-3xl font-bold text-white">2 Items</p>
            </div>
          </div>

          {/* Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Chart & Table */}
            <div className="lg:col-span-2 space-y-6">
              {/* Revenue Chart */}
              <div className="card p-5">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-semibold">Revenue Over Time</h3>
                    <p className="text-xs text-[var(--text-muted)]">Hourly sales performance today</p>
                  </div>
                  <button className="btn btn-outline text-sm py-1.5">
                    Today
                    <ChevronDown className="w-4 h-4" />
                  </button>
                </div>
                <RevenueChart data={revenueData} />
              </div>

              {/* Top Selling Items */}
              <div className="card p-5">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold">Top Selling Items</h3>
                  <button className="text-[var(--text-muted)] hover:text-[var(--text-primary)]">
                    <MoreHorizontal className="w-5 h-5" />
                  </button>
                </div>
                <table className="w-full">
                  <thead>
                    <tr className="text-xs text-[var(--text-muted)] border-b border-[var(--border)]">
                      <th className="text-left pb-3 font-medium">Rank</th>
                      <th className="text-left pb-3 font-medium">Item Name</th>
                      <th className="text-left pb-3 font-medium">Category</th>
                      <th className="text-right pb-3 font-medium">Qty Sold</th>
                      <th className="text-right pb-3 font-medium">Revenue</th>
                    </tr>
                  </thead>
                  <tbody>
                    {topSellingItems.map((item) => (
                      <tr key={item.rank} className="border-b border-[var(--border)] last:border-0">
                        <td className="py-3 text-sm text-[var(--text-muted)]">{item.rank.toString().padStart(2, '0')}</td>
                        <td className="py-3">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-[var(--background)] flex items-center justify-center">
                              ☕
                            </div>
                            <span className="text-sm font-medium">{item.name}</span>
                          </div>
                        </td>
                        <td className="py-3 text-sm text-[var(--text-muted)]">{item.category}</td>
                        <td className="py-3 text-sm text-right">{item.qtySold}</td>
                        <td className="py-3 text-sm text-right font-medium">${item.revenue.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Right Column - Alerts & Staff */}
            <div className="space-y-6">
              {/* Inventory Alerts */}
              <div className="card p-5">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold">Inventory Alerts</h3>
                  <a href="/inventory" className="text-xs text-[var(--primary)] font-medium hover:underline">
                    View All
                  </a>
                </div>
                <div className="space-y-1">
                  {inventoryAlerts.map((alert) => (
                    <InventoryAlert key={alert.id} {...alert} />
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="card p-5 bg-[#3D3D3D]">
                <h3 className="font-semibold text-white mb-4">Quick Actions</h3>
                <div className="grid grid-cols-2 gap-3">
                  <button className="flex flex-col items-center gap-2 p-4 rounded-lg bg-white/10 hover:bg-white/20 transition-colors">
                    <Plus className="w-5 h-5 text-white" />
                    <span className="text-xs text-white font-medium">Add Item</span>
                  </button>
                  <button className="flex flex-col items-center gap-2 p-4 rounded-lg bg-white/10 hover:bg-white/20 transition-colors">
                    <Clock className="w-5 h-5 text-white" />
                    <span className="text-xs text-white font-medium">New Shift</span>
                  </button>
                </div>
              </div>

              {/* Staff On Shift */}
              <div className="card p-5">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold">Staff On Shift</h3>
                  <span className="text-xs text-[var(--text-muted)]">Baristas</span>
                </div>
                <div className="space-y-3">
                  {staffOnShift.map((staff) => (
                    <div key={staff.id} className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-full bg-cover bg-center"
                        style={{
                          backgroundImage: `url(${staff.avatar})`,
                          backgroundColor: '#E5E5E5'
                        }}
                      />
                      <div className="flex-1">
                        <p className="text-sm font-medium">{staff.name}</p>
                        <p className="text-xs text-[var(--text-muted)]">
                          Clocked in {staff.clockedIn}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
