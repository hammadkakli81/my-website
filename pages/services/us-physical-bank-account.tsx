import { NextPage } from 'next';
import Head from 'next/head';
import Layout from '../../components/layout/layout';
import { BsWhatsapp } from 'react-icons/bs';
import Link from 'next/link';

import { useCart } from '@/contexts/cart-context';
import { useContext } from 'react';
import NotificationContext from '@/contexts/notification-context';

const PRICE = 2000; // IN USD

const ServicePage: NextPage = () => {
  const cart = useCart();
  const notification = useContext(NotificationContext);

  return (
    <>
      <Head>
        <title>US Physical Bank Account | Hammad</title>
      </Head>
      <Layout>
        <div className="relative min-h-[80vh] py-20">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-sky-500/10 to-yellow-500/10"></div>
          <div className="container relative z-10">
            <div className="max-w-4xl mx-auto">
              <div className="bg-white/70 backdrop-blur-xl border border-blue-200/30 rounded-3xl shadow-2xl overflow-hidden">
                {/* HEADER */}
                <header className="bg-gradient-to-r from-blue-500 to-blue-600 text-black p-8">
                  <h1 className="text-3xl md:text-6xl font-bold">
                    US Physical Bank Account
                  </h1>
                  <p className="mt-4 text-lg md:text-xl opacity-90">
                    Get a real, fully-compliant US-based bank account to operate
                    your eCommerce, Amazon, Stripe, or international business
                    operations without needing to visit the United States.
                  </p>
                </header>

                {/* MAIN CONTENT */}
                <div className="p-8 space-y-10">
                  {/* CONTACT BUTTONS */}
                  <div className="flex flex-wrap items-center gap-4 mb-6">
                    <a
                      target="_blank"
                      href="https://wa.me/+923008089934"
                      className="px-8 py-4 flex items-center space-x-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 transition text-black rounded-xl shadow-lg hover:shadow-xl"
                    >
                      <span className="inline-block">Contact me on</span>
                      <BsWhatsapp />
                    </a>

                    <Link
                      href="/contact"
                      className="px-8 py-4 bg-white/80 backdrop-blur-md border border-blue-200/30 text-gray-800 rounded-xl hover:bg-white/90 transition shadow-lg hover:shadow-xl"
                    >
                      Email me
                    </Link>
                  </div>

                  {/* OVERVIEW */}
                  <section>
                    <h2 className="text-2xl font-bold mb-3">
                      Service Overview
                    </h2>
                    <p className="text-gray-700 leading-relaxed">
                      This service provides you with a{' '}
                      <strong>verified, physical US bank account</strong>
                      suitable for receiving international payments, using
                      payment processors like Stripe, and managing US-based
                      business operations. No personal visit to the United
                      States is required — the process is handled entirely
                      online with legal compliance and banking security.
                    </p>
                  </section>

                  {/* WHAT'S INCLUDED */}
                  <section>
                    <h2 className="text-2xl font-bold mb-3">What’s Included</h2>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700">
                      <li>
                        Verified US business bank account (physical bank, not
                        fintech)
                      </li>
                      <li>Online banking + debit card issuance</li>
                      <li>ACH, Wire, and international transaction support</li>
                      <li>
                        Full compliance assistance during the onboarding process
                      </li>
                      <li>
                        Guidance for linking with Amazon, Stripe, PayPal,
                        Shopify, etc.
                      </li>
                      <li>Support for future account maintenance</li>
                    </ul>
                  </section>

                  {/* REQUIREMENTS */}
                  <section>
                    <h2 className="text-2xl font-bold mb-3">Requirements</h2>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700">
                      <li>Passport or National ID (valid)</li>
                      <li>
                        LLC documents (If you don’t have one, I can help you
                        create it)
                      </li>
                      <li>
                        Basic personal information for banking verification
                      </li>
                      <li>Business details or intended use for the account</li>
                    </ul>
                  </section>

                  {/* DELIVERY TIME */}
                  <section>
                    <h2 className="text-2xl font-bold mb-3">Delivery Time</h2>
                    <p className="text-gray-700 leading-relaxed">
                      Typical account approval takes{' '}
                      <strong>7–14 business days</strong>, depending on the
                      bank’s verification workload. You will receive login
                      details, online banking access, and instructions for
                      usage.
                    </p>
                  </section>

                  {/* WHY CHOOSE ME */}
                  <section>
                    <h2 className="text-2xl font-bold mb-3">
                      Why Choose This Service?
                    </h2>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700">
                      <li>
                        Legitimate banking — not virtual or workaround methods
                      </li>
                      <li>
                        End-to-end personal support until account activation
                      </li>
                      <li>
                        Years of experience handling global compliance
                        requirements
                      </li>
                      <li>
                        High success rate with international entrepreneurs
                      </li>
                      <li>No hidden fees — clear, one-time payment</li>
                    </ul>
                  </section>

                  {/* ADD TO CART BUTTON */}
                  <div className="p-4 w-full flex items-center justify-end">
                    <button
                      onClick={() => {
                        cart.addItemToCart({
                          name: 'US Physical Bank Account',
                          price: PRICE,
                        });
                        notification.showNotification({
                          type: 'success',
                          notificationText: 'Item added in cart',
                        });
                      }}
                      className="my-2 p-4 rounded-xl min-w-[50px] bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-black shadow-lg hover:shadow-xl transition font-semibold"
                    >
                      Price: ${PRICE} - Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default ServicePage;
