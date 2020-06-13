import { FilmsTitles } from './../models/Film';
import { Moment } from 'moment';
import {
  apiAddFilm,
  apiDeleteFilm,
  apiEditFilm,
  apiGetAgeCategories,
  apiGetFilm,
  apiGetFilms,
  apiGetMovieCategories,
  apiGetFutureFilms,
  apiGetFutuerFilmsTitles,
} from '../api/filmsApi';
import { PagedList } from '../models/PagedList';
import { Category, Film, NewFilm } from '../models/Film';

export const getFilms = async (
  rowsPerPage?: number,
  page?: number,
  orderBy?: string,
  order?: 'asc' | 'desc',
  search?: string
): Promise<PagedList<Film>> => {
  return await apiGetFilms(rowsPerPage, page, orderBy, order, search);
};

export const addFilm = async (
  title: string,
  director: string,
  ageCategory: string,
  movieCategory: string,
  duration: number,
  dateStart: Moment,
  dateEnd: Moment
) => {
  const body: NewFilm = {
    ageCategory: ageCategory,
    director: director,
    duration: duration,
    movieCategory: movieCategory,
    releaseDate: dateStart.format('YYYY-MM-DD').toString(),
    closeDate: dateEnd.format('YYYY-MM-DD').toString(),
    title: title,
  };
  await apiAddFilm(body);
};

export const getAgeCategories = async (): Promise<string[]> => {
  const categories: Category = await apiGetAgeCategories();
  return categories.data;
};

export const getMovieCategories = async (): Promise<string[]> => {
  const categories: Category = await apiGetMovieCategories();
  return categories.data;
};

export const deleteFilm = async (movieId: string) => {
  await apiDeleteFilm(movieId);
};

export const getFilm = async (movieId: string): Promise<Film> => {
  return await apiGetFilm(movieId);
};

export const editFilm = async (
  movieId: string,
  title: string,
  director: string,
  ageCategory: string,
  movieCategory: string,
  duration: number,
  dateStart: Moment,
  dateEnd: Moment
) => {
  const body: Film = {
    movieId: movieId,
    ageCategory: ageCategory,
    director: director,
    duration: duration,
    movieCategory: movieCategory,
    releaseDate: dateStart.format('YYYY-MM-DD').toString(),
    closeDate: dateEnd.format('YYYY-MM-DD').toString(),
    title: title,
  };
  await apiEditFilm(body);
};

export const getFutureFilms = async (): Promise<Film[]> => {
  return await apiGetFutureFilms();
};

export const getFutereFilmsTitles = async (): Promise<FilmsTitles> => {
  return await apiGetFutuerFilmsTitles();
};
