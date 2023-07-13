import Stripe from "stripe";

const stripe = new Stripe("sk_test_51NTKlOSFvVvQPdy8ndVU8mqHHwt2WRxCHGu13MfwjyIfuAMdUnKXULeKG3CoZKje6BmO8nYjtunFQlfod2pq9zjQ00n0bhgOcR");

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const lineItems = req.body.map((item) => {
        const img = item.image.asset._ref;
        const newImage = img
          .replace("image-", "https://cdn.sanity.io/images/lyekv5qr/production/")
          .replace("-jpg", ".jpg");

        return {
          price_data: {
            currency: "usd",
            product_data: {
              name: item.name,
              images: [newImage],
            },
            unit_amount: item.price * 100,
          },
          quantity: item.quantity,
        };
      });

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: lineItems,
        mode: "payment",
        success_url: `${req.headers.origin}/success`,
        cancel_url: `${req.headers.origin}/cart`,
        billing_address_collection: "required",
        shipping_address_collection: {
          allowed_countries: ["US", "CA", "GB", "IN", "AU"], // Modify this array as per your requirements
        },
      });

      res.status(200).json({ url: session.url });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method not allowed");
  }
}
