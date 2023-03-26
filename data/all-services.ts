import slugify from 'slugify';
import { Service } from '../common-types/service';

enum Names {
  amazonAccountManagement = 'Amazon Account Management',
  usFormation = 'US LLC / UK LTD Formation',
  amazonAccountCreation = 'Amazon Account Creation',
  productHunting = 'Product Hunting',
  supplierHunting = 'Supplier Hunting',
  productLaunching = 'Product Launching',
  productRanking = 'Product Ranking',
  walmartAccountManagement = 'Walmart Account Management',
  ebayAccountManagement = 'eBay Account Management',
}

export const allServices: Service[] = [
  {
    name: Names.amazonAccountManagement,
    slug: slugify(Names.amazonAccountManagement.toLowerCase()),
  },
  {
    name: Names.usFormation,
    slug: slugify(Names.usFormation.toLowerCase()),
  },
  {
    name: Names.amazonAccountCreation,
    slug: slugify(Names.amazonAccountCreation.toLowerCase()),
  },
  {
    name: Names.productHunting,
    slug: slugify(Names.productHunting.toLowerCase()),
  },
  {
    name: Names.supplierHunting,
    slug: slugify(Names.supplierHunting.toLowerCase()),
  },
  {
    name: Names.productLaunching,
    slug: slugify(Names.productLaunching.toLowerCase()),
  },
  {
    name: Names.productRanking,
    slug: slugify(Names.productRanking.toLowerCase()),
  },
  {
    name: Names.walmartAccountManagement,
    slug: slugify(Names.walmartAccountManagement.toLowerCase()),
  },
  {
    name: Names.ebayAccountManagement,
    slug: slugify(Names.ebayAccountManagement.toLowerCase()),
  },
];
