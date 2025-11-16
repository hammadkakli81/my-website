import { NextPage } from 'next';
import Head from 'next/head';
import Layout from '../../components/layout/layout';
import { BsWhatsapp } from 'react-icons/bs';
import Link from 'next/link';

import { useCart } from '@/contexts/cart-context';
import { useContext } from 'react';
import NotificationContext from '@/contexts/notification-context';

const PRICE = 500; // IN USD

const ServicePage: NextPage = () => {
  const cart = useCart();
  const notification = useContext(NotificationContext);
  return (
    <>
      <Head>
        <title>Walmart Account Management | Hammad</title>
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
                    Walmart Account Management
                  </h1>
                  <p className="mt-4 text-lg opacity-90 max-w-2xl">
                    Complete Walmart seller account setup, optimization, and
                    management — from compliance handling to product listings
                    and performance growth.
                  </p>
                </header>

                <div className="p-8">
                  {/* CONTACT BUTTONS */}
                  <div className="flex flex-wrap items-center gap-4 mb-8">
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

                  {/* MAIN CONTENT */}
                  <div className="space-y-10 text-gray-800">
                    {/* OVERVIEW */}
                    <section>
                      <h2 className="text-2xl font-bold mb-3">Overview</h2>
                      <p className="leading-relaxed">
                        Walmart Marketplace is one of the fastest-growing
                        eCommerce platforms in the U.S. Our Walmart Account
                        Management service is designed for sellers who want
                        expert guidance in handling their store, staying
                        compliant, managing listings, and scaling sales without
                        stress. From onboarding to optimization, everything is
                        handled professionally.
                      </p>
                    </section>

                    {/* WHAT’S INCLUDED */}
                    <section>
                      <h2 className="text-2xl font-bold mb-3">
                        What’s Included
                      </h2>
                      <ul className="list-disc ml-6 space-y-2">
                        <li>Walmart Seller Center setup & optimization</li>
                        <li>Product listing creation + SEO optimization</li>
                        <li>Order & fulfillment management</li>
                        <li>Performance monitoring & improvement</li>
                        <li>Price competitiveness analysis</li>
                        <li>Seller health management (avoiding suspensions)</li>
                        <li>
                          Compliance guidance for approvals & requirements
                        </li>
                        <li>Handling returns, refunds, and customer issues</li>
                        <li>
                          Fast response to Walmart notifications & warnings
                        </li>
                      </ul>
                    </section>

                    {/* BENEFITS */}
                    <section>
                      <h2 className="text-2xl font-bold mb-3">
                        Why Choose This Service?
                      </h2>
                      <ul className="list-disc ml-6 space-y-2">
                        <li>Reduces risk of account deactivation</li>
                        <li>Professionally optimized product listings</li>
                        <li>Improved ranking and Buy Box visibility</li>
                        <li>
                          Faster issue resolution with Walmart Seller Support
                        </li>
                        <li>Stress-free store management for busy sellers</li>
                        <li>
                          Consistent growth strategy for long-term performance
                        </li>
                      </ul>
                    </section>

                    {/* REQUIREMENTS */}
                    <section>
                      <h2 className="text-2xl font-bold mb-3">Requirements</h2>
                      <ul className="list-disc ml-6 space-y-2">
                        <li>
                          Walmart seller account login (or we help with setup)
                        </li>
                        <li>
                          Business details (EIN, address, contact info if
                          needed)
                        </li>
                        <li>Product information (images, titles, pricing)</li>
                      </ul>
                    </section>

                    {/* DELIVERY TIME */}
                    <section>
                      <h2 className="text-2xl font-bold mb-3">Delivery Time</h2>
                      <p className="leading-relaxed">
                        Initial setup and optimization are delivered within
                        <strong> 24–48 hours</strong>. Ongoing management
                        continues as part of the service.
                      </p>
                    </section>

                    {/* NOTE */}
                    <section>
                      <h2 className="text-2xl font-bold mb-3">
                        Important Note
                      </h2>
                      <p className="leading-relaxed text-sm text-gray-700">
                        Walmart Marketplace has strict compliance policies. This
                        service ensures your account stays healthy, but sellers
                        must follow guidelines and avoid prohibited product
                        categories.
                      </p>
                    </section>
                  </div>

                  {/* ADD TO CART BUTTON */}
                  <div className="p-4 w-full flex items-center justify-end">
                    <button
                      onClick={() => {
                        cart.addItemToCart({
                          name: 'Walmart Account Management',
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
