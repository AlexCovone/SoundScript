const mongoose = require('mongoose');

const TranslationSchema = new mongoose.Schema({
  translation: {
    type: String,
  },
  sourceLanguage: {
    type: String,
  },
  targetLanguage: {
    type: String,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  formattedDate: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Translation', TranslationSchema);
