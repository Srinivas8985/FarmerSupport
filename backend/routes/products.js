const router = require('express').Router();
const Product = require('../models/Product');
const jwt = require('jsonwebtoken');

// Middleware to verify token using JWT
const verifyToken = (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) return res.status(401).send('Access Denied');

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (err) {
        res.status(400).send('Invalid Token');
    }
};

// Create Product (Protected)
router.post('/', verifyToken, async (req, res) => {
    // Only farmers can post
    if (req.user.role !== 'farmer') return res.status(403).send('Access Denied: Only Farmers can post products');

    const product = new Product({
        ...req.body,
        seller: req.user._id
    });

    try {
        const savedProduct = await product.save();
        res.send(savedProduct);
    } catch (err) {
        res.status(400).send(err);
    }
});

// Get All Products (Public)
router.get('/', async (req, res) => {
    try {
        const products = await Product.find().populate('seller', 'name location');
        res.send(products);
    } catch (err) {
        res.status(400).send(err);
    }
});

// Get Products by Seller (Protected)
router.get('/my-products', verifyToken, async (req, res) => {
    try {
        const products = await Product.find({ seller: req.user._id });
        res.send(products);
    } catch (err) {
        res.status(400).send(err);
    }
});

module.exports = router;
