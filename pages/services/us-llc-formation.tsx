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
        <div className="text-xl md:text-3xl bg-gray-100 font-sans my-10 md:my-24 text-gray-900">
          <div className="overflow-hidden max-w-screen-md mx-auto rounded-lg bg-white shadow-2xl mt-8">
            <header className="bg-blue-500 text-white p-8 mb-2">
              <h1 className="text-3xl md:text-6xl">US LLC Formation</h1>
            </header>

            <div className="p-8">
              <div className="p-8 rounded-lg w-full border-gray-100 border-4">
                <div className="flex items-start justify-between">
                  <div className="w-[60%]">
                    <h3 className="text-4xl">
                      <span className="font-bold">Price: </span>
                      {!!selected && selected !== 'Select Service' ? (
                        `$${options[selected as keyof typeof options]}`
                      ) : (
                        <span className="italic">Please select service</span>
                      )}
                    </h3>
                  </div>
                  <div className="w-[40%]">
                    <select
                      onChange={e => setSelected(e.target.value)}
                      placeholder="Select Service"
                      className="bg-gray-100 w-full h-[40px] cursor-pointer"
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

                <div className="mt-5 flex items-center space-x-4">
                  <a
                    target="_blank"
                    href="https://wa.me/+923008089934"
                    className="px-8 py-4 flex items-center space-x-2 bg-green-600 hover:bg-green-700 transition text-white rounded-lg"
                  >
                    <span className="inline-block">Contact me on</span>
                    <BsWhatsapp />
                  </a>
                  <Link
                    href="/contact"
                    className="px-8 py-4 bg-gray-900 text-white rounded-lg hover:bg-gray-700 transition"
                  >
                    Email me
                  </Link>
                </div>
              </div>

              <header className="rounded-lg bg-gray-700 text-white p-4 my-10">
                <h1 className="text-3xl md:text-6xl">
                  Our Services and Requirements
                </h1>
              </header>
              <h2 className="text-3xl md:text-6xl mb-4">
                What will I provide in the above charges?
              </h2>
              <ul className="list-disc pl-6 mb-6 translate-x-3">
                {serviceF.features.map((feature, i) => (
                  <li key={feature + i} className="mb-2">
                    {feature}
                  </li>
                ))}
              </ul>
              <div className="bg-gray-200 rounded-lg p-8">
                <h2 className="text-3xl md:text-6xl mb-4">
                  What documents I need?
                </h2>
                <ul className="list-disc pl-6 translate-x-3">
                  {serviceF.requirements.map((requirement, i) => (
                    <li key={i + requirement} className="mb-2">
                      {requirement}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 w-full flex items-center justify-end">
                <button
                  onClick={() => {
                    if (!selected) {
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
                  className="my-2 p-4 rounded min-w-[50px] bg-green-900 text-white"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default ServicePage;
