const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.getCheckoutSession = async (req, res, next) => {
  const buyTokenCard = await buyTokenCard.findById(req.params.cardID);

  const session = await stripe.checkout.session.create({
    payment_method_types: ["card"],
    success_url: `${req.protocol}://${req.get("host")}/`,
    cancel_url: `${req.protocol}://${req.get("host")}/shop`,
    customer_email: req.user.email,
    client_reference_id: req.params.cardID,
    line_items: [
      {
        name: `${buyTokenCard.name} Card`,
        price: buyTokenCard.price * 100,
        currency: "inr",
        quantity: 1,
      },
    ],
  });

  res.status(200).json({
    status: "success",
    session,
  });
};
