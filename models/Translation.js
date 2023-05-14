const mongoose = require('mongoose')

const EventSchema = new mongoose.Schema({
    translation: {
        type: String,
        required: true
    },
    sourceLanguage: {
        type: String,
        required: true
    },
    targetLanguage: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Event', EventSchema)