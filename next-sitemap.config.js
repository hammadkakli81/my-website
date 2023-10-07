/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://hammadkakli.com',
  generateRobotsTxt: true, // (optional)
  exclude: ['/admin/*', '/server-sitemap.xml'],
  robotsTxtOptions: {
    policies: [{ userAgent: '*', allow: '/', disallow: '/admin/*' }],
    additionalSitemaps: [
      process.env.SITE_URL || 'https://hammadkakli.com' + '/server-sitemap.xml', // <==== Add here
    ],
  },
};
