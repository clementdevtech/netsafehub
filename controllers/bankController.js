exports.verifyBankTransfer = async ({ userId, transactionId }) => {
    try {
        // Handle manual bank verification
        // Example: await verifyTransaction(transactionId);
        return { message: 'Bank transfer request received, awaiting admin approval' };
    } catch (error) {
        throw new Error('Bank transfer verification failed: ' + error.message);
    }
};
