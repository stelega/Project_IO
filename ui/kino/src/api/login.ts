import { BACKEND_URL } from './../config';
import UserToken, { Context } from '../services/Seassion';

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

async function apiPost<T>(uri: string, jsonBody: string, token?: string) {
  const url = BACKEND_URL + uri;
  const responseJson = await fetch(url, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: jsonBody,
  });
  const response: T = await responseJson.json();
  return response;
}
