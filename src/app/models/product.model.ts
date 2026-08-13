export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  is_active: boolean;
}

export interface PaginatedResponse {
  totalCount: number;
  page: number;
  pageSize: number;
  data: Product[];
}

export interface ProductQueryParams {
  page: number;
  limit: number;
  status: string;
  search?: string;
}
