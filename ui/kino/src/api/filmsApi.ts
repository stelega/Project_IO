import { PagedList } from './../models/PagedList';
import { apiGetAuthorized } from './base';
import { Film } from '../models/Film';

export interface GetFilmsQuery {
  perPage?: number;
  page?: number;
  orderBy?: string;
  desc?: Boolean;
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
    desc: order === 'desc' ? true : false,
  };
  const response: PagedList<Film> = await apiGetAuthorized<
    PagedList<Film>,
    GetFilmsQuery
  >(url, query);
  return response;
};
