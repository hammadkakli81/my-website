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
        <title>Brand Registry | Hammad</title>
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
                    Brand Registry
                  </h1>
                </header>

                {/* CONTENT */}
                <div className="p-8">
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

                  {/* SHORT DESCRIPTION */}
                  <section className="mb-8">
                    <h2 className="text-2xl font-bold mb-3 text-gray-800">
                      Service Overview
                    </h2>
                    <p className="text-gray-700 leading-relaxed">
                      Secure your brand on Amazon with hassle-free Brand
                      Registry assistance. I guide you through the entire
                      process, ensuring proper documentation, approval, and
                      protection against unauthorized sellers. A smooth,
                      professional setup for long-term brand safety.
                    </p>
                  </section>

                  {/* FEATURES */}
                  <section className="mb-8">
                    <h2 className="text-2xl font-bold mb-3 text-gray-800">
                      Key Features
                    </h2>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700">
                      <li>Complete Brand Registry application assistance</li>
                      <li>Guidance for trademark requirements (USPTO/WIPO)</li>
                      <li>Document verification & compliance support</li>
                      <li>Brand ownership verification steps</li>
                      <li>Professional follow-ups to speed up approval</li>
                      <li>ASIN protection guidance post-approval</li>
                    </ul>
                  </section>

                  {/* DELIVERABLES */}
                  <section className="mb-8">
                    <h2 className="text-2xl font-bold mb-3 text-gray-800">
                      What You Will Receive
                    </h2>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700">
                      <li>
                        Brand Registry approved (based on Amazon’s approval
                        criteria)
                      </li>
                      <li>Full checklist of required documents</li>
                      <li>
                        Step-by-step guidance for trademark submission (if
                        needed)
                      </li>
                      <li>Submission of case + follow-up messages</li>
                      <li>Brand protection guidelines</li>
                      <li>Post-approval support for adding ASINs</li>
                    </ul>
                  </section>

                  {/* ADD TO CART */}
                  <div className="p-4 w-full flex items-center justify-end">
                    <button
                      onClick={() => {
                        cart.addItemToCart({
                          name: 'Brand Registry',
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
