import { BACKEND_URL } from './../config';
import UserContext from '../services/Seassion';
import {
  UnauthorizedException,
  DeleteException,
  EditException,
} from '../Exceptions/Exceptions';

interface Exception {
  message: string;
}

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
  if (!responseJson.ok) {
    if (responseJson.status === 401) {
      throw UnauthorizedException();
    }
  }
  const response: T = await responseJson.json();
  return response;
}

export async function apiGetAuthorized<ResponseType, QueryParamsType>(
  uri: string,
  query?: QueryParamsType
) {
  const url = query
    ? BACKEND_URL + uri + queryBuilder(query)
    : BACKEND_URL + uri;
  const token = UserContext.getToken();
  const responseJson = await fetch(url, {
    method: 'GET',
    mode: 'cors',
    headers: {
      'access-token': token ? token : '',
    },
  });
  const response: ResponseType = await responseJson.json();
  return response;
}

export async function apiPostAuthorized<T>(uri: string, jsonBody: string) {
  const url = BACKEND_URL + uri;
  const token = UserContext.getToken();
  const responseJson = await fetch(url, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      'access-token': token ? token : '',
    },
    body: jsonBody,
  });
  const response: T = await responseJson.json();
  return response;
}

export async function apiPutAuthorized(uri: string, jsonBody: string) {
  const url = BACKEND_URL + uri;
  const token = UserContext.getToken();
  const responseJson = await fetch(url, {
    method: 'PUT',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      'access-token': token ? token : '',
    },
    body: jsonBody,
  });
  if (!responseJson.ok) {
    const error: Exception = await responseJson.json();
    throw EditException(error.message);
  }
}

export async function apiDeleteAuthorized<QueryParamsType>(
  uri: string,
  query: QueryParamsType
) {
  const url = query
    ? BACKEND_URL + uri + queryBuilder(query)
    : BACKEND_URL + uri;
  const token = UserContext.getToken();
  const responseJson = await fetch(url, {
    method: 'DELETE',
    mode: 'cors',
    headers: {
      'access-token': token ? token : '',
    },
  });
  if (!responseJson.ok) {
    const error: Exception = await responseJson.json();
    throw DeleteException(error.message);
  }
}

const queryBuilder = (params: any): string => {
  const esc = encodeURIComponent;
  const query =
    '?' +
    Object.keys(params)
      .map((k) => esc(k) + '=' + esc(params[k]))
      .join('&');
  return query;
};
