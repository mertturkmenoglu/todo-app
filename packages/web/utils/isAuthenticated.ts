import { GetServerSidePropsContext } from 'next';
import Cookies from 'universal-cookie';

export function isAuthenticated(context: GetServerSidePropsContext): boolean {
  const cookies = new Cookies(context.req.cookies);
  const jwtTokenCookie = cookies.get<string | undefined>('jwt-token');

  return jwtTokenCookie !== undefined;
}
