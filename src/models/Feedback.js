const mongoose = require('mongoose')

const Schema = new mongoose.Schema({
    username: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    stars: {
        type: Number,
        required: true
    },
    title: {
        type: String,
        required: false
    },
    description: {
        type: String,
        required: true
    }
}, {timestamps: true})

module.exports = mongoose.model('Feedback', Schema)