const paypalClient = require('../utils/paypalClient');

const createPayPalDeposit = async (req, res) => {
  const { amount } = req.body;

  const request = new paypal.orders.OrdersCreateRequest();
  request.prefer("return=representation");
  request.requestBody({
    intent: "CAPTURE",
    purchase_units: [{
      amount: {
        currency_code: "USD",
        value: amount
      }
    }],
    application_context: {
      return_url: `${process.env.YOUR_DOMAIN}/deposit/success`,
      cancel_url: `${process.env.YOUR_DOMAIN}/deposit/cancel`
    }
  });

  try {
    const order = await paypalClient.client().execute(request);
    res.status(200).json({ orderId: order.result.id, approveUrl: order.result.links[1].href });
  } catch (error) {
    console.error('PayPal deposit error:', error);
    res.status(500).json({ error: 'Failed to create PayPal deposit' });
  }
};

module.exports = { createPayPalDeposit };


const capturePayPalDeposit = async (req, res) => {
    const { orderId } = req.query;
  
    const request = new paypal.orders.OrdersCaptureRequest(orderId);
    request.requestBody({});
  
    try {
      const capture = await paypalClient.client().execute(request);
  
      // Here you update the user's wallet balance on your platform.
      const amountCaptured = capture.result.purchase_units[0].amount.value;
      // Assume we update wallet balance here for the logged-in user.
  
      res.status(200).json({ message: 'Deposit successful', amount: amountCaptured });
    } catch (error) {
      console.error('PayPal capture error:', error);
      res.status(500).json({ error: 'Failed to capture PayPal payment' });
    }
  };
  
  module.exports = { capturePayPalDeposit };
  