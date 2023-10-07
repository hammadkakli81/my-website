import { getServerSideSitemapLegacy, type ISitemapField } from 'next-sitemap';
import { GetServerSideProps } from 'next';
import { getBlogs } from '@/utils/blogs.utils';
import { getTrainings } from '@/utils/trainings.utils';
import { getServices } from '@/utils/services.utils';

export const getServerSideProps: GetServerSideProps = async ctx => {
  const [blogs, trainings, services] = await Promise.all([
    getBlogs('slug'),
    getTrainings('slug'),
    getServices(),
  ]);

  const siteMaps: ISitemapField[] = [
    ...blogs.map(
      ({ slug }): ISitemapField => ({
        loc: `${
          process.env.SITE_URL || 'https://hammadkakli.com'
        }/blogs/${slug}`,
        lastmod: new Date().toISOString(),
        priority: 0.7,
        changefreq:'daily'
      })
    ),
    ...trainings.map(
      ({ slug }): ISitemapField => ({
        loc: `${
          process.env.SITE_URL || 'https://hammadkakli.com'
        }/trainings/${slug}`,
        lastmod: new Date().toISOString(),
        priority: 0.7,
        changefreq:'daily'
      })
    ),
    ...services.data.map(
      ({ slug }): ISitemapField => ({
        loc: `${
          process.env.SITE_URL || 'https://hammadkakli.com'
        }/services/${slug}`,
        lastmod: new Date().toISOString(),
        priority: 0.7,
        changefreq:'daily'
      })
    ),
  ];

  return getServerSideSitemapLegacy(ctx, siteMaps);
};

// Default export to prevent next.js errors
export default function Sitemap() {}
