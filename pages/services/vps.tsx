import { NextPage } from 'next';
import Head from 'next/head';
import Layout from '../../components/layout/layout';
import { BsWhatsapp } from 'react-icons/bs';
import Link from 'next/link';

import { useCart } from '@/contexts/cart-context';
import { useContext } from 'react';
import NotificationContext from '@/contexts/notification-context';

const PRICE = 40; // IN USD

const ServicePage: NextPage = () => {
  const cart = useCart();
  const notification = useContext(NotificationContext);
  return (
    <>
      <Head>
        <title>VPS | Hammad</title>
      </Head>
      <Layout>
        <div className="relative min-h-[80vh] py-20">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-sky-500/10 to-yellow-500/10"></div>
          <div className="container relative z-10">
            <div className="max-w-4xl mx-auto">
              <div className="bg-white/70 backdrop-blur-xl border border-blue-200/30 rounded-3xl shadow-2xl overflow-hidden">
                {/* HEADER */}
                <header className="bg-gradient-to-r from-blue-500 to-blue-600 text-black p-8">
                  <h1 className="text-3xl md:text-6xl font-bold">VPS</h1>
                  <p className="mt-4 text-lg opacity-90 max-w-2xl">
                    High-performance, secure, and stable VPS hosting for
                    automation, tools, scraping, business apps, and
                    uninterrupted online operations.
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
                        Get your own fully configured Virtual Private Server
                        (VPS) for continuous uptime, fast processing, and secure
                        hosting. Whether you need it for automation, SaaS tools,
                        running scripts, bots, data scraping, cloud storage, or
                        hosting websites — this VPS gives you stable performance
                        with full control.
                      </p>
                    </section>

                    {/* FEATURES */}
                    <section>
                      <h2 className="text-2xl font-bold mb-3">Features</h2>
                      <ul className="list-disc ml-6 space-y-2">
                        <li>100% uptime guarantee (as provided by the host)</li>
                        <li>Fast SSD storage for high-speed performance</li>
                        <li>Dedicated resources (RAM, CPU, Storage)</li>
                        <li>Root access for complete control</li>
                        <li>Supports automation tools & bots</li>
                        <li>Secure environment with firewall setup</li>
                        <li>Can run 24/7 without interruption</li>
                      </ul>
                    </section>

                    {/* WHAT YOU GET */}
                    <section>
                      <h2 className="text-2xl font-bold mb-3">
                        What You Will Get
                      </h2>
                      <ul className="list-disc ml-6 space-y-2">
                        <li>Fully set up VPS account</li>
                        <li>Login panel + root credentials</li>
                        <li>OS installation (Windows / Ubuntu / Debian)</li>
                        <li>Basic security configuration</li>
                        <li>Software installation on request</li>
                        <li>Support for any setup issues</li>
                      </ul>
                    </section>

                    {/* SPECIFICATIONS */}
                    <section>
                      <h2 className="text-2xl font-bold mb-3">
                        Specifications
                      </h2>
                      <p className="leading-relaxed">
                        Standard VPS package includes:
                      </p>
                      <ul className="list-disc ml-6 mt-2 space-y-2">
                        <li>2 GB RAM</li>
                        <li>1 vCPU</li>
                        <li>40–60 GB SSD Storage</li>
                        <li>Unlimited bandwidth (depending on region)</li>
                        <li>Windows or Linux OS</li>
                      </ul>
                    </section>

                    {/* REQUIREMENTS */}
                    <section>
                      <h2 className="text-2xl font-bold mb-3">Requirements</h2>
                      <ul className="list-disc ml-6 space-y-2">
                        <li>Email address for account setup</li>
                        <li>
                          Usage purpose (Automation / Tools / Hosting / etc.)
                        </li>
                        <li>Operating system choice</li>
                      </ul>
                    </section>

                    {/* DELIVERY TIME */}
                    <section>
                      <h2 className="text-2xl font-bold mb-3">Delivery Time</h2>
                      <p className="leading-relaxed">
                        Delivery is completed within <strong>1–3 hours</strong>{' '}
                        depending on the selected operating system and required
                        software installation.
                      </p>
                    </section>

                    {/* NOTE */}
                    <section>
                      <h2 className="text-2xl font-bold mb-3">
                        Important Note
                      </h2>
                      <p className="leading-relaxed text-sm text-gray-700">
                        This VPS is intended only for legal usage. Activities
                        involving spam, illegal bots, DDoS, or any abusive
                        behavior are strictly prohibited.
                      </p>
                    </section>
                  </div>

                  {/* ADD TO CART BUTTON */}
                  <div className="p-4 w-full flex items-center justify-end">
                    <button
                      onClick={() => {
                        cart.addItemToCart({
                          name: 'VPS',
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
