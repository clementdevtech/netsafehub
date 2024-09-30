const Transaction = require('../models/Transaction');

exports.getTransactions = async (req, res, next) => {
    try {
        const transactions = await Transaction.getByWallet(req.user.wallet_id);
        res.status(200).json(transactions);
    } catch (error) {
        next(error);
    }
};
