const express = require('express');
const Contact = require('../models/Contact');
const sendEmail = require('../utils/sendEmail');
const syncToGoogleSheets = require('../utils/googleSheets');

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;

        if (!name || !email || !subject || !message) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const contact = await Contact.create({ name, email, subject, message });

        // Send email notification
        await sendEmail(
            `New Contact Message from ${name}`,
            { name, email, subject, message },
            'Contact'
        );

        // Sync to Google Sheets
        await syncToGoogleSheets('Contact', { name, email, subject, message });

        res.status(201).json({ message: 'Message sent successfully', data: contact });
    } catch (error) {
        console.error('Contact route error:', error);
        res.status(500).json({ message: 'Server error. Please try again later.' });
    }
});

module.exports = router;
