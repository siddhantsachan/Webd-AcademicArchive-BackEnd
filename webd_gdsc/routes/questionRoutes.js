// /routes/questionRoutes.js
const express = require('express');
const Question = require('../models/questionModel');
const jwt = require('jsonwebtoken');

const router = express.Router();
const JWT_SECRET = 'gdsc';

// Middleware for JWT verification
const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ error: 'No token provided' });
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ error: 'Invalid token' });
    }
};

// Route: Add a new question
router.post('/add', authMiddleware, async (req, res) => {
    if (req.user.role !== 'admin') return res.status(403).json({ error: 'Unauthorized' });

    const { content, year, category } = req.body;
    try {
        const question = new Question({ content, year, category });
        await question.save();
        res.status(201).json({ message: 'Question added successfully', question });
    } catch (error) {
        res.status(500).json({ error: 'Error adding question' });
    }
});

module.exports = router;
