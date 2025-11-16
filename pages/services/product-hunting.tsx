import { NextPage } from 'next';
import Head from 'next/head';
import Layout from '../../components/layout/layout';
import ServiceDetail from '../../components/service-detail';

const PRICE = 100; // IN USD

const ServicePage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Product Hunting | Hammad</title>
      </Head>
      <Layout>
        <ServiceDetail
          title="Product Hunting"
          price={PRICE}
          shortDescription="Find high-potential products with proven demand and healthy margins. I research categories, analyze competition, and shortlist items that fit your budget and brand goals."
          features={[
            'Market demand & trend analysis',
            'Competition & listing gap analysis',
            'Estimated profit & margin breakdown',
            'Sourcing recommendations',
          ]}
          deliverables={[
            'Top 5 product ideas with rationale',
            'Sales & margin estimates',
            'Suggested keywords and category',
          ]}
        />
      </Layout>
    </>
  );
};

export default ServicePage;
