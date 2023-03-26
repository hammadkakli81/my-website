import { NextPage } from 'next';
import Head from 'next/head';
import ContactForm from '../components/contact-form';
import Layout from '../components/layout/layout';

const ContactPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Contact Me | Hammad</title>
        <meta name="description" content="Contact Me" />
      </Head>
      <Layout>
        <ContactForm />
      </Layout>
    </>
  );
};

export default ContactPage;
