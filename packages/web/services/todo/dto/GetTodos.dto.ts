import { Todo } from '../../common';

export interface GetTodosDto {
  data: Todo[];
  pagination: {
    currentPage: number;
    pageSize: number;
    totalPages: number;
    totalRecords: number;
    order: 'desc' | 'asc';
    hasPrevPage: boolean;
    hasNextPage: boolean;
  };
}
