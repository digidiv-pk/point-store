import { Cookies } from '../Cookies';

export function getToken(): string {
  return 'Bearer '.concat(Cookies.get<string>('authToken'));
}
