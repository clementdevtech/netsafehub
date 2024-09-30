const WithdrawalRequest = require('../models/WithdrawalRequest');

exports.withdraw = async (req, res, next) => {
    const { amount, method } = req.body;
    try {
        // Create a new withdrawal request
        const request = await WithdrawalRequest.create(req.user.wallet_id, amount, method);
        res.status(201).json({ message: 'Withdrawal request created', request });
    } catch (error) {
        next(error);
    }
};
