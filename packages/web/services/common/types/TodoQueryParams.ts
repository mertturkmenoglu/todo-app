export interface TodoQueryParams {
  order: 'asc' | 'desc';
  page: number;
  pageSize: number;
  completed: boolean;
  searchTerm: string;
}
