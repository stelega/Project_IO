import { HallWithHoursDto } from './../models/Hall';
import { Hall, NewHall } from '../models/Hall';
import { PagedList } from '../models/PagedList';
import {
  apiDeleteAuthorized,
  apiGetAuthorized,
  apiPostAuthorized,
  apiPutAuthorized,
} from './base';

interface GetHallsQuery {
  perPage?: number;
  page?: number;
  orderBy?: string;
  desc?: Boolean;
  search?: string;
}

export interface DeleteHallQuery {
  hallId: string;
}

interface GetHallQuery {
  hallId: string;
}

interface GetHallsWithHoursQuery {
  movieId: string;
  date: string;
}

interface GetAllHallsQuery {
  orderBy: string;
}

export const apiGetHalls = async (
  rowsPerPage?: number,
  page?: number,
  orderBy?: string,
  order?: 'desc' | 'asc',
  search?: string
) => {
  const url = '/hall';
  const query: GetHallsQuery = {
    perPage: rowsPerPage,
    page: page,
    orderBy: orderBy,
    desc: order === 'desc',
    search: search,
  };
  return await apiGetAuthorized<PagedList<Hall>, GetHallsQuery>(url, query);
};

export const apiGetAllHalls = async (): Promise<Hall[]> => {
  const url = '/hall';
  const query: GetAllHallsQuery = {
    orderBy: 'name',
  };
  const response: PagedList<Hall> = await apiGetAuthorized<
    PagedList<Hall>,
    GetHallsQuery
  >(url, query);
  return response.data;
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

export const apiGetHallsWithHours = async (movieId: string, date: string) => {
  const url = '/seance/possible_hours';
  const query: GetHallsWithHoursQuery = {
    movieId: movieId,
    date: date,
  };
  const response = await apiGetAuthorized<
    HallWithHoursDto,
    GetHallsWithHoursQuery
  >(url, query);
  return response.data;
};
