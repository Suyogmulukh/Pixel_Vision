// Beatflow-backend/controllers/feedbackController.js
const Feedback = require('../models/feedback.model');

exports.submitFeedback = async (req, res) => {
  try {
    const { userId, message, rating } = req.body;
    const feedback = new Feedback({ userId, message, rating });
    await feedback.save();
    res.status(201).json({ message: 'Feedback submitted successfully!' });
  } catch (error) {
    console.error('Feedback submit error:', error);
    res.status(500).json({ message: 'Error submitting feedback', error });
  }
};