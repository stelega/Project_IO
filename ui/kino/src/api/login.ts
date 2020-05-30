import { BACKEND_URL } from './../config';
import UserToken, { Context } from '../services/Seassion';

interface LoginDto {
  login: string;
  password: string;
}

export async function apiLogin(login: string, password: string) {
  const url = '/login';
  const body: LoginDto = {
    login: login,
    password: password,
  };
  const jsonBody = JSON.stringify(body);
  const response: Context = await apiPost<Context>(url, jsonBody);
  UserToken.setContext(response);
  return response;
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
