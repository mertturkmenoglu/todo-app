import { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import { createApi, GenericServiceError, User } from '../common';
import { UpdateUserDto } from './dto';

export class UserApi {
  private api: AxiosInstance;

  constructor(axiosInstance?: AxiosInstance) {
    this.api = axiosInstance ? axiosInstance : createApi();
  }

  public async getCurrentUser(): Promise<AxiosResponse<User> | AxiosError<GenericServiceError>> {
    try {
      return await this.api.get<User>('/user/me');
    } catch (e) {
      return e as AxiosError<GenericServiceError>;
    }
  }

  public async updateUser(dto: UpdateUserDto): Promise<AxiosResponse<User> | AxiosError<GenericServiceError>> {
    try {
      return await this.api.patch('/user', dto);
    } catch (e) {
      return e as AxiosError<GenericServiceError>;
    }
  }
}
