const express = require('express');
const MobileProject = require('../models/MobileProject');
const sendEmail = require('../utils/sendEmail');

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const { name, email, mobile } = req.body;

        if (!name || !email || !mobile) {
            return res.status(400).json({ message: 'Name, email, and mobile are required' });
        }

        const project = await MobileProject.create(req.body);

        // Send email notification
        await sendEmail(
            `New Mobile App Project Inquiry from ${name}`,
            req.body,
            'Mobile App Project'
        );

        res.status(201).json({ message: 'Mobile project submitted successfully', data: project });
    } catch (error) {
        console.error('Mobile project route error:', error);
        res.status(500).json({ message: 'Server error. Please try again later.' });
    }
});

module.exports = router;
