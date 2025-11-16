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
        <title>Product Launching | Hammad</title>
      </Head>
      <Layout>
        <div className="relative min-h-[80vh] py-20">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-sky-500/10 to-yellow-500/10"></div>
          <div className="container relative z-10">
            <div className="max-w-4xl mx-auto">
              <div className="bg-white/70 backdrop-blur-xl border border-blue-200/30 rounded-3xl shadow-2xl overflow-hidden">
                <header className="bg-gradient-to-r from-blue-500 to-blue-600 text-black p-8">
                  <h1 className="text-3xl md:text-6xl font-bold">
                    Product Launching
                  </h1>
                </header>

                <div className="p-8 space-y-8">
                  {/* Contact Buttons */}
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

                  {/* -------- NEW CONTENT START -------- */}
                  <section className="space-y-4 text-gray-700 leading-relaxed">
                    <h2 className="text-2xl font-bold text-blue-700">
                      Launch Your Product With Confidence & Maximum Visibility
                    </h2>

                    <p>
                      A successful product launch determines how fast you rank,
                      get reviews, and generate initial traction. My Product
                      Launching service ensures your product enters the market
                      with a winning strategy—optimized for visibility,
                      conversions, and competitive positioning.
                    </p>

                    <h3 className="text-xl font-semibold text-blue-600">
                      🚀 What’s Included
                    </h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>
                        <strong>Launch Strategy:</strong> Tailored plan based on
                        market, competition, and keyword analysis.
                      </li>
                      <li>
                        <strong>SEO-Optimized Listing:</strong> Keyword-rich
                        title, bullets, and description for strong ranking.
                      </li>
                      <li>
                        <strong>Keyword Targeting:</strong> High-search-volume
                        keywords prioritized for PPC + ranking.
                      </li>
                      <li>
                        <strong>PPC Launch Setup:</strong> Campaign structure
                        designed to boost ranking with minimal cost.
                      </li>
                      <li>
                        <strong>Competitor Analysis:</strong> Deep insights into
                        pricing, reviews, and launch patterns.
                      </li>
                      <li>
                        <strong>Promotional Strategy:</strong> Custom plan for
                        giveaways, discounts, or traffic boosts.
                      </li>
                    </ul>

                    <h3 className="text-xl font-semibold text-blue-600">
                      📈 Deliverables
                    </h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Complete product launch plan.</li>
                      <li>Competitor ranking & keyword breakdown.</li>
                      <li>Listing optimization recommendations.</li>
                      <li>PPC keyword and campaign structure.</li>
                      <li>14-day launch execution roadmap.</li>
                    </ul>

                    <h3 className="text-xl font-semibold text-blue-600">
                      🎯 Who Is It For?
                    </h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>New sellers launching their first product.</li>
                      <li>Sellers struggling with visibility or ranking.</li>
                      <li>Anyone planning a relaunch or rebranding.</li>
                    </ul>

                    <h3 className="text-xl font-semibold text-blue-600">
                      💡 Why This Service?
                    </h3>
                    <p>
                      A poorly executed launch wastes time, money, and ranking
                      opportunities. With my experience and data-driven
                      approach, your product gets the visibility it needs from
                      day one—reducing costs and increasing long-term stability.
                    </p>
                  </section>
                  {/* -------- NEW CONTENT END -------- */}

                  {/* Add to Cart */}
                  <div className="p-4 w-full flex items-center justify-end">
                    <button
                      onClick={() => {
                        cart.addItemToCart({
                          name: 'Product Launching',
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
