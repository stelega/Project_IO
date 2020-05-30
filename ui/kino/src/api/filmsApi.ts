import { PagedList } from './../models/PagedList';
import { apiGetAuthorized } from './base';
import { Film } from '../models/Film';

export const apiGetFilms = async () => {
  const url = '/movie';
  const response: PagedList<Film> = await apiGetAuthorized<PagedList<Film>>(
    url
  );
  return response;
};
