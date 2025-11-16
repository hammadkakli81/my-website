import { NextPage } from 'next';
import Head from 'next/head';
import Layout from '../../components/layout/layout';
import { BsWhatsapp } from 'react-icons/bs';
import Link from 'next/link';

import { useCart } from '@/contexts/cart-context';
import { useContext } from 'react';
import NotificationContext from '@/contexts/notification-context';

const PRICE = 179; // IN USD

const ServicePage: NextPage = () => {
  const cart = useCart();
  const notification = useContext(NotificationContext);
  return (
    <>
      <Head>
        <title>Utility Bill Guidance Service | Hammad</title>
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
                    Utility Bill Guidance
                  </h1>
                  <p className="mt-4 text-lg md:text-xl opacity-90">
                    Get complete assistance in securing, verifying, and
                    formatting an authentic utility bill for address
                    verification, compliance, and account setup needs.
                  </p>
                </header>

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
                      Many platforms require a{' '}
                      <strong>valid utility bill</strong> (electricity, water,
                      gas, internet, etc.) to verify your address or activate
                      certain services. This service helps you understand the
                      exact requirements, guides you through the legal process
                      of obtaining a real bill, and ensures everything complies
                      with international verification standards.
                    </p>
                  </section>

                  {/* WHAT'S INCLUDED */}
                  <section>
                    <h2 className="text-2xl font-bold mb-3">What’s Included</h2>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700">
                      <li>
                        Guidance on how to obtain an official utility bill in
                        your region
                      </li>
                      <li>
                        Instructions on acceptable bill formats for verification
                        platforms
                      </li>
                      <li>
                        Review of your existing bill to confirm compliance
                      </li>
                      <li>
                        Understanding required fields (name, address, date,
                        provider, etc.)
                      </li>
                      <li>
                        Support for bank account, marketplace, and identity
                        verification needs
                      </li>
                      <li>
                        Document clarity optimization (layout, readability,
                        formatting)
                      </li>
                    </ul>
                  </section>

                  {/* REQUIREMENTS */}
                  <section>
                    <h2 className="text-2xl font-bold mb-3">Requirements</h2>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700">
                      <li>Your legal name and active address</li>
                      <li>
                        The purpose of the utility bill (banking, marketplace,
                        ID verification, etc.)
                      </li>
                      <li>
                        Any existing documents you want reviewed for compliance
                      </li>
                    </ul>
                  </section>

                  {/* DELIVERY TIME */}
                  <section>
                    <h2 className="text-2xl font-bold mb-3">Delivery Time</h2>
                    <p className="text-gray-700 leading-relaxed">
                      Full review and guidance are delivered within{' '}
                      <strong>24–48 hours</strong>. Additional support is
                      provided until your bill successfully meets the
                      verification requirements of your target platform.
                    </p>
                  </section>

                  {/* WHY CHOOSE ME */}
                  <section>
                    <h2 className="text-2xl font-bold mb-3">
                      Why Choose This Service?
                    </h2>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700">
                      <li>
                        Avoid verification rejections caused by incorrect bill
                        formatting
                      </li>
                      <li>
                        Expert understanding of marketplace & banking
                        verification systems
                      </li>
                      <li>
                        Fast response time with clear, step-by-step guidance
                      </li>
                      <li>
                        100% legal, compliant, and safe—no fake or altered
                        documents
                      </li>
                    </ul>
                  </section>

                  {/* ADD TO CART */}
                  <div className="p-4 w-full flex items-center justify-end">
                    <button
                      onClick={() => {
                        cart.addItemToCart({
                          name: 'Utility Bill Guidance',
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
