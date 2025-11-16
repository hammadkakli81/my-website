import { NextPage } from 'next';
import Head from 'next/head';
import Layout from '../../components/layout/layout';
import ServiceDetail from '../../components/service-detail';

const PRICE = 120;

const ServicePage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Amazon Account Creation | Hammad</title>
      </Head>
      <Layout>
        <ServiceDetail
          title="Amazon Account Creation"
          price={PRICE}
          shortDescription="Full setup of your Amazon Seller account with correct tax settings, bank/payment setup, identity verification and launch-ready configuration. Ideal for first-time sellers."
          features={[
            'Account type recommendation',
            'Verification & KYC support',
            'Bank & payment setup',
            'Initial settings & policies',
          ]}
          deliverables={[
            'Seller Central account ready to use',
            'Checklist of used documents',
            'Quick-start guide for listings',
          ]}
        />
      </Layout>
    </>
  );
};

export default ServicePage;
