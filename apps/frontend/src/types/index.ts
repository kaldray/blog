type BaseApiResponse<T> = {
  data: Array<{ id: number; attributes: T }>;
  meta: Meta;
};

export type ArticlesApiResponse = BaseApiResponse<ArticlesData>;

export type Meta = {
  pagination: Pagination;
};

export type Pagination = {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
};

type ArticlesData = {
  content: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  is_published: boolean;
  uid: string;
  cover: Cover;
  categories: Categories;
};

export type DataWithIdAndAttributes<T> = {
  id: number;
  attributes: T;
};

export type CoverData = {
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number;
  height: number;
  formats: null;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: null;
  provider: string;
  provider_metadata: null;
  createdAt: string;
  updatedAt: string;
};

export type Cover = {
  data: DataWithIdAndAttributes<CoverData>;
};

export type CategoryData = {
  category_name: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
};

export type Categories = {
  data: Array<DataWithIdAndAttributes<CategoryData>>;
};
