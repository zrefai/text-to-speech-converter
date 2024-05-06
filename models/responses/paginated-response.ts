type PaginatedResponse<T> = {
  data: T[];
  meta: PaginationMeta;
};

type PaginationMeta = {
  currentPage: number;
  firstPage: number;
  firstPageUrl: string;
  lastPage: number;
  lastPageUrl: string;
  nextPageUrl?: string;
  perPage: number;
  previousPageUrl?: string;
  total: number;
};
