import React, { createContext, useContext, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const AccordionContext = createContext({});
const AccordionItemContext = createContext({});

export function Accordion({ children, defaultValue = [], className }) {
    // Ensure defaultValue is an array
    const initialValue = Array.isArray(defaultValue) ? defaultValue : [defaultValue];
    const [openItems, setOpenItems] = useState(initialValue);

    const toggleItem = (value) => {
        setOpenItems((prev) =>
            prev.includes(value)
                ? prev.filter((item) => item !== value)
                : [...prev, value]
        );
    };

    return (
        <AccordionContext.Provider value={{ openItems, toggleItem }}>
            <div className={`space-y-4 ${className || ''}`}>{children}</div>
        </AccordionContext.Provider>
    );
}

export function AccordionItem({ children, value, className }) {
    return (
        <AccordionItemContext.Provider value={{ value }}>
            <div className={`border-b border-gray-200 ${className || ''}`}>
                {children}
            </div>
        </AccordionItemContext.Provider>
    );
}

export function AccordionHeader({ children, customIcon, className }) {
    const { openItems, toggleItem } = useContext(AccordionContext);
    const { value } = useContext(AccordionItemContext);
    const isOpen = openItems.includes(value);

    return (
        <button
            onClick={() => toggleItem(value)}
            className={`flex items-center justify-between w-full py-4 text-left font-medium transition-all group ${className || ''}`}
            data-active={isOpen ? '' : undefined}
            data-state={isOpen ? 'open' : 'closed'}
        >
            {children}
            {!customIcon && (
                <svg
                    className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            )}
        </button>
    );
}

export function AccordionPanel({ children, className }) {
    const { openItems } = useContext(AccordionContext);
    const { value } = useContext(AccordionItemContext);
    const isOpen = openItems.includes(value);

    return (
        <AnimatePresence initial={false}>
            {isOpen && (
                <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                >
                    <div className={`pb-4 pt-0 text-gray-600 ${className || ''}`}>{children}</div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
