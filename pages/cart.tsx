import Layout from '@/components/layout/layout';
import { useCart } from '@/contexts/cart-context';
import { loadStripe, Stripe } from '@stripe/stripe-js';
import axios from 'axios';
import Head from 'next/head';
import React, { useState } from 'react';

let stripePromise: Promise<Stripe | null> | null = null;

export const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUB!);
  }

  return stripePromise;
};

const Cart: React.FC = () => {
  const { cartItems, removeItemFromCart } = useCart();
  const [loading, setLoading] = useState(false);

  const totalPrice = cartItems.reduce((prev, cur) => prev + cur.price, 0);

  return (
    <>
      <Head>
        <title>Amazon Account Management | Hammad</title>
      </Head>
      <Layout>
        <div className="px-10 py-[50px] w-full flex items-center justify-center">
          <div className="text-4xl">
            <h1 className="text-6xl mb-8">Your Cart</h1>
            {cartItems.length === 0 ? (
              <div>
                <p className="text-xl">Your cart is empty</p>
              </div>
            ) : (
              <>
                <ul className="mb-8">
                  {cartItems.map((item: any, index: number) => (
                    <li
                      key={index}
                      className="flex items-center justify-between bg-gray-200 rounded p-4 mb-4"
                    >
                      <div>
                        <span>{item.name}</span> -
                        <span>${item.price.toFixed(2)}</span>
                      </div>
                      <button
                        className="ml-4 p-1 rounded bg-red-600 text-white"
                        onClick={() => removeItemFromCart(item.name)}
                      >
                        Remove
                      </button>
                    </li>
                  ))}
                </ul>

                <div className="flex items-center justify-between text-4xl mt-8">
                  <h1>Total: ${totalPrice}</h1>

                  <button
                    className="bg-green-600 text-white py-2 px-3 rounded"
                    onClick={async () => {
                      setLoading(true);
                      try {
                        const { session } = (await axios.post('/api/checkout', {
                          products: cartItems,
                        })) as any;

                        const stripe = await getStripe();
                        void stripe?.redirectToCheckout({
                          sessionId: session.id,
                        });
                      } catch (err) {
                        console.log(err);
                      }
                    }}
                  >
                    Pay ${totalPrice} by Stripe {loading && '...'}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Cart;
