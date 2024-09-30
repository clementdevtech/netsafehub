// Middleware to check the withdrawal limit
const WITHDRAWAL_LIMIT = 1000;

const checkWithdrawalLimit = async (req, res, next) => {
  const { amount } = req.body;

  // Check if the amount exceeds the limit
  if (amount > WITHDRAWAL_LIMIT) {
    return res.status(400).json({ error: `Withdrawal amount exceeds the limit of $${WITHDRAWAL_LIMIT}` });
  }

  next();
};

module.exports = { checkWithdrawalLimit };
