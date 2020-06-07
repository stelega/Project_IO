import { NewHall } from './../models/Hall';
import { PagedList } from '../models/PagedList';
import { apiGetAuthorized, apiPostAuthorized } from './base';
import { Hall } from '../models/Hall';

export interface GetHallsQuery {
  perPage?: number;
  page?: number;
  orderBy?: string;
  desc?: Boolean;
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
  const response: PagedList<Hall> = await apiGetAuthorized<
    PagedList<Hall>,
    GetHallsQuery
  >(url, query);
  return response;
};

export const apiAddHall = async (hall: NewHall) => {
  const url = '/hall';
  await apiPostAuthorized(url, JSON.stringify(hall));
};
