'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ChevronLeft,
    Plus,
    Clock,
    UserCheck,
    UserX,
    Calendar,
    BarChart3,
    ChevronRight,
    ChevronDown
} from 'lucide-react';
import Link from 'next/link';
import AdminSidebar from '@/components/layout/AdminSidebar';

interface StaffMember {
    id: string;
    name: string;
    role: string;
    avatar: string;
    clockedIn: boolean;
    clockInTime?: string;
    hoursThisWeek: number;
    performance: number;
}

interface Shift {
    id: string;
    staffId: string;
    day: string;
    start: string;
    end: string;
}

const mockStaff: StaffMember[] = [
    { id: '1', name: 'Sarah Jenkins', role: 'Barista', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100', clockedIn: true, clockInTime: '7:00 AM', hoursThisWeek: 32, performance: 95 },
    { id: '2', name: 'Michael Chen', role: 'Barista', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100', clockedIn: true, clockInTime: '7:30 AM', hoursThisWeek: 28, performance: 88 },
    { id: '3', name: 'Emma Wilson', role: 'Shift Lead', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100', clockedIn: false, hoursThisWeek: 40, performance: 92 },
    { id: '4', name: 'James Rodriguez', role: 'Barista', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100', clockedIn: false, hoursThisWeek: 24, performance: 85 },
    { id: '5', name: 'Lisa Park', role: 'Kitchen', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100', clockedIn: true, clockInTime: '6:00 AM', hoursThisWeek: 36, performance: 90 },
];

const mockShifts: Shift[] = [
    { id: '1', staffId: '1', day: 'Mon', start: '7:00', end: '15:00' },
    { id: '2', staffId: '1', day: 'Tue', start: '7:00', end: '15:00' },
    { id: '3', staffId: '2', day: 'Mon', start: '7:00', end: '15:00' },
    { id: '4', staffId: '3', day: 'Wed', start: '12:00', end: '20:00' },
    { id: '5', staffId: '5', day: 'Mon', start: '6:00', end: '14:00' },
];

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const hours = Array.from({ length: 15 }, (_, i) => `${i + 6}:00`);

export default function StaffPage() {
    const [staff] = useState(mockStaff);
    const [shifts] = useState(mockShifts);
    const [view, setView] = useState<'list' | 'schedule'>('list');
    const [selectedDay, setSelectedDay] = useState('Mon');

    const clockedInCount = staff.filter(s => s.clockedIn).length;
    const totalHours = staff.reduce((acc, s) => acc + s.hoursThisWeek, 0);
    const avgPerformance = Math.round(staff.reduce((acc, s) => acc + s.performance, 0) / staff.length);

    const getShiftsForDay = (day: string) => {
        return shifts.filter(s => s.day === day);
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
                                <h1 className="text-xl font-semibold">Staff Management</h1>
                                <p className="text-sm text-[var(--text-muted)]">{staff.length} team members</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="flex bg-[var(--background-alt)] rounded-lg p-1">
                                <button
                                    onClick={() => setView('list')}
                                    className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${view === 'list' ? 'bg-white shadow-sm' : 'text-[var(--text-muted)]'
                                        }`}
                                >
                                    List
                                </button>
                                <button
                                    onClick={() => setView('schedule')}
                                    className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${view === 'schedule' ? 'bg-white shadow-sm' : 'text-[var(--text-muted)]'
                                        }`}
                                >
                                    Schedule
                                </button>
                            </div>
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="btn btn-primary"
                            >
                                <Plus className="w-4 h-4" />
                                Add Staff
                            </motion.button>
                        </div>
                    </div>
                </header>

                <div className="p-6">
                    {/* Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="card p-4"
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                                    <UserCheck className="w-5 h-5 text-green-600" />
                                </div>
                                <div>
                                    <p className="text-2xl font-bold">{clockedInCount}</p>
                                    <p className="text-xs text-[var(--text-muted)]">Clocked In</p>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="card p-4"
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center">
                                    <UserX className="w-5 h-5 text-red-600" />
                                </div>
                                <div>
                                    <p className="text-2xl font-bold">{staff.length - clockedInCount}</p>
                                    <p className="text-xs text-[var(--text-muted)]">Off Duty</p>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="card p-4"
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                                    <Clock className="w-5 h-5 text-blue-600" />
                                </div>
                                <div>
                                    <p className="text-2xl font-bold">{totalHours}h</p>
                                    <p className="text-xs text-[var(--text-muted)]">Total This Week</p>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="card p-4"
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                                    <BarChart3 className="w-5 h-5 text-purple-600" />
                                </div>
                                <div>
                                    <p className="text-2xl font-bold">{avgPerformance}%</p>
                                    <p className="text-xs text-[var(--text-muted)]">Avg Performance</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {view === 'list' ? (
                        /* Staff List */
                        <div className="card overflow-hidden">
                            <table className="w-full">
                                <thead className="bg-[var(--background-alt)]">
                                    <tr className="text-sm text-[var(--text-muted)]">
                                        <th className="text-left p-4 font-medium">Staff Member</th>
                                        <th className="text-left p-4 font-medium">Role</th>
                                        <th className="text-left p-4 font-medium">Status</th>
                                        <th className="text-left p-4 font-medium">Hours</th>
                                        <th className="text-left p-4 font-medium">Performance</th>
                                        <th className="text-right p-4 font-medium">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {staff.map((member, index) => (
                                        <motion.tr
                                            key={member.id}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: index * 0.05 }}
                                            className="border-t border-[var(--border)] hover:bg-[var(--background-alt)]"
                                        >
                                            <td className="p-4">
                                                <div className="flex items-center gap-3">
                                                    <div
                                                        className="w-10 h-10 rounded-full bg-cover bg-center"
                                                        style={{ backgroundImage: `url(${member.avatar})` }}
                                                    />
                                                    <span className="font-medium">{member.name}</span>
                                                </div>
                                            </td>
                                            <td className="p-4 text-sm">{member.role}</td>
                                            <td className="p-4">
                                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${member.clockedIn
                                                        ? 'bg-green-100 text-green-700'
                                                        : 'bg-gray-100 text-gray-600'
                                                    }`}>
                                                    {member.clockedIn ? `In since ${member.clockInTime}` : 'Off Duty'}
                                                </span>
                                            </td>
                                            <td className="p-4 text-sm">{member.hoursThisWeek}h</td>
                                            <td className="p-4">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                                                        <div
                                                            className="h-full bg-[var(--primary)] rounded-full"
                                                            style={{ width: `${member.performance}%` }}
                                                        />
                                                    </div>
                                                    <span className="text-sm">{member.performance}%</span>
                                                </div>
                                            </td>
                                            <td className="p-4 text-right">
                                                <button className="btn btn-outline text-sm py-1.5">
                                                    View
                                                    <ChevronRight className="w-4 h-4" />
                                                </button>
                                            </td>
                                        </motion.tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        /* Schedule View */
                        <div className="card p-4">
                            {/* Day Tabs */}
                            <div className="flex gap-2 mb-6 overflow-auto">
                                {days.map((day) => (
                                    <button
                                        key={day}
                                        onClick={() => setSelectedDay(day)}
                                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${selectedDay === day
                                                ? 'bg-[var(--primary)] text-white'
                                                : 'bg-[var(--background-alt)] text-[var(--text-primary)] hover:bg-[var(--border)]'
                                            }`}
                                    >
                                        {day}
                                    </button>
                                ))}
                            </div>

                            {/* Schedule Grid */}
                            <div className="space-y-3">
                                {staff.map((member) => {
                                    const memberShifts = getShiftsForDay(selectedDay).filter(s => s.staffId === member.id);

                                    return (
                                        <div key={member.id} className="flex items-center gap-4 p-3 bg-[var(--background-alt)] rounded-xl">
                                            <div
                                                className="w-10 h-10 rounded-full bg-cover bg-center flex-shrink-0"
                                                style={{ backgroundImage: `url(${member.avatar})` }}
                                            />
                                            <div className="w-32 flex-shrink-0">
                                                <p className="font-medium text-sm">{member.name}</p>
                                                <p className="text-xs text-[var(--text-muted)]">{member.role}</p>
                                            </div>
                                            <div className="flex-1">
                                                {memberShifts.length > 0 ? (
                                                    memberShifts.map((shift) => (
                                                        <span
                                                            key={shift.id}
                                                            className="inline-block px-3 py-1 bg-[var(--primary)] text-white text-sm rounded-lg"
                                                        >
                                                            {shift.start} - {shift.end}
                                                        </span>
                                                    ))
                                                ) : (
                                                    <span className="text-sm text-[var(--text-muted)]">No shift</span>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
