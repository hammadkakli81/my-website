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
        <title>Amazon Account Management | Hammad</title>
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
                    Amazon Account Management
                  </h1>
                </header>

                {/* CONTENT */}
                <div className="p-8">
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

                  {/* SHORT DESCRIPTION */}
                  <section className="mb-8">
                    <h2 className="text-2xl font-bold mb-3 text-gray-800">
                      Service Overview
                    </h2>
                    <p className="text-gray-700 leading-relaxed">
                      Comprehensive Amazon seller account management designed to
                      boost sales, improve operations, and scale your brand with
                      data-driven strategies. I handle everything from listing
                      optimization to PPC campaigns, ensuring consistent growth
                      and strong account health.
                    </p>
                  </section>

                  {/* FEATURES */}
                  <section className="mb-8">
                    <h2 className="text-2xl font-bold mb-3 text-gray-800">
                      Key Features
                    </h2>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700">
                      <li>Complete account setup & health management</li>
                      <li>
                        Listing optimization (SEO titles, bullets, descriptions)
                      </li>
                      <li>Advanced keyword research using premium tools</li>
                      <li>Competitor analysis & market gap identification</li>
                      <li>A+ Content / EBC guidance</li>
                      <li>Inventory planning & restock forecasting</li>
                      <li>PPC campaign setup, optimization & scaling</li>
                      <li>Customer service & order management support</li>
                      <li>Monthly performance reporting with insights</li>
                    </ul>
                  </section>

                  {/* DELIVERABLES */}
                  <section className="mb-8">
                    <h2 className="text-2xl font-bold mb-3 text-gray-800">
                      What You Will Receive
                    </h2>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700">
                      <li>Fully optimized listings (up to X SKUs)</li>
                      <li>PPC campaign structure with optimization plan</li>
                      <li>Weekly performance updates</li>
                      <li>Monthly growth report with KPIs</li>
                      <li>Keyword master file</li>
                      <li>Competitor insight report</li>
                      <li>Account health audit + improvement plan</li>
                    </ul>
                  </section>

                  {/* ADD TO CART */}
                  <div className="p-4 w-full flex items-center justify-end">
                    <button
                      onClick={() => {
                        cart.addItemToCart({
                          name: 'Amazon Account Management',
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
