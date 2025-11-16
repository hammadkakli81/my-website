import { NextPage } from 'next';
import Head from 'next/head';
import Layout from '../../components/layout/layout';
import { BsWhatsapp } from 'react-icons/bs';
import Link from 'next/link';

import { useCart } from '@/contexts/cart-context';
import { useContext } from 'react';
import NotificationContext from '@/contexts/notification-context';

const PRICE = 800; // IN USD

const ServicePage: NextPage = () => {
  const cart = useCart();
  const notification = useContext(NotificationContext);
  return (
    <>
      <Head>
        <title>US Trademark Registration | Hammad</title>
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
                    US Trademark Registration
                  </h1>
                  <p className="mt-4 text-lg md:text-xl opacity-90">
                    Protect your brand legally in the United States with a
                    verified and professionally filed trademark application
                    through USPTO. Secure your intellectual property and stop
                    competitors from copying your brand name.
                  </p>
                </header>

                <div className="p-8 space-y-10">
                  {/* CONTACT BUTTONS */}
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

                  {/* OVERVIEW */}
                  <section>
                    <h2 className="text-2xl font-bold mb-3">
                      Service Overview
                    </h2>
                    <p className="text-gray-700 leading-relaxed">
                      The <strong>US Trademark Registration</strong> service
                      includes everything you need to legally protect your brand
                      name, logo, or slogan in the United States. Your
                      application will be filed with the{' '}
                      <strong>
                        USPTO (United States Patent and Trademark Office)
                      </strong>
                      with complete accuracy, proper classification, and
                      compliance to avoid rejections.
                    </p>
                  </section>

                  {/* WHAT'S INCLUDED */}
                  <section>
                    <h2 className="text-2xl font-bold mb-3">What’s Included</h2>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700">
                      <li>
                        Comprehensive trademark search and clearance report
                      </li>
                      <li>Application preparation and USPTO filing</li>
                      <li>Proper class selection for your goods/services</li>
                      <li>Attorney-level formatting for maximum acceptance</li>
                      <li>Guidance on usage and specimen requirements</li>
                      <li>
                        Monitoring your application through all USPTO stages
                      </li>
                      <li>Response guidance for office actions (if needed)</li>
                    </ul>
                  </section>

                  {/* REQUIREMENTS */}
                  <section>
                    <h2 className="text-2xl font-bold mb-3">Requirements</h2>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700">
                      <li>Brand name, logo, or slogan</li>
                      <li>Your business name and details</li>
                      <li>Product or service description</li>
                      <li>Proof of usage (if filing under “in use”)</li>
                      <li>Owner information (individual or company)</li>
                    </ul>
                  </section>

                  {/* DELIVERY TIMELINE */}
                  <section>
                    <h2 className="text-2xl font-bold mb-3">Delivery Time</h2>
                    <p className="text-gray-700 leading-relaxed">
                      Application preparation and filing usually takes{' '}
                      <strong>2–5 business days</strong>. Total USPTO processing
                      time varies from <strong>6 to 12 months</strong> depending
                      on the trademark class and workload.
                    </p>
                  </section>

                  {/* WHY CHOOSE ME */}
                  <section>
                    <h2 className="text-2xl font-bold mb-3">
                      Why Choose This Service?
                    </h2>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700">
                      <li>
                        High acceptance rate with properly structured
                        applications
                      </li>
                      <li>Accurate class selection to avoid USPTO refusal</li>
                      <li>Years of experience in US brand protection</li>
                      <li>Transparent pricing — no hidden fees or surprises</li>
                      <li>Full support from filing to final registration</li>
                    </ul>
                  </section>

                  {/* ADD TO CART */}
                  <div className="p-4 w-full flex items-center justify-end">
                    <button
                      onClick={() => {
                        cart.addItemToCart({
                          name: 'US Trademark Registration',
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
