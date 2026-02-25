const express = require('express');
const WebProject = require('../models/WebProject');
const sendEmail = require('../utils/sendEmail');

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const { name, email, mobile } = req.body;

        if (!name || !email || !mobile) {
            return res.status(400).json({ message: 'Name, email, and mobile are required' });
        }

        const project = await WebProject.create(req.body);

        // Send email notification
        await sendEmail(
            `New Web Project Inquiry from ${name}`,
            req.body,
            'Web Project'
        );

        res.status(201).json({ message: 'Web project submitted successfully', data: project });
    } catch (error) {
        console.error('Web project route error:', error);
        res.status(500).json({ message: 'Server error. Please try again later.' });
    }
});

module.exports = router;
