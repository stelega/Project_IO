import {
  apiGetFilms,
  apiGetMovieCategories,
  apiGetAgeCategories,
} from '../api/filmsApi';
import { PagedList } from '../models/PagedList';
import { Film, Category } from '../models/Film';

export const getFilms = async (
  rowsPerPage?: number,
  page?: number,
  orderBy?: string,
  order?: 'asc' | 'desc'
): Promise<PagedList<Film>> => {
  const films: PagedList<Film> = await apiGetFilms(
    rowsPerPage,
    page,
    orderBy,
    order
  );
  return films;
};

export const getAgeCategories = async (): Promise<string[]> => {
  const categories: Category = await apiGetAgeCategories();
  return categories.data;
};

export const getMovieCategories = async (): Promise<string[]> => {
  const categories: Category = await apiGetMovieCategories();
  return categories.data;
};
