import { apiGetFilms } from './../api/filmsApi';
import { PagedList } from './../models/PagedList';
import { Film } from '../models/Film';

export const getFilms = async (): Promise<PagedList<Film>> => {
  const films: PagedList<Film> = await apiGetFilms();
  return films;
};
