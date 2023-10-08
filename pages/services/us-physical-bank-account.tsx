import { NextPage } from 'next';
    import Head from 'next/head';
    import Layout from '../../components/layout/layout';
    import { BsWhatsapp } from 'react-icons/bs';
    import Link from 'next/link';

    const ServicePage: NextPage = () => {
        return (
        <>
            <Head>
            <title>US Physical Bank Account | Hammad</title>
            </Head>
            <Layout>
            <div className="text-xl md:text-3xl bg-gray-100 font-sans my-10 md:my-24 text-gray-900">
                <div className="overflow-hidden max-w-screen-md mx-auto rounded-lg bg-white shadow-2xl mt-8">
                <header className="bg-blue-500 text-white p-8 mb-2">
                    <h1 className="text-3xl md:text-6xl">US Physical Bank Account</h1>
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
    