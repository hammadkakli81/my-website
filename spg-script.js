const fs = require('fs/promises');
const prettier = require('prettier');
const path = require('path');

const services = [
  {
    name: 'Amazon Account Management',
    slug: 'amazon-account-management',
    _id: '64d363a4ebca7bf83cd296a4',
  },
  {
    name: 'Website Development',
    slug: 'Website-Development',
    _id: '65216b6e500ebb4e42395250',
  },
  {
    name: 'Domain and Hosting',
    slug: 'Domain-and-Hosting',
    _id: '65216b6e500ebb4e42395251',
  },
  {
    name: 'ITIN Registration',
    slug: 'ITIN-Registration',
    _id: '65216b6e500ebb4e42395253',
  },
  {
    name: 'US Physical Bank Account',
    slug: 'US-Physical-Bank-Account',
    _id: '65216b6e500ebb4e42395254',
  },
  {
    name: 'US LLC ANNUAL REPORT AND SALES TAX FILING',
    slug: 'US-LLC-ANNUAL-REPORT-AND-SALES-TAX-FILING',
    _id: '65216b6e500ebb4e42395255',
  },
  { name: 'VPS', slug: 'VPS', _id: '65216b6e500ebb4e42395256' },
  {
    name: 'UK LTD Formation',
    slug: 'UK-LTD-Formation',
    _id: '64e6043a96a5aa69de442796',
  },
  {
    name: 'Amazon Account Creation',
    slug: 'amazon-account-creation',
    _id: '64d363a4ebca7bf83cd296a6',
  },
  {
    name: 'Product Hunting',
    slug: 'product-hunting',
    _id: '64d363a4ebca7bf83cd296a7',
  },
  {
    name: 'Supplier Hunting',
    slug: 'supplier-hunting',
    _id: '64d363a4ebca7bf83cd296a8',
  },
  {
    name: 'Product Launching',
    slug: 'product-launching',
    _id: '64d363a4ebca7bf83cd296a9',
  },
  {
    name: 'Product Ranking',
    slug: 'Product-Ranking',
    _id: '64d363a4ebca7bf83cd296aa',
  },
  {
    name: 'Walmart Account Management',
    slug: 'walmart-account-management',
    _id: '64d363a4ebca7bf83cd296ab',
  },
  {
    name: 'eBay Account Management',
    slug: 'ebay-account-management',
    _id: '64d363a4ebca7bf83cd296ac',
  },
  {
    name: 'Utility Bill',
    slug: 'Utility-Bill',
    _id: '65216b6e500ebb4e4239525f',
  },
  {
    name: 'US Trademark Registration',
    slug: 'US-Trademark-Registration',
    _id: '64e6043a96a5aa69de44279e',
  },
  {
    name: 'UK Trademark Registration',
    slug: 'UK-Trademark-Registration',
    _id: '65216b6e500ebb4e42395261',
  },
  {
    name: 'Brand Registry',
    slug: 'Brand-Registry',
    _id: '65216b6e500ebb4e42395262',
  },
  {
    name: 'Virtual Bank Accounts',
    slug: 'Virtual-Bank-Accounts',
    _id: '65216b6e500ebb4e42395263',
  },
];

const promises = services.map(async service => {
  const html = `import { NextPage } from 'next';
    import Head from 'next/head';
    import Layout from '../../components/layout/layout';
    import { BsWhatsapp } from 'react-icons/bs';
    import Link from 'next/link';

    const ServicePage: NextPage = () => {
        return (
        <>
            <Head>
            <title>${service.name} | Hammad</title>
            </Head>
            <Layout>
            <div className="text-xl md:text-3xl bg-gray-100 font-sans my-10 md:my-24 text-gray-900">
                <div className="overflow-hidden max-w-screen-md mx-auto rounded-lg bg-white shadow-2xl mt-8">
                <header className="bg-blue-500 text-white p-8 mb-2">
                    <h1 className="text-3xl md:text-6xl">${service.name}</h1>
                </header>
    
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
                </div>
            </div>
            </Layout>
        </>
        );
    };

    export default ServicePage;
    `;

  const formattedHtml = await prettier.format(html, {
    singleQuote: true,
    arrowParens: 'avoid',
    tabWidth: 2,
  });

  return fs.writeFile(
    path.join(
      process.cwd(),
      'pages',
      'services',
      `${service.slug.toLowerCase()}.tsx`,
    ),
    formattedHtml,
    'utf-8',
  );
});

Promise.all(promises).then(() => console.log('🚀 Done'));
