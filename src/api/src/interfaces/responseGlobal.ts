import { ProductElastic, SectionElastic } from './adminGlobal.js';
import { Sections } from '@entities/sections.entity';
import { Products } from '@entities/products.entity';

type Response = {
  statusCode: number;
  data: object | number | undefined;
};

type ElasticsearchResponse = {
  total: { value: number };
  items: (SectionElastic | ProductElastic)[];
  aggregations?: ResultFilterCatalog;
};

type ResultItems = {
  items:
    | Sections
    | Products
    | (Sections | Products)[]
    | SectionElastic[]
    | ProductElastic[];
  total: number;
};

type ResultFilterCatalog = {
  price: {
    min: number;
    max: number;
  };
  color: string[];
};

type ResponseAdminKeycloak = {
  access_token: string;
  expires_in: number;
};

type ResponseIntrospect = {
  sub?: string;
  username?: string;
  given_name?: string;
  family_name?: string;
  active: boolean;
};

export {
  ResultItems,
  ResultFilterCatalog,
  Response,
  ElasticsearchResponse,
  ResponseAdminKeycloak,
  ResponseIntrospect,
};
