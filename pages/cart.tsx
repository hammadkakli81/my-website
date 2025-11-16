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
        <div className="px-10 py-[50px] w-full flex items-center justify-center min-h-[80vh] relative">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-sky-500/10 to-yellow-500/10"></div>
          <div className="text-4xl relative z-10 bg-white/70 backdrop-blur-xl border border-blue-200/30 rounded-3xl p-8 shadow-2xl max-w-4xl w-full">
            <h1 className="text-6xl mb-8 text-gray-800 font-bold">Your Cart</h1>
            {cartItems.length === 0 ? (
              <div>
                <p className="text-xl text-gray-700">Your cart is empty</p>
              </div>
            ) : (
              <>
                <ul className="mb-8">
                  {cartItems.map((item: any, index: number) => (
                    <li
                      key={index}
                      className="flex items-center justify-between bg-white/70 backdrop-blur-md border border-blue-200/30 rounded-2xl p-4 mb-4 text-gray-800 hover:bg-white/85 transition-all"
                    >
                      <div className="font-medium">
                        <span>{item.name}</span> -
                        <span>${item.price.toFixed(2)}</span>
                      </div>
                      <button
                        className="ml-4 p-2 rounded-xl bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 transition-all shadow-lg hover:shadow-xl"
                        onClick={() => removeItemFromCart(item.name)}
                      >
                        Remove
                      </button>
                    </li>
                  ))}
                </ul>

                <div className="flex items-center justify-between text-4xl mt-8 text-gray-800">
                  <h1 className="font-bold">Total: ${totalPrice.toFixed(2)}</h1>

                  <button
                    className="bg-gradient-to-r from-green-500 to-green-600 text-white py-3 px-6 rounded-xl hover:from-green-600 hover:to-green-700 transition-all shadow-lg hover:shadow-xl font-semibold"
                    onClick={async () => {
                      setLoading(true);
                      try {
                        const {
                          data: { session },
                        } = (await axios.post('/api/checkout', {
                          products: cartItems,
                        })) as any;

                        console.log(session);

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
