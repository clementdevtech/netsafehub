exports.initiateMpesaPayment = async ({ phone, amount, userId }) => {
    try {
        const result = await mpesaService.processPayment(phone, amount);
        // Save MPESA payment details to the database with userId
        // Example: await saveTransactionToDB(userId, result);
        return result;
    } catch (error) {
        throw new Error('MPESA payment failed: ' + error.message);
    }
};
