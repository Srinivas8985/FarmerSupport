const router = require('express').Router();
const Order = require('../models/Order');
const Product = require('../models/Product');
const jwt = require('jsonwebtoken');

// Middleware
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

// Create Order (Buyer)
router.post('/', verifyToken, async (req, res) => {
    if (req.user.role !== 'buyer') return res.status(403).send('Only buyers can place orders');

    try {
        // Fetch product to get seller ID
        const product = await Product.findById(req.body.productId);
        if (!product) return res.status(404).send('Product not found');

        const order = new Order({
            buyer: req.user._id,
            seller: product.seller,
            product: req.body.productId,
            status: 'Pending'
        });

        const savedOrder = await order.save();
        res.send(savedOrder);
    } catch (err) {
        res.status(400).send(err);
    }
});

// Get My Orders (Buyer)
router.get('/my-orders', verifyToken, async (req, res) => {
    try {
        const orders = await Order.find({ buyer: req.user._id })
            .populate('product')
            .populate('seller', 'name location');
        res.send(orders);
    } catch (err) {
        res.status(400).send(err);
    }
});

// Get Sales (Farmer)
router.get('/sales', verifyToken, async (req, res) => {
    try {
        const orders = await Order.find({ seller: req.user._id })
            .populate('product')
            .populate('buyer', 'name phone location');
        res.send(orders);
    } catch (err) {
        res.status(400).send(err);
    }
});

// Update Order Status (Farmer)
router.patch('/:id', verifyToken, async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) return res.status(404).send('Order not found');

        // Ensure only the seller can update status
        if (order.seller.toString() !== req.user._id) {
            return res.status(403).send('Access Denied: You are not the seller');
        }

        order.status = req.body.status;
        const updatedOrder = await order.save();
        res.send(updatedOrder);
    } catch (err) {
        res.status(400).send(err);
    }
});

module.exports = router;
