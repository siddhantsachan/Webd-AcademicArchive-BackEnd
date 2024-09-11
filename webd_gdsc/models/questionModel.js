const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    year: { type: Number, required: true },
    category: { type: String, required: true },
    content: { type: String, required: true }
});

module.exports = mongoose.model('Question', questionSchema);
