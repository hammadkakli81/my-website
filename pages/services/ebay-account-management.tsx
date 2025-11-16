import { NextPage } from 'next';
import Head from 'next/head';
import Layout from '../../components/layout/layout';
import { BsWhatsapp } from 'react-icons/bs';
import Link from 'next/link';

import { useCart } from '@/contexts/cart-context';
import { useContext } from 'react';
import NotificationContext from '@/contexts/notification-context';

const PRICE = 400; // IN USD

const ServicePage: NextPage = () => {
  const cart = useCart();
  const notification = useContext(NotificationContext);

  return (
    <>
      <Head>
        <title>eBay Account Management | Hammad</title>
      </Head>
      <Layout>
        <div className="relative min-h-[80vh] py-20">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-sky-500/10 to-yellow-500/10"></div>
          <div className="container relative z-10">
            <div className="max-w-4xl mx-auto">
              <div className="bg-white/70 backdrop-blur-xl border border-blue-200/30 rounded-3xl shadow-2xl overflow-hidden">
                <header className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-8">
                  <h1 className="text-3xl md:text-6xl font-bold">
                    eBay Account Management
                  </h1>
                </header>

                <div className="p-8 space-y-8">
                  {/* Contact Buttons */}
                  <div className="flex flex-wrap items-center gap-4 mb-6">
                    <a
                      target="_blank"
                      href="https://wa.me/+923008089934"
                      className="px-8 py-4 flex items-center space-x-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 transition text-white rounded-xl shadow-lg hover:shadow-xl"
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

                  {/* ---- NEW CONTENT START ---- */}

                  <section className="space-y-4 text-gray-700 leading-relaxed">
                    <h2 className="text-2xl font-bold text-blue-700">
                      What’s Included in My eBay Account Management Service
                    </h2>
                    <p>
                      Managing an eBay store requires consistency, expertise,
                      and an understanding of how eBay’s algorithm works. My
                      service is designed to optimize, grow, and maintain your
                      store while you focus on scaling your business.
                    </p>

                    <h3 className="text-xl font-semibold text-blue-600">
                      🚀 Service Features
                    </h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>
                        <strong>Store Setup & Optimization:</strong>{' '}
                        Professional store creation, branding, categories, and
                        policies.
                      </li>
                      <li>
                        <strong>Listing Creation & SEO:</strong> SEO-optimized
                        titles, descriptions, pricing, and item specifics.
                      </li>
                      <li>
                        <strong>Product Research:</strong> Winning products,
                        competitor analysis, and niche research.
                      </li>
                      <li>
                        <strong>Order Management:</strong> Daily order handling,
                        messages, tracking, and dispute resolution.
                      </li>
                      <li>
                        <strong>Account Health Management:</strong> Monitoring
                        metrics, avoiding violations, managing feedback.
                      </li>
                      <li>
                        <strong>Promotions & Growth:</strong> Promoted listings,
                        seasonal campaigns, and growth roadmap.
                      </li>
                      <li>
                        <strong>Customer Support:</strong> Professional
                        communication, handling returns & cancellations.
                      </li>
                    </ul>

                    <h3 className="text-xl font-semibold text-blue-600">
                      💼 Who This Service Is For
                    </h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>
                        New sellers wanting a professionally managed eBay store.
                      </li>
                      <li>Busy entrepreneurs needing daily management.</li>
                      <li>
                        Brands and businesses scaling their eCommerce
                        operations.
                      </li>
                      <li>
                        Sellers struggling with low sales or bad account health.
                      </li>
                    </ul>

                    <h3 className="text-xl font-semibold text-blue-600">
                      📦 Deliverables
                    </h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Fully optimized and managed eBay store.</li>
                      <li>Daily operations + customer management.</li>
                      <li>Sales growth strategy & ongoing improvements.</li>
                      <li>Professional reporting and communication.</li>
                    </ul>
                  </section>

                  {/* ---- NEW CONTENT END ---- */}

                  {/* Add to Cart Button */}
                  <div className="p-4 w-full flex items-center justify-end">
                    <button
                      onClick={() => {
                        cart.addItemToCart({
                          name: 'Ebay Account Management',
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
