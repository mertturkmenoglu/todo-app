import { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import { createApi, GenericServiceError, Todo } from '../common';
import { TodoQueryParams } from '../common/types/TodoQueryParams';
import { GetTodosDto, UpdateTodoDto } from './dto';
import { AddTodoDto } from './dto/AddTodo.dto';

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

  public async addTodo(dto: AddTodoDto): Promise<AxiosResponse<Todo> | AxiosError<GenericServiceError>> {
    try {
      return await this.api.post('/todo', dto);
    } catch (e) {
      return e as AxiosError<GenericServiceError>;
    }
  }

  public async getTodoById(id: number): Promise<AxiosResponse<Todo> | null> {
    try {
      return await this.api.get(`/todo/${id}`);
    } catch (e) {
      return null;
    }
  }
}
