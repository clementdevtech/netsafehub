const Wallet = require('../models/Wallet');
const Transaction = require('../models/Transaction');

exports.getWalletBalance = async (req, res, next) => {
    try {
        const wallet = await Wallet.getBalance(req.user.wallet_id);
        res.status(200).json({ balance: wallet.balance });
    } catch (error) {
        next(error);
    }
};

exports.deposit = async (req, res, next) => {
    const { amount } = req.body;
    try {
        const wallet = await Wallet.getBalance(req.user.wallet_id);
        const newBalance = parseFloat(wallet.balance) + parseFloat(amount);

        await Wallet.updateBalance(req.user.wallet_id, newBalance);
        await Transaction.create(req.user.wallet_id, 'deposit', amount);

        res.status(201).json({ message: 'Deposit successful', newBalance });
    } catch (error) {
        next(error);
    }
};
