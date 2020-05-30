import UserToken, { Context } from '../services/Seassion';
import { apiPost } from './base';

interface LoginDto {
  login: string;
  password: string;
  type: 'admin' | 'employee';
}

export async function apiLogin(login: string, password: string, type: string) {
  const url = '/login';
  const body: LoginDto = {
    login: login,
    password: password,
    type: type === 'Administrator' ? 'admin' : 'employee',
  };
  const jsonBody = JSON.stringify(body);
  const response: Context = await apiPost<Context>(url, jsonBody);
  UserToken.setContext(response);
}
