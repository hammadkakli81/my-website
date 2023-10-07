import { NextPage } from 'next';
import Head from 'next/head';
import About from '../components/about';
import Layout from '../components/layout/layout';

const AboutPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>About me | Hammad</title>
        <meta
          name="description"
          content="Experienced Professional Freelancer with a demonstrated history of
          working in the E-Commerce/internet industry."
        />
      </Head>
      <Layout>
        <About />
      </Layout>
    </>
  );
};

export default AboutPage;
