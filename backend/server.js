const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/contact', require('./routes/contact'));
app.use('/api/web-project', require('./routes/webProject'));
app.use('/api/mobile-project', require('./routes/mobileProject'));

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Connect to MongoDB and start server
const PORT = process.env.PORT || 5000;

const connectDB = async () => {
    const uris = [
        process.env.MONGODB_URI,
        'mongodb://127.0.0.1:27017/tekunik'
    ];
    
    for (const uri of uris) {
        try {
            await mongoose.connect(uri, {
                serverSelectionTimeoutMS: 5000,
                socketTimeoutMS: 45000,
                family: 4,
            });
            console.log('✅ MongoDB connected:', uri.includes('127.0.0.1') ? 'Local' : 'Atlas');
            return;
        } catch (err) {
            console.error(`❌ Failed to connect to ${uri.includes('127.0.0.1') ? 'Local' : 'Atlas'}:`, err.message);
        }
    }
    console.log('🔄 Retrying in 10 seconds...');
    setTimeout(connectDB, 10000);
};

mongoose.connection.on('disconnected', () => {
    console.log('⚠️ MongoDB disconnected. Reconnecting...');
});

mongoose.connection.on('error', (err) => {
    console.error('❌ MongoDB error:', err.message);
});

connectDB();

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
