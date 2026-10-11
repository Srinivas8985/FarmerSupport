const mongoose = require('mongoose');

const CropHealthSchema = new mongoose.Schema({
    diseaseName: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    solution: {
        type: String,
        required: true
    },
    symptoms: {
        type: String,
        required: true
    },
    image: {
        type: String, // URL to image
        default: ''
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('CropHealth', CropHealthSchema);
