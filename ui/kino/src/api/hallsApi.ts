import {Hall, NewHall} from '../models/Hall';
import {PagedList} from '../models/PagedList';
import {apiDeleteAuthorized, apiGetAuthorized, apiPostAuthorized} from './base';

export interface GetHallsQuery {
  perPage?: number;
  page?: number;
  orderBy?: string;
  desc?: Boolean;
}

export interface DeleteHallQuery {
  hallId: string;
}

export const apiGetHalls = async (
  rowsPerPage?: number,
  page?: number,
  orderBy?: string,
  order?: 'desc' | 'asc'
) => {
  const url = '/hall';
  const query: GetHallsQuery = {
    perPage: rowsPerPage,
    page: page,
    orderBy: orderBy,
    desc: order === 'desc',
  };
  return await apiGetAuthorized<PagedList<Hall>,
    GetHallsQuery>(url, query);
};

export const apiAddHall = async (hall: NewHall) => {
  const url = '/hall';
  await apiPostAuthorized(url, JSON.stringify(hall));
};

export const apiDeleteHall = async (hallId: string) => {
  const url = '/hall';
  const query: DeleteHallQuery = {
    hallId: hallId,
  };
  await apiDeleteAuthorized<DeleteHallQuery>(url, query);
};