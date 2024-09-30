const paypalService = require('../services/paypal');

// Create PayPal Order
exports.createSubscription = async (req, res) => {
    const { userId } = req.body;
    const amount = 5; 

    try {
        const order = await paypalService.createOrder(amount);
        const approvalUrl = order.links.find(link => link.rel === 'approve').href;
        res.json({ approvalUrl });
    } catch (error) {
        res.status(500).json({ error: 'PayPal order creation failed' });
    }
};

// Capture PayPal Payment
exports.capturePayment = async (req, res) => {
    const { orderId } = req.body;
    try {
        const capture = await paypalService.captureOrder(orderId);
        res.json({ status: 'success', capture });
    } catch (error) {
        res.status(500).json({ error: 'Payment capture failed' });
    }
};
