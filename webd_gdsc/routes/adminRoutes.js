const express = require('express');
const jwt = require('jsonwebtoken');
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

// Admin review submissions
router.post('/review', authMiddleware, async (req, res) => {
    if (req.user.role !== 'admin') return res.status(403).json({ error: 'Unauthorized' });
    
    const { submissionId, status } = req.body;
    try {
        const submission = await Submission.findById(submissionId);
        if (!submission) return res.status(404).json({ error: 'Submission not found' });
        
        submission.status = status;  // 'accepted' or 'rejected'
        await submission.save();
        res.status(200).json({ message: 'Submission updated', submission });
    } catch (error) {
        res.status(500).json({ error: 'Error reviewing submission' });
    }
});

module.exports = router;
