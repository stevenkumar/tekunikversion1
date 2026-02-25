const mongoose = require('mongoose');

const mobileProjectSchema = new mongoose.Schema({
    // Step 1: Contact & Budget
    name: { type: String, required: true },
    company: String,
    email: { type: String, required: true },
    mobile: { type: String, required: true },
    budget: String,
    deadline: String,
    // Step 2: App Core
    summary: String,
    parts: [String],
    platforms: String,
    orientation: String,
    // Step 3: Strategy
    targetUsers: String,
    objectives: String,
    phases: String,
    freePaid: String,
    // Step 4: Technical
    backend: String,
    tech: String,
    host: String,
    hostProvider: String,
    payment: String,
    thirdParty: [String],
    // Step 5: Final
    appStoreLaunch: String,
    maintenance: String,
    extra: String,
}, { timestamps: true });

module.exports = mongoose.model('MobileProject', mobileProjectSchema);
