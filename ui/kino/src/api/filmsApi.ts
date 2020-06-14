import { FutureFilms, FilmsTitles } from './../models/Film';
import { Category, Film, NewFilm } from '../models/Film';
import { PagedList } from '../models/PagedList';
import {
  apiDeleteAuthorized,
  apiGetAuthorized,
  apiPostAuthorized,
  apiPutAuthorized,
} from './base';

interface GetFilmsQuery {
  perPage?: number;
  page?: number;
  orderBy?: string;
  desc?: Boolean;
  search?: string;
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
  order?: 'desc' | 'asc',
  search?: string
) => {
  const url = '/movie';
  const query: GetFilmsQuery = {
    perPage: rowsPerPage,
    page: page,
    orderBy: orderBy,
    desc: order === 'desc',
    search: search,
  };
  return await apiGetAuthorized<PagedList<Film>, GetFilmsQuery>(url, query);
};

export const apiAddFilm = async (body: NewFilm) => {
  const url = '/movie';
  await apiPostAuthorized(url, JSON.stringify(body));
};

export const apiGetAgeCategories = async () => {
  const url = '/category/age';
  return await apiGetAuthorized<Category, null>(url);
};

export const apiGetMovieCategories = async () => {
  const url = '/category/genre';
  return await apiGetAuthorized<Category, null>(url);
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

export const apiGetFutureFilms = async (): Promise<Film[]> => {
  const url = '/movie/future/all';
  const response = await apiGetAuthorized<FutureFilms, null>(url);
  return response.data;
};

export const apiGetFutuerFilmsTitles = async (): Promise<FilmsTitles> => {
  const url = '/movie/future/titles';
  return await apiGetAuthorized<FilmsTitles, null>(url);
};
