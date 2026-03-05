import React, { memo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Edit3, Save, RotateCcw } from "lucide-react";

/**
 * ReviewSummaryCard — A reusable summary section with inline editing.
 * 
 * @param {string} title - Section title (e.g., "Step 1: Contact Info")
 * @param {Array} items - List of { label, value, key, type, options } items to display
 * @param {Function} onUpdate - Callback to update parent form state: (key, value) => void
 * @param {Function} onRemoveTag - Callback to remove an item from an array/list field
 */
const ReviewSummaryCard = ({ title, items, onUpdate, onRemoveTag }) => {
    const [isEditing, setIsEditing] = useState(false);

    return (
        <motion.div
            layout
            variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0 }
            }}
            className={`bg-white rounded-2xl border transition-all duration-300 p-6 relative group ${isEditing ? 'border-brand-green ring-1 ring-brand-green/20 shadow-md' : 'border-slate-100 shadow-sm'}`}
        >
            <div className="flex justify-between items-center mb-4 border-b pb-2">
                <h3 className="font-bold text-slate-800 text-lg">{title}</h3>
                {!isEditing ? (
                    <button
                        type="button"
                        onClick={() => setIsEditing(true)}
                        className="flex items-center gap-1.5 text-xs font-bold text-brand-green bg-brand-green/10 px-3 py-1.5 rounded-full hover:bg-brand-green hover:text-white transition-all"
                    >
                        <Edit3 size={14} />
                        Edit Details
                    </button>
                ) : (
                    <div className="flex items-center gap-2">
                        <button
                            type="button"
                            onClick={() => setIsEditing(false)}
                            className="flex items-center gap-1.5 text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1.5 rounded-full hover:bg-slate-200 transition-all"
                        >
                            <RotateCcw size={14} />
                            Cancel
                        </button>
                        <button
                            type="button"
                            onClick={() => setIsEditing(false)}
                            className="flex items-center gap-1.5 text-xs font-bold text-white bg-brand-green px-3 py-1.5 rounded-full hover:bg-brand-cyan transition-all shadow-sm"
                        >
                            <Save size={14} />
                            Save
                        </button>
                    </div>
                )}
            </div>

            <div className="space-y-4">
                {items.map((item, idx) => {
                    // Don't show empty values in summary mode
                    if (!isEditing && (!item.value || (Array.isArray(item.value) && item.value.length === 0))) return null;

                    return (
                        <div key={idx} className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-4">
                            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 sm:w-1/3 pt-1">
                                {item.label}
                            </span>

                            <div className="sm:w-2/3">
                                {isEditing ? (
                                    <>
                                        {item.type === "select" ? (
                                            <select
                                                value={item.value}
                                                onChange={(e) => onUpdate(item.key, e.target.value)}
                                                className="w-full text-sm border-slate-200 rounded-lg p-2 focus:ring-1 focus:ring-brand-green outline-none"
                                            >
                                                <option value="">Select option</option>
                                                {item.options?.map(opt => (
                                                    <option key={opt.value || opt} value={opt.value || opt}>{opt.label || opt}</option>
                                                ))}
                                            </select>
                                        ) : item.type === "textarea" ? (
                                            <textarea
                                                value={item.value}
                                                onChange={(e) => onUpdate(item.key, e.target.value)}
                                                className="w-full text-sm border-slate-200 rounded-lg p-2 focus:ring-1 focus:ring-brand-green outline-none"
                                                rows="2"
                                            />
                                        ) : item.type === "tags" ? (
                                            <div className="flex flex-wrap gap-2">
                                                <AnimatePresence mode="popLayout">
                                                    {item.value.map((val) => (
                                                        <motion.span
                                                            key={val}
                                                            layout
                                                            initial={{ opacity: 0, scale: 0.8 }}
                                                            animate={{ opacity: 1, scale: 1 }}
                                                            exit={{ opacity: 0, scale: 0.5 }}
                                                            className="inline-flex items-center gap-1 bg-slate-50 border border-slate-200 text-slate-700 px-2 py-1 rounded-lg text-xs font-medium"
                                                        >
                                                            {val}
                                                            <button
                                                                type="button"
                                                                onClick={() => onRemoveTag(item.key, val)}
                                                                className="hover:text-red-500 transition-colors"
                                                            >
                                                                <X size={12} />
                                                            </button>
                                                        </motion.span>
                                                    ))}
                                                </AnimatePresence>
                                            </div>
                                        ) : (
                                            <input
                                                type={item.type || "text"}
                                                value={item.value}
                                                onChange={(e) => onUpdate(item.key, e.target.value)}
                                                className="w-full text-sm border-slate-200 rounded-lg p-2 focus:ring-1 focus:ring-brand-green outline-none"
                                            />
                                        )}
                                    </>
                                ) : (
                                    <>
                                        {Array.isArray(item.value) ? (
                                            <div className="flex flex-wrap gap-2">
                                                <AnimatePresence mode="popLayout">
                                                    {item.value.map((val) => (
                                                        <motion.span
                                                            key={val}
                                                            layout
                                                            initial={{ opacity: 0, scale: 0.8 }}
                                                            animate={{ opacity: 1, scale: 1 }}
                                                            exit={{ opacity: 0, scale: 0.5 }}
                                                            className="inline-flex items-center gap-1 bg-slate-50 border border-slate-200 text-slate-700 px-2 py-1 rounded-lg text-xs font-medium"
                                                        >
                                                            {val}
                                                            <button
                                                                type="button"
                                                                onClick={() => onRemoveTag(item.key, val)}
                                                                className="hover:text-red-500 transition-colors"
                                                            >
                                                                <X size={12} />
                                                            </button>
                                                        </motion.span>
                                                    ))}
                                                </AnimatePresence>
                                            </div>
                                        ) : (
                                            <span className="text-sm font-medium text-slate-700">
                                                {item.value}
                                            </span>
                                        )}
                                    </>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </motion.div>
    );
};

export default memo(ReviewSummaryCard);
