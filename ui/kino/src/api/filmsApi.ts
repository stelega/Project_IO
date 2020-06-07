import { Category, NewFilm } from './../models/Film';
import { PagedList } from '../models/PagedList';
import {
  apiGetAuthorized,
  apiPostAuthorized,
  apiDeleteAuthorized,
  apiPutAuthorized,
} from './base';
import { Film } from '../models/Film';

interface GetFilmsQuery {
  perPage?: number;
  page?: number;
  orderBy?: string;
  desc?: Boolean;
}

interface DeleteFilmQuery {
  movieId: string;
}

interface GetFilmQuery {
  movieId: string;
}

export const apiGetFilms = async (
  rowsPerPage?: number,
  page?: number,
  orderBy?: string,
  order?: 'desc' | 'asc'
) => {
  const url = '/movie';
  const query: GetFilmsQuery = {
    perPage: rowsPerPage,
    page: page,
    orderBy: orderBy,
    desc: order === 'desc',
  };
  const response: PagedList<Film> = await apiGetAuthorized<
    PagedList<Film>,
    GetFilmsQuery
  >(url, query);
  return response;
};

export const apiAddFilm = async (body: NewFilm) => {
  const url = '/movie';
  await apiPostAuthorized(url, JSON.stringify(body));
};

export const apiGetAgeCategories = async () => {
  const url = '/category/age';
  const response: Category = await apiGetAuthorized<Category, null>(url);
  return response;
};

export const apiGetMovieCategories = async () => {
  const url = '/category/genre';
  const response: Category = await apiGetAuthorized<Category, null>(url);
  return response;
};

export const apiDeleteFilm = async (movieId: string) => {
  const url = '/movie';
  const query: DeleteFilmQuery = {
    movieId: movieId,
  };
  await apiDeleteAuthorized<DeleteFilmQuery>(url, query);
};

export const apiGetFilm = async (movieId: string): Promise<Film> => {
  const url = '/movie';
  const query: GetFilmQuery = {
    movieId: movieId,
  };
  const response: PagedList<Film> = await apiGetAuthorized<
    PagedList<Film>,
    GetFilmQuery
  >(url, query);
  return response.data[0];
};

export const apiEditFilm = async (body: Film) => {
  const url = '/movie';
  await apiPutAuthorized(url, JSON.stringify(body));
};
