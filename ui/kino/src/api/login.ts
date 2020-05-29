import { BACKEND_URL } from './../config';

interface LoginDto {
  login: string;
  password: string;
}

export interface Token {
  token: string;
  isAdmin: boolean;
}

export async function apiLogin(login: string, password: string) {
  const url = '/login';
  const body: LoginDto = {
    login: login,
    password: password,
  };
  const jsonBody = JSON.stringify(body);
  return await apiPost<Token>(url, jsonBody);
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
