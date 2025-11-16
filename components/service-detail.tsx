import React from 'react';
import { BsWhatsapp } from 'react-icons/bs';
import Link from 'next/link';
import { useCart } from '@/contexts/cart-context';
import { useContext } from 'react';
import NotificationContext from '@/contexts/notification-context';

type Props = {
  title: string;
  price?: number;
  shortDescription: string;
  features?: string[];
  deliverables?: string[];
  contactPhone?: string;
};

const ServiceDetail: React.FC<Props> = ({
  title,
  price = 0,
  shortDescription,
  features = [],
  deliverables = [],
  contactPhone = '+923008089934',
}) => {
  const cart = useCart();
  const notification = useContext(NotificationContext);

  const addToCart = () => {
    cart.addItemToCart({ name: title, price });
    notification.showNotification({
      type: 'success',
      notificationText: 'Item added in cart',
    });
  };

  return (
    <div className="relative min-h-[70vh] py-16">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/6 via-sky-400/6 to-yellow-400/6"></div>
      <div className="container relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/80 backdrop-blur-xl border border-blue-200/30 rounded-3xl shadow-2xl overflow-hidden">
            <header className="bg-gradient-to-r from-blue-600 to-sky-500 text-black p-8">
              <h1 className="text-3xl md:text-4xl text-black font-extrabold">{title}</h1>
            </header>

            <div className="p-8 space-y-6">
              <p className="text-gray-800 leading-relaxed text-lg">
                {shortDescription}
              </p>

              {features.length > 0 && (
                <section>
                  <h3 className="text-xl font-semibold mb-3">What youll get</h3>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {features.map((f, idx) => (
                      <li
                        key={idx}
                        className="bg-white border rounded-lg p-3 shadow-sm"
                      >
                        <strong className="text-blue-600">{f}</strong>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {deliverables.length > 0 && (
                <section>
                  <h3 className="text-xl font-semibold mb-3">Deliverables</h3>
                  <ol className="list-decimal list-inside space-y-1 text-gray-700">
                    {deliverables.map((d, i) => (
                      <li key={i}>{d}</li>
                    ))}
                  </ol>
                </section>
              )}

              <div className="flex flex-wrap items-center gap-4">
                <a
                  target="_blank"
                  rel="noreferrer"
                  href={`https://wa.me/${contactPhone.replace(/[+\s]/g, '')}`}
                  className="px-6 py-3 flex items-center space-x-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 transition text-black rounded-lg shadow"
                >
                  <span>Message on WhatsApp</span>
                  <BsWhatsapp />
                </a>

                <Link
                  href="/contact"
                  className="px-6 py-3 bg-white/90 backdrop-blur-md border border-blue-100 text-gray-800 rounded-lg hover:bg-white transition shadow"
                >
                  Email / Contact Form
                </Link>

                <div className="ml-auto flex items-center gap-3">
                  <button
                    onClick={addToCart}
                    className="px-5 py-3 rounded-lg bg-gradient-to-r from-indigo-600 to-violet-600 text-black font-semibold shadow hover:opacity-95 transition"
                  >
                    {price > 0
                      ? `Price: $${price} - Add to cart`
                      : 'Add to cart'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetail;
