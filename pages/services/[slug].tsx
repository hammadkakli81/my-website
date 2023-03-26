import {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
  NextPage,
} from 'next';
import { Service } from '../../common-types/service';
import { allServices } from '../../data/all-services';
import SingleService from '../../components/services/single-service';
import Head from 'next/head';
import Layout from '../../components/layout/layout';

const ServicePage: NextPage<
  InferGetStaticPropsType<typeof getStaticProps>
> = props => {
  return (
    <>
      <Head>
        <title>{props.service.name} | Hammad</title>
      </Head>
      <Layout>
        <SingleService service={props.service} />
      </Layout>
    </>
  );
};

interface StaticReturnType {
  service: Service;
}

// Build the pages with this data (service)
export const getStaticProps: GetStaticProps<StaticReturnType> = context => {
  const slug = context.params?.slug;
  const service = allServices.find(service => {
    return service.slug === slug;
  });

  return {
    props: {
      service: service as Service,
    },
    notFound: service === undefined,
  };
};

// Which pages we want to build (currently all of them)
export const getStaticPaths: GetStaticPaths = () => {
  const paths = allServices.map(service => {
    return { params: { slug: service.slug } };
  });

  return {
    paths,
    // We have built as many pages, as their all whole services
    fallback: false,
  };
};

export default ServicePage;
