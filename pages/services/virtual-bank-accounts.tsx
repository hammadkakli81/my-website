import { NextPage } from 'next';
import Head from 'next/head';
import Layout from '../../components/layout/layout';
import { BsWhatsapp } from 'react-icons/bs';
import Link from 'next/link';

import { useCart } from '@/contexts/cart-context';
import { useContext } from 'react';
import NotificationContext from '@/contexts/notification-context';

const PRICE = 100; // IN USD

const ServicePage: NextPage = () => {
  const cart = useCart();
  const notification = useContext(NotificationContext);
  return (
    <>
      <Head>
        <title>Virtual Bank Accounts | Hammad</title>
      </Head>
      <Layout>
        <div className="relative min-h-[80vh] py-20">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-sky-500/10 to-yellow-500/10"></div>
          <div className="container relative z-10">
            <div className="max-w-4xl mx-auto">
              <div className="bg-white/70 backdrop-blur-xl border border-blue-200/30 rounded-3xl shadow-2xl overflow-hidden">
                {/* HEADER */}
                <header className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-8">
                  <h1 className="text-3xl md:text-6xl font-bold">
                    Virtual Bank Accounts
                  </h1>
                  <p className="mt-4 text-lg opacity-90 max-w-2xl">
                    Get fully functional virtual bank accounts for international
                    payments, online subscription billing, global business
                    needs, and secure digital transactions.
                  </p>
                </header>

                <div className="p-8">
                  {/* CONTACT BUTTONS */}
                  <div className="flex flex-wrap items-center gap-4 mb-6">
                    <a
                      target="_blank"
                      href="https://wa.me/+923008089934"
                      className="px-8 py-4 flex items-center space-x-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 transition text-white rounded-xl shadow-lg hover:shadow-xl"
                    >
                      <span>Contact me on</span>
                      <BsWhatsapp />
                    </a>

                    <Link
                      href="/contact"
                      className="px-8 py-4 bg-white/80 backdrop-blur-md border border-blue-200/30 text-gray-800 rounded-xl hover:bg-white/90 transition shadow-lg hover:shadow-xl"
                    >
                      Email me
                    </Link>
                  </div>

                  {/* MAIN CONTENT */}
                  <div className="space-y-10 text-gray-800">
                    {/* OVERVIEW */}
                    <section>
                      <h2 className="text-2xl font-bold mb-3">Overview</h2>
                      <p className="leading-relaxed">
                        I help you set up reliable and verified virtual bank
                        accounts that can be used for international
                        transactions, online services, business operations, and
                        digital payments. These accounts allow you to receive
                        and send money globally with ease, without needing a
                        physical branch or local residency.
                      </p>
                    </section>

                    {/* WHAT YOU GET */}
                    <section>
                      <h2 className="text-2xl font-bold mb-3">
                        What You Will Get
                      </h2>
                      <ul className="list-disc ml-6 space-y-2">
                        <li>Fully verified virtual bank account</li>
                        <li>International IBAN or account + routing number</li>
                        <li>Online banking dashboard access</li>
                        <li>Virtual card (if applicable to the service)</li>
                        <li>Email + chat support for setup and guidance</li>
                      </ul>
                    </section>

                    {/* FEATURES */}
                    <section>
                      <h2 className="text-2xl font-bold mb-3">Features</h2>
                      <ul className="list-disc ml-6 space-y-2">
                        <li>
                          Works for global platforms including Stripe, PayPal,
                          Amazon, and more
                        </li>
                        <li>Supports international transfers</li>
                        <li>Secure and encrypted online access</li>
                        <li>Fast verification and activation</li>
                        <li>Compatible for digital business needs</li>
                      </ul>
                    </section>

                    {/* REQUIREMENTS */}
                    <section>
                      <h2 className="text-2xl font-bold mb-3">Requirements</h2>
                      <ul className="list-disc ml-6 space-y-2">
                        <li>Valid email address</li>
                        <li>
                          Basic identity information (depending on provider)
                        </li>
                        <li>Business or personal purpose of usage</li>
                      </ul>
                    </section>

                    {/* DELIVERY TIME */}
                    <section>
                      <h2 className="text-2xl font-bold mb-3">Delivery Time</h2>
                      <p className="leading-relaxed">
                        Account setup is typically completed within{' '}
                        <strong>24–48 hours</strong> depending on the platform
                        and verification requirements.
                      </p>
                    </section>

                    {/* DISCLAIMER */}
                    <section>
                      <h2 className="text-2xl font-bold mb-3">
                        Important Note
                      </h2>
                      <p className="leading-relaxed text-sm text-gray-700">
                        This service is strictly for legal, ethical, and
                        compliant usage. No fraudulent or restricted activity is
                        supported.
                      </p>
                    </section>
                  </div>

                  {/* ADD TO CART BUTTON */}
                  <div className="p-4 w-full flex items-center justify-end">
                    <button
                      onClick={() => {
                        cart.addItemToCart({
                          name: 'Virtual Bank Account',
                          price: PRICE,
                        });
                        notification.showNotification({
                          type: 'success',
                          notificationText: 'Item added in cart',
                        });
                      }}
                      className="my-2 p-4 rounded-xl min-w-[50px] bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-lg hover:shadow-xl transition font-semibold"
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
