// Beatflow-backend/models/feedbackModel.js
const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false },
  message: { type: String, required: true },
  rating: { type: Number, min: 1, max: 5 },
  createdAt: { type: Date, default: Date.now }
});

const Feedback = mongoose.model('Feedback', feedbackSchema);

module.exports = Feedback;