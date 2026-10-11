const router = require('express').Router();
const CropHealth = require('../models/CropHealth');

// Get All Tips
router.get('/', async (req, res) => {
    try {
        const tips = await CropHealth.find().sort({ createdAt: -1 });
        res.send(tips);
    } catch (err) {
        res.status(400).send(err);
    }
});

// Add Tip (Public for now, ideally protected)
router.post('/', async (req, res) => {
    const tip = new CropHealth({
        diseaseName: req.body.diseaseName,
        description: req.body.description,
        solution: req.body.solution,
        symptoms: req.body.symptoms,
        image: req.body.image
    });

    try {
        const savedTip = await tip.save();
        res.send(savedTip);
    } catch (err) {
        res.status(400).send(err);
    }
});

module.exports = router;
