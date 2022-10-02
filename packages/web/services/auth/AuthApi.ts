import { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import { createApi, GenericServiceError } from '../common';
import { LoginDto, LoginResponseDto } from './dto';

export class AuthApi {
  private api: AxiosInstance;

  constructor(axiosInstance?: AxiosInstance) {
    this.api = axiosInstance ? axiosInstance : createApi();
  }

  public async login(dto: LoginDto): Promise<AxiosResponse<LoginResponseDto> | AxiosError<GenericServiceError>> {
    try {
      return await this.api.post<LoginResponseDto>('/auth/login', dto);
    } catch (e) {
      return e as AxiosError<GenericServiceError>;
    }
  }

  public async logout(): Promise<boolean> {
    try {
      await this.api.post('/auth/logout');
      return true;
    } catch (e) {
      return false;
    }
  }
}
