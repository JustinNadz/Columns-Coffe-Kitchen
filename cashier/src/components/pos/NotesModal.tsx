'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, StickyNote } from 'lucide-react';

interface NotesModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (notes: string) => void;
    itemName: string;
    initialNotes?: string;
}

const quickNotes = [
    'No ice',
    'Extra hot',
    'Light ice',
    'Extra shot',
    'Decaf',
    'No sugar',
    'Oat milk',
    'Almond milk',
    'No whip',
    'Extra foam',
];

export default function NotesModal({
    isOpen,
    onClose,
    onSave,
    itemName,
    initialNotes = ''
}: NotesModalProps) {
    const [notes, setNotes] = useState(initialNotes);

    const handleSave = () => {
        onSave(notes);
        onClose();
    };

    const toggleQuickNote = (note: string) => {
        const currentNotes = notes.split(', ').filter(n => n.trim());

        if (currentNotes.includes(note)) {
            setNotes(currentNotes.filter(n => n !== note).join(', '));
        } else {
            setNotes([...currentNotes, note].filter(n => n).join(', '));
        }
    };

    const isNoteSelected = (note: string) => {
        return notes.split(', ').includes(note);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md z-50 p-4"
                    >
                        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
                            {/* Header */}
                            <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--border)]">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-[var(--background-alt)] rounded-lg flex items-center justify-center">
                                        <StickyNote className="w-5 h-5 text-[var(--primary)]" />
                                    </div>
                                    <div>
                                        <h2 className="font-semibold">Add Notes</h2>
                                        <p className="text-xs text-[var(--text-muted)]">{itemName}</p>
                                    </div>
                                </div>
                                <button
                                    onClick={onClose}
                                    className="p-2 rounded-lg hover:bg-[var(--background-alt)] transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="p-6">
                                {/* Quick Notes */}
                                <div className="mb-4">
                                    <p className="text-sm text-[var(--text-muted)] mb-3">Quick notes</p>
                                    <div className="flex flex-wrap gap-2">
                                        {quickNotes.map((note) => (
                                            <button
                                                key={note}
                                                onClick={() => toggleQuickNote(note)}
                                                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${isNoteSelected(note)
                                                        ? 'bg-[var(--primary)] text-white'
                                                        : 'bg-[var(--background-alt)] text-[var(--text-primary)] hover:bg-[var(--border)]'
                                                    }`}
                                            >
                                                {note}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Custom Notes */}
                                <div className="mb-6">
                                    <p className="text-sm text-[var(--text-muted)] mb-2">Custom instructions</p>
                                    <textarea
                                        value={notes}
                                        onChange={(e) => setNotes(e.target.value)}
                                        placeholder="Add any special instructions..."
                                        className="w-full p-3 rounded-xl border border-[var(--border)] text-sm resize-none h-24 focus:outline-none focus:border-[var(--primary)]"
                                    />
                                </div>

                                {/* Actions */}
                                <div className="flex gap-3">
                                    <button
                                        onClick={() => {
                                            setNotes('');
                                            onClose();
                                        }}
                                        className="flex-1 btn btn-outline"
                                    >
                                        Clear
                                    </button>
                                    <button
                                        onClick={handleSave}
                                        className="flex-1 btn btn-primary"
                                    >
                                        Save Notes
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
