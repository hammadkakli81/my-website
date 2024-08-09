import { NextApiHandler } from 'next';
import { catchAsync } from '../../utils/catch-async';
import Stripe from 'stripe';

export const stripe = new Stripe(process.env.STRIPE_SECRET!, {
  apiVersion: '2024-06-20',
});

const handler: NextApiHandler = (req, res) => {
  const { method } = req;

  switch (method) {
    case 'POST':
      return checkout(req, res);

    default:
      const error = [{ message: 'No Endpoint exists' }];
      return res.status(404).send({ error });
  }
};

const checkout = catchAsync(async (req, res) => {
  const { products } = req.body; // products should be an array
  // with {name: string, price: number}[]

  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    payment_method_types: ['card'],
    success_url: 'https://hammadkakli.com',
    line_items: products.map((product: any) => {
      const priceInCents = Number(product.price) * 100;

      return {
        quantity: 1,
        price_data: {
          currency: 'usd',
          unit_amount: priceInCents,
          product_data: {
            name: product.name,
          },
        },
      };
    }),
  });

  res.send({ session });
});

export default handler;
