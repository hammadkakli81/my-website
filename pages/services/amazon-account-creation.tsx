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
        <title>Amazon Account Creation | Hammad</title>
      </Head>
      <Layout>
        <div className="text-xl md:text-3xl bg-gray-100 font-sans my-10 md:my-24 text-gray-900">
          <div className="overflow-hidden max-w-screen-md mx-auto rounded-lg bg-white shadow-2xl mt-8">
            <header className="bg-blue-500 text-white p-8 mb-2">
              <h1 className="text-3xl md:text-6xl">Amazon Account Creation</h1>
            </header>

            <div
              style={{
                fontFamily: 'Arial, sans-serif',
                backgroundColor: '#f4f4f9',
                margin: '0',
                padding: '0',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
              }}
            >
              <div
                style={{
                  backgroundColor: '#fff',
                  padding: '20px',
                  borderRadius: '8px',
                  boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
                }}
              >
                <h1
                  style={{
                    fontSize: '24px',
                    color: '#333',
                    marginBottom: '20px',
                  }}
                >
                  Documents Required for Amazon Seller Account
                </h1>
                <ul
                  style={{
                    listStyleType: 'none',
                    padding: '0',
                  }}
                >
                  {[
                    'Passport',
                    'Bank Statement',
                    'Credit Card',
                    'Address',
                    'Contact Number',
                    'Email Id',
                    'Utility Bill',
                  ].map((item, index) => (
                    <li
                      key={index}
                      style={{
                        fontSize: '18px',
                        color: '#555',
                        margin: '5px 0',
                        paddingLeft: '20px',
                        position: 'relative',
                      }}
                    >
                      {item}
                      <span
                        style={{
                          content: '•',
                          color: '#0073e6',
                          fontWeight: 'bold',
                          display: 'inline-block',
                          width: '1em',
                          marginLeft: '-1em',
                        }}
                      ></span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="p-8">
              <div className="flex items-center space-x-4">
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

            <div className="p-4 w-full flex items-center justify-end">
              <button
                onClick={() => {
                  cart.addItemToCart({
                    name: 'Amazon Account Creation',
                    price: PRICE,
                  });
                  notification.showNotification({
                    type: 'success',
                    notificationText: 'Item added in cart',
                  });
                }}
                className="my-2 p-4 rounded min-w-[50px] bg-green-900 text-white"
              >
                Price: ${PRICE} - Add to Cart
              </button>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default ServicePage;
