import { apiGetFilms } from '../api/filmsApi';
import { PagedList } from '../models/PagedList';
import { Film } from '../models/Film';

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
