const express = require('express');
const jwt = require('jsonwebtoken');
const Question = require('../models/questionModel');
const Submission = require('../models/submissionModel');

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

// Route: Submit student work
router.post('/submit', authMiddleware, async (req, res) => {
    if (req.user.role !== 'student') return res.status(403).json({ error: 'Unauthorized' });

    const { content } = req.body;
    try {
        const submission = new Submission({ studentId: req.user.id, content });
        await submission.save();
        res.status(201).json({ message: 'Submission successful', submission });
    } catch (error) {
        res.status(500).json({ error: 'Error submitting work' });
    }
});

// Route: Fetch and filter previous year questions
router.get('/questions', authMiddleware, async (req, res) => {
    if (req.user.role !== 'student') return res.status(403).json({ error: 'Unauthorized' });

    const { category } = req.query;
    try {
        const query = category ? { category } : {};
        const questions = await Question.find(query);
        res.status(200).json(questions);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching questions' });
    }
});

// Route: Search previous year questions by content
router.get('/search-questions', authMiddleware, async (req, res) => {
    if (req.user.role !== 'student') return res.status(403).json({ error: 'Unauthorized' });

    const { query } = req.query;
    try {
        const questions = await Question.find({ content: { $regex: query, $options: 'i' } });
        res.status(200).json(questions);
    } catch (error) {
        res.status(500).json({ error: 'Search failed' });
    }
});

module.exports = router;
