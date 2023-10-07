import { NextPage } from 'next';
import Head from 'next/head';
import Layout from '../../components/layout/layout';
import { BsWhatsapp } from 'react-icons/bs';
import Link from 'next/link';

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

const ServicePage: NextPage = () => {
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
              <header className="rounded-lg bg-gray-700 text-white p-4 mb-10">
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

              <div className="mt-10 flex items-center space-x-4">
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
          </div>
        </div>
      </Layout>
    </>
  );
};

export default ServicePage;
