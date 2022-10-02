/* eslint-disable @typescript-eslint/no-explicit-any */
// @ts-ignore
import { AxiosError, AxiosResponse } from 'axios';

export function isApiError<T = any, R = any, E = any, D = any>(
  obj: AxiosResponse<T, R> | AxiosError<E, D>
): obj is AxiosError<E, D> {
  return (obj as AxiosError<E, D>).isAxiosError;
}
