import { useEffect } from 'react';

/**
 * Custom hook to set dynamic page title and meta description.
 * @param {string} title - Page-specific title (e.g., "About Us"). Pass empty string for home page.
 * @param {string} description - Meta description for SEO.
 */
export default function usePageMeta(title = '', description = '') {
    useEffect(() => {
        // Set document title
        document.title = title ? `Tekunik - ${title}` : 'Tekunik';

        // Set or update meta description
        let metaDescription = document.querySelector('meta[name="description"]');
        if (!metaDescription) {
            metaDescription = document.createElement('meta');
            metaDescription.setAttribute('name', 'description');
            document.head.appendChild(metaDescription);
        }
        metaDescription.setAttribute('content', description || 'Tekunik - Complete digital solutions for web development, mobile apps, UI/UX design, SEO, and more.');

        // Cleanup: reset title when component unmounts
        return () => {
            document.title = 'Tekunik';
        };
    }, [title, description]);
}
