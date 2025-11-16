import { NextPage } from 'next';
import Head from 'next/head';
import Layout from '../../components/layout/layout';
import { BsWhatsapp } from 'react-icons/bs';
import Link from 'next/link';
import { useContext, useState } from 'react';
import { useCart } from '@/contexts/cart-context';
import NotificationContext from '@/contexts/notification-context';

const serviceF = {
  features: [
    'Unique Address with mail forwarding facility',
    'LLC Formation with articles of association',
    'US Phone No with SMS enabled',
    'Express EIN on SS4 verification',
    'Reseller Certificate for your wholesale business',
    'US Bank Account (terms and Conditions apply)',
    'Amazon seller Account (terms and Conditions apply)',
    '2 Months Free VPS',
  ],
  requirements: [
    'Passport Scanned',
    'CNIC Front Back Scanned',
    'Recent Bank Statement',
  ],
};

const options = {
  'New York': 550,
  Texas: 750,
  Florida: 550,
  Wyoming: 550,
  Delaware: 550,
  'New Mexico': 500,
  Hawaii: 500,
  Virginia: 600,
  Alaska: 600,
  Arkanasas: 550,
  California: 500,
  Colorado: 550,
  Connecticut: 550,
  Georgia: 550,
  Idaho: 550,
  Illinois: 600,
  Indiana: 550,
  Iowa: 500,
  Kansas: 550,
  Kentucky: 500,
  Louisiana: 550,
  Maine: 600,
  Maryland: 550,
  Massachusetts: 817,
  Michigan: 500,
  Minnesota: 550,
  Mississippi: 520,
  Missouri: 500,
  Montana: 520,
  Nevada: 800,
  'New Hampshire': 550,
  'New Jersey': 550,
  'North Carolina': 550,
  'North Dakota': 600,
  Ohio: 550,
  Oklahoma: 550,
  Oregon: 550,
  Pennsylvania: 600,
  'Rhode Island': 600,
  'South Carolina': 560,
  'South Dakota': 600,
  Tennessee: 700,
  Utah: 500,
  Vermont: 550,
  Washington: 600,
  'West Virginia': 550,
  Wisconsin: 600,
};

const ServicePage: NextPage = () => {
  const [selected, setSelected] = useState('');
  const cart = useCart();
  const notification = useContext(NotificationContext);

  return (
    <>
      <Head>
        <title>US LLC Formation | Hammad</title>
      </Head>
      <Layout>
        <div className="relative min-h-[80vh] py-20">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-sky-500/10 to-yellow-500/10"></div>
          <div className="container relative z-10">
            <div className="max-w-4xl mx-auto">
              <div className="bg-white/70 backdrop-blur-xl border border-blue-200/30 rounded-3xl shadow-2xl overflow-hidden">
                <header className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-8">
                  <h1 className="text-3xl md:text-6xl font-bold">US LLC Formation</h1>
                </header>

                <div className="p-8">
                  <div className="bg-white/60 backdrop-blur-md border border-blue-200/30 rounded-2xl p-6 mb-6">
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-4">
                      <div className="flex-1">
                        <h3 className="text-2xl md:text-4xl text-gray-800">
                          <span className="font-bold">Price: </span>
                          {!!selected && selected !== 'Select Service' ? (
                            <span className="text-blue-600">${options[selected as keyof typeof options]}</span>
                          ) : (
                            <span className="italic text-gray-500">Please select service</span>
                          )}
                        </h3>
                      </div>
                      <div className="w-full md:w-[40%]">
                        <select
                          onChange={e => setSelected(e.target.value)}
                          placeholder="Select Service"
                          className="bg-white/80 backdrop-blur-sm border border-blue-200/30 rounded-xl w-full h-[50px] px-4 cursor-pointer text-gray-800 focus:border-blue-400 focus:bg-white transition outline-none"
                        >
                          {['Select Service']
                            .concat(Object.keys(options))
                            .map(option => (
                              <option key={option} value={option}>
                                {option}
                              </option>
                            ))}
                        </select>
                      </div>
                    </div>

                    <div className="mt-5 flex flex-wrap items-center gap-4">
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
                  </div>

                  <div className="bg-white/60 backdrop-blur-md border border-blue-200/30 rounded-2xl p-6 mb-6">
                    <h2 className="text-2xl md:text-4xl font-bold text-gray-800 mb-6">
                      Our Services and Requirements
                    </h2>
                    <h3 className="text-xl md:text-3xl font-semibold text-gray-800 mb-4">
                      What will I provide in the above charges?
                    </h3>
                    <ul className="space-y-3 mb-6">
                      {serviceF.features.map((feature, i) => (
                        <li key={feature + i} className="flex items-start text-lg text-gray-700">
                          <span className="w-2 h-2 bg-blue-500 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-white/60 backdrop-blur-md border border-blue-200/30 rounded-2xl p-6 mb-6">
                    <h3 className="text-xl md:text-3xl font-semibold text-gray-800 mb-4">
                      What documents I need?
                    </h3>
                    <ul className="space-y-3">
                      {serviceF.requirements.map((requirement, i) => (
                        <li key={i + requirement} className="flex items-start text-lg text-gray-700">
                          <span className="w-2 h-2 bg-blue-500 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                          {requirement}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-4 w-full flex items-center justify-end">
                    <button
                      onClick={() => {
                        if (!selected || selected === 'Select Service') {
                          notification.showNotification({
                            type: 'error',
                            notificationText: 'No State Selected.',
                          });
                          return;
                        }
                        cart.addItemToCart({
                          name: 'US LLC Formation: ' + selected,
                          // @ts-ignore
                          price: options[selected],
                        });
                        notification.showNotification({
                          type: 'success',
                          notificationText: 'Item added in cart',
                        });
                      }}
                      className="my-2 p-4 rounded-xl min-w-[50px] bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-lg hover:shadow-xl transition font-semibold"
                    >
                      Add to Cart
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
