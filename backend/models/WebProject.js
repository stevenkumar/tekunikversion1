const mongoose = require('mongoose');

const webProjectSchema = new mongoose.Schema({
    // Step 1: Basic Info
    name: { type: String, required: true },
    company: String,
    email: { type: String, required: true },
    mobile: { type: String, required: true },
    address: String,
    budget: String,
    deadline: String,
    // Step 2: Domain & Hosting
    urlIdea: String,
    hosting: String,
    hostingProvider: String,
    buyDomain: String,
    domainName: String,
    // Step 3: Goals
    reasons: [String],
    otherReason: String,
    // Step 4: E-commerce
    ecommerce: String,
    productCount: String,
    paymentGateways: [String],
    // Step 5: Training & Extra
    training: String,
    trainingType: String,
    extra: String,
}, { timestamps: true });

module.exports = mongoose.model('WebProject', webProjectSchema);
