import { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import { createApi, GenericServiceError } from '../common';
import { TodoQueryParams } from '../common/types/TodoQueryParams';
import { GetTodosDto, UpdateTodoDto } from './dto';

export class TodoApi {
  private api: AxiosInstance;

  constructor(axiosInstance?: AxiosInstance) {
    this.api = axiosInstance ? axiosInstance : createApi();
  }

  public async getTodos(
    query: Partial<TodoQueryParams> = {
      page: 1,
      order: 'asc',
      pageSize: 5,
    }
  ): Promise<AxiosResponse<GetTodosDto> | AxiosError<GenericServiceError>> {
    try {
      return await this.api.get<GetTodosDto>('/todo/', {
        params: query,
      });
    } catch (e) {
      return e as AxiosError<GenericServiceError>;
    }
  }

  public async updateTodo(id: number, dto: UpdateTodoDto): Promise<boolean> {
    try {
      await this.api.patch(`/todo/${id}`, dto);
      return true;
    } catch (e) {
      return false;
    }
  }
}
