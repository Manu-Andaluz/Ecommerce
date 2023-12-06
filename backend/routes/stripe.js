const express = require("express");
const Stripe = require("stripe");
const { Order } = require("../models/order");

require("dotenv").config();

const router = express.Router();

const makeCheckoutProducts = (products) => {
  const arr = products.map((item) => {
    return {
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name,
          images: [item.image.url],
        },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.cartQuantity,
    };
  });
  return arr;
};

router.post("/create-checkout-session", async (req, res) => {
  try {
    const key = process.env.STRIPE_API_KEY || "";
    const data = req.body;
    const products = await makeCheckoutProducts(data);

    const stripe = new Stripe(key, {
      apiVersion: "2022-11-15",
    });

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: products,
      success_url: "https://ecommerce-five-ochre.vercel.app",
      cancel_url: "https://ecommerce-five-ochre.vercel.app",
    });

    res.send({ totalSession: session, checkoutUrl: session.url });
  } catch (error) {
    console.log(error);
    res.status(404).send(error);
  }
});
module.exports = router;
