const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },  // Store plain text for simplicity (not recommended in production)
    role: { type: String, enum: ['admin', 'student'], required: true }
});

module.exports = mongoose.model('User', userSchema);
