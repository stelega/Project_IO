import { NewHall } from './../models/Hall';
import { PagedList } from '../models/PagedList';
import { apiGetAuthorized, apiPostAuthorized, apiPutAuthorized } from './base';
import { Hall } from '../models/Hall';

interface GetHallsQuery {
  perPage?: number;
  page?: number;
  orderBy?: string;
  desc?: Boolean;
}

interface GetHallQuery {
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

export const apiGetHall = async (hallId: string): Promise<Hall> => {
  const url = '/hall';
  const query: GetHallQuery = {
    hallId: hallId,
  };
  const response: PagedList<Hall> = await apiGetAuthorized<
    PagedList<Hall>,
    GetHallQuery
  >(url, query);
  return response.data[0];
};

export const apiEditHall = async (body: Hall) => {
  const url = '/hall';
  await apiPutAuthorized(url, JSON.stringify(body));
};
