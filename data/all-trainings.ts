import slugify from 'slugify';
import { Training } from '../common-types/training';

const trainingsName = {
  wholesaleFba: 'Wholesale FBA',
  amazonPrivateLabel: 'Amazon Private Label',
  dropshipping: 'Dropshipping',
  virtualAssistant: 'Virtual Assistant',
  onlineArbitrage: 'Online Arbitrage',
};

export const allTrainings: Omit<Training, '_id'>[] = [
  {
    name: trainingsName.wholesaleFba,
    excerptDesc:
      'The main objective of this course is to learn how to sell other brands on amazon. You can learn how to find the distributors and how to get reseller certificates and authority letters.  How to hunt the Wholesale products according to different pricing techniques, Profit calculation.',
    description: [
      {
        name: 'Introduction about Amazon',
        furtherDesc: [
          'Why Amazon',
          'Amazon Business Trends',
          'Business Potential',
          'Decision of the marketplace',
          'Which information needed to create account (Professional, Individual)',
          'Account setup',
        ],
      },

      {
        name: 'Product Hunting',
        furtherDesc: [
          'Find branded listing with good BSR',
          'Using different tools',
        ],
      },

      {
        name: 'How to search dead listings using tools',
        furtherDesc: ['Keepa, Helium10, JS'],
      },

      {
        name: 'Introduction about rankings and ratings',
        furtherDesc: ['Importance in FBA WS'],
      },

      {
        name: 'Website and social media presence',
        furtherDesc: [
          'How to create FB page',
          'Instagram and Linked Page',
          'Create FB Ads',
        ],
      },

      {
        name: 'Suppliers Distributers Hunting',
        furtherDesc: [
          'How to hunt',
          'Where we find supplier data',
          'How to create accounts',
          'How to apply for invoices and authority letters',
          'How to get credit account',
        ],
      },

      {
        name: 'Brand Approval',
        furtherDesc: [
          'Get approved the brand on Amazon',
          'Handle Amazon customer support',
        ],
      },

      {
        name: 'Category Approval',
        furtherDesc: [
          'Get category approved on amazon',
          'How to upload invoices',
        ],
      },

      {
        name: 'How to create and attach with the branded listing?',
        furtherDesc: ['Me Too with the listing'],
      },

      {
        name: 'Shipment Creation',
        furtherDesc: ['Create Labels'],
      },

      {
        name: 'Ordering and Inventory Management',
        furtherDesc: ['Inventory Planning'],
      },

      {
        name: 'Cost (Profit Calculation)',
        furtherDesc: [
          'FBA Calculator',
          'Negotiate with supplier',
          'Automate Pricing',
        ],
      },

      {
        name: 'PPC Campaigns',
        furtherDesc: [
          'Create',
          'Manage',
          'Optimize',
          'Budget selection',
          'Keywords planning',
        ],
      },

      {
        name: 'How to handle account',
        furtherDesc: [
          'Manage Seller Central Account',
          'Handle reports',
          'Where to download reports',
          'How to handle cases and manage amazon customer related queries',
          'Handle Amazon customer support issues.',
        ],
      },
    ],
    slug: slugify(trainingsName.wholesaleFba.toLowerCase()),
  },
  {
    name: trainingsName.amazonPrivateLabel,
    excerptDesc:
      'The main objective of this course is to learn how to create your own brand on Amazon. Amazon account opening. How to register your brand on Amazon, how to hunt source and launch your products. How to check patents. Register trademark, Promotional techniques. How to use different tools. How to find supplier using tools.',
    description: [
      {
        name: 'Introduction',
        furtherDesc: [
          'Why Amazon',
          'Amazon Business Trends',
          'Business Potential',
          'Decision of the marketplace',
          'Which information needed to create account (Professional, Individual)',
          'Account Setup',
        ],
      },

      {
        name: 'Product Hunting',
        furtherDesc: [
          'Criteria of hunting',
          'Helium 10, JS',
          'How to choose the best product',
          'Design',
          'Marketplace Analysis',
        ],
      },

      {
        name: 'Category Approval, Patent checking, Trademark issues',
        furtherDesc: [
          'How to check patent',
          'How to check trademark',
          'How to get approved the selling category',
        ],
      },

      {
        name: 'Product Sourcing',
        furtherDesc: [
          'Find source, manufacturer',
          'Find supplier',
          'How to check the Competitor Source',
        ],
      },

      {
        name: 'Supplier Verification',
        furtherDesc: [
          'How old the supplier is?',
          'How to check and verify the supplier details in marketplace',
        ],
      },

      {
        name: 'Sampling Ordering and Inventory Management',
        furtherDesc: [
          'Inventory restocking and planning',
          'Order the sample',
          'Verify the sample',
        ],
      },

      {
        name: 'Cost (Profit Calculation)',
        furtherDesc: [
          'FBA Calculator',
          'Negotiate with supplier',
          'Automate Pricing',
        ],
      },

      {
        name: 'Keyword Hunting and analysis',
        furtherDesc: [
          'Hunt the Keywords using tools, like Helium 10, JS',
          'Keyword hunting criteria',
          'Search volume analysis',
          'Competing Products analysis',
        ],
      },

      {
        name: 'Competitor Analysis',
        furtherDesc: [
          'Find competitors keywords',
          'Sort the competitor keywords',
        ],
      },

      {
        name: 'UPC Purchasing',
        furtherDesc: ['GS1', 'Nationwide'],
      },

      {
        name: 'Listing Creation and optimization',
        furtherDesc: [
          'How to Create (i) Title, (ii) Bullet Points, (iii) Descriptions, (iv) Images',
          'How to use keywords in the listing',
        ],
      },

      {
        name: 'Shipment Creation',
        furtherDesc: ['Create Labels'],
      },

      {
        name: 'Product launching on Amazon',
        furtherDesc: [
          'PPC Campaigns (i) Create, (ii) Manage, (iii) Optimize, (iv) Budget Selection (v) Keyword Planning',
          'Reviews and Ratings',
          'Many Chat',
          'Facebook Ads',
          'Rebate Ads',
        ],
      },

      {
        name: 'Social media, Website',
        furtherDesc: ['Social Media Accounts'],
      },

      {
        name: 'How to handle Account',
        furtherDesc: [
          'Manage Seller Central Account',
          'Handle reports',
          'Where to download reports',
          'How to handle cases and manage amazon customer related queries',
          'Handle Amazon customer support issues.',
        ],
      },

      {
        name: 'How to Register Brand',
        furtherDesc: ['Amazon Brand Registry'],
      },
    ],
    slug: slugify(trainingsName.amazonPrivateLabel.toLowerCase()),
  },
  {
    name: trainingsName.dropshipping,
    excerptDesc:
      'The main objective of this course is learning how to find retailers in specific market, how to hunt dropship products, how to find dead listings and make them alive. What are the policies of drop shipping on Amazon? How to use different tools. How to manage orders shipments and to learn how to handle customer support.',
    description: [
      {
        name: 'Introduction',
        furtherDesc: [
          'Why Amazon',
          'Amazon Business Trends',
          'Business Potential',
          'Decision of the marketplace',
          'Which Information needed to Create account (Professional, Individual)',
          'Account Setup',
        ],
      },

      {
        name: 'Product Hunting',
        furtherDesc: [
          'Find branded listing with good BSR',
          'Using different tools',
        ],
      },

      {
        name: 'How to search dead listings',
        furtherDesc: ['Tools (i) Helium 10, JS, Keepa'],
      },

      {
        name: 'Suppliers Retailers Hunting',
        furtherDesc: ['By UPC'],
      },

      {
        name: 'How to create and attach with the branded listing?',
        furtherDesc: [
          'Me Too',
          'Handling Templates',
          'Shipment Templates',
          'Margin Calculation',
        ],
      },

      {
        name: 'Orders Management',
        furtherDesc: [
          'How to fulfill Orders',
          'How to get tracking numbers',
          'How to update tracking numbers on Amazon',
          'How to win buybox',
        ],
      },

      {
        name: 'Customer Support',
        furtherDesc: [
          'Buyer Customer Support Issues',
          'Returns and Refunds Management',
          'Handling Disputes, claims, chargebacks',
          'Invoicing',
        ],
      },
    ],
    slug: slugify(trainingsName.dropshipping.toLowerCase()),
  },
  {
    name: trainingsName.virtualAssistant,
    excerptDesc:
      'This course is for those who are students or freelancers who have not any investment but they have passion to learn new skills and provide services to their clients. In this course you can learn about how manage seller central account and how to rank your Client’s product from scratch and build an empire. You will learn which services a virtual assistant can provide.',
    description: [
      {
        name: 'Introduction',
        furtherDesc: [
          'Why Amazon',
          'Amazon Business Trends',
          'Business Potential',
          'Decision of the marketplace',
          'Which information needed to create account (Professional, Individual)',
          'Account Setup',
        ],
      },

      {
        name: 'Product Hunting',
        furtherDesc: ['FBA Wholesale', 'Private Label', 'Dropshipping'],
      },

      {
        name: 'Listing Creation',
        furtherDesc: ['FBA Wholesale', 'Private Label', 'Dropshipping'],
      },

      {
        name: 'Handling listing issues',
        furtherDesc: ['FBA Wholesale', 'Private Label', 'Dropshipping'],
      },

      {
        name: 'Content Writing',
        furtherDesc: [],
      },

      {
        name: 'Sourcing and supplier hunting',
        furtherDesc: ['FBA Wholesale', 'Private Label', 'Dropshipping'],
      },

      {
        name: 'Inventory Management',
        furtherDesc: [],
      },

      {
        name: 'Handle FBM Orders',
        furtherDesc: [],
      },

      ///////////////////

      {
        name: 'Handle Buyer Complaints',
        furtherDesc: [],
      },

      {
        name: 'Account health issues',
        furtherDesc: [],
      },

      {
        name: 'Find and resolve customer support issues',
        furtherDesc: [],
      },

      {
        name: 'How to avoid late shipments and cancelation rate',
        furtherDesc: [],
      },

      {
        name: 'Reports Management',
        furtherDesc: [],
      },

      {
        name: 'Shipment creation',
        furtherDesc: [],
      },

      {
        name: 'Order management',
        furtherDesc: [],
      },

      {
        name: 'PPC Optimization',
        furtherDesc: [],
      },

      {
        name: 'PL Product Launching Strategies (Promotions, Coupons)',
        furtherDesc: [],
      },

      {
        name: 'Listing promotion (How to find honest clients VIA social media or freelancing websites)',
        furtherDesc: [],
      },
    ],
    slug: slugify(trainingsName.virtualAssistant.toLowerCase()),
  },
  {
    name: trainingsName.onlineArbitrage,
    excerptDesc:
      'The main objective to learn this course is to find and buy a product online for a lower price and sell it at a higher rate. This model is easy, and you can do it from home. You can find popular products from any online retailer marketplaces and sell them on Amazon or Walmart.',
    description: [
      { name: 'Why Amazon', furtherDesc: [] },
      { name: 'How to decide which marketplace is better', furtherDesc: [] },
      {
        name: 'Information needed for amazon account creation',
        furtherDesc: [],
      },
      {
        name: 'Find branded listing with good sales and ranking',
        furtherDesc: [],
      },
      { name: 'Search products with tools and without tools', furtherDesc: [] },
      { name: 'Importance of product ranking', furtherDesc: [] },
      { name: 'Analysis the product using different tools', furtherDesc: [] },
      { name: 'Sales Estimation', furtherDesc: [] },
      { name: 'Profit Calculation', furtherDesc: [] },
      { name: 'Listing Creation (FBA, FBM)', furtherDesc: [] },
      { name: 'Brand Approval', furtherDesc: [] },
      { name: 'Soft Approval', furtherDesc: [] },
      { name: 'Ordering, shipment creation', furtherDesc: [] },
      { name: 'Labeling and warehousing', furtherDesc: [] },
      { name: 'Account Setup', furtherDesc: [] },
      { name: 'Payment reports, business reports', furtherDesc: [] },
      { name: 'Listing Issues', furtherDesc: [] },
      { name: 'Pricing Issues', furtherDesc: [] },
      { name: 'How to contact with amazon', furtherDesc: [] },
    ],
    slug: slugify(trainingsName.onlineArbitrage.toLowerCase()),
  },
];
