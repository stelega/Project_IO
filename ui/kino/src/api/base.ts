import { BACKEND_URL } from './../config';
import UserContext from '../services/Seassion';

export async function apiPost<T>(uri: string, jsonBody: string) {
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

export async function apiGetAuthorized<T>(uri: string) {
  const url = BACKEND_URL + uri;
  const token = UserContext.getToken();
  const responseJson = await fetch(url, {
    method: 'GET',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      'access-token': token ? token : '',
    },
  });
  const response: T = await responseJson.json();
  return response;
}
