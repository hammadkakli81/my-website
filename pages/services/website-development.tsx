import { NextPage } from 'next';
import Head from 'next/head';
import Layout from '../../components/layout/layout';
import { BsWhatsapp } from 'react-icons/bs';
import Link from 'next/link';

import { useCart } from '@/contexts/cart-context';
import { useContext } from 'react';
import NotificationContext from '@/contexts/notification-context';

const PRICE = 300; // IN USD

const ServicePage: NextPage = () => {
  const cart = useCart();
  const notification = useContext(NotificationContext);
  return (
    <>
      <Head>
        <title>Website Development | Hammad</title>
      </Head>
      <Layout>
        <div className="relative min-h-[80vh] py-20">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-sky-500/10 to-yellow-500/10"></div>
          <div className="container relative z-10">
            <div className="max-w-4xl mx-auto">
              <div className="bg-white/70 backdrop-blur-xl border border-blue-200/30 rounded-3xl shadow-2xl overflow-hidden">
                <header className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-8">
                  <h1 className="text-3xl md:text-6xl font-bold">
                    Website Development
                  </h1>
                </header>

                <div className="p-8">
                  {/* ---------------- CONTENT ADDED BELOW ---------------- */}

                  <section className="mb-10">
                    <h2 className="text-2xl font-bold mb-3 text-blue-700">
                      Professional Website Development
                    </h2>
                    <p className="text-gray-700 leading-relaxed">
                      I provide fully customized, high-performance website
                      development services designed to help businesses build a
                      strong online presence. Whether you need a portfolio,
                      business site, landing page, or an advanced web
                      application — I deliver fast, secure, and responsive
                      websites built with modern technologies.
                    </p>
                  </section>

                  <section className="mb-10">
                    <h3 className="text-xl font-semibold mb-2 text-blue-600">
                      What’s Included?
                    </h3>
                    <ul className="list-disc pl-6 text-gray-700 space-y-2">
                      <li>
                        Fully responsive website (mobile, tablet, desktop)
                      </li>
                      <li>Custom UI/UX design tailored to your brand</li>
                      <li>SEO-optimized structure and content</li>
                      <li>Fast-loading and high-performance pages</li>
                      <li>Contact forms, live chat, pop-ups, integrations</li>
                      <li>Secure hosting setup & deployment</li>
                      <li>Unlimited revisions until you are satisfied</li>
                    </ul>
                  </section>

                  <section className="mb-10">
                    <h3 className="text-xl font-semibold mb-2 text-blue-600">
                      Technologies I Use
                    </h3>
                    <p className="text-gray-700">
                      Next.js, React, Tailwind CSS, Node.js, WordPress, Shopify,
                      Firebase, APIs, and more.
                    </p>
                  </section>

                  <section className="mb-10">
                    <h3 className="text-xl font-semibold mb-2 text-blue-600">
                      Why Choose Me?
                    </h3>
                    <ul className="list-disc pl-6 text-gray-700 space-y-2">
                      <li>Clean, optimized, and scalable code</li>
                      <li>Modern UI design with smooth UX</li>
                      <li>Fast delivery and professional communication</li>
                      <li>100% satisfaction guarantee</li>
                    </ul>
                  </section>

                  {/* ---------------- END CONTENT ---------------- */}

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

                  <div className="p-4 w-full flex items-center justify-end">
                    <button
                      onClick={() => {
                        cart.addItemToCart({
                          name: 'Website Development',
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
