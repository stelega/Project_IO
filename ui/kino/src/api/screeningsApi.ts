import { HallWithSeats } from './../models/Hall';
import { NewScreening } from './../models/Screening';
import { PagedList } from '../models/PagedList';
import {
  apiDeleteAuthorized,
  apiGetAuthorized,
  apiPostAuthorized,
} from './base';
import { Screening } from '../models/Screening';

export interface GetScreeningsQuery {
  perPage?: number;
  page?: number;
  orderBy?: string;
  desc?: Boolean;
  search?: string;
}

export interface DeleteScreeningQuery {
  seanceId: string;
}

interface GetHallSeatsQuery {
  seanceId: string;
}

export const apiGetScreenings = async (
  rowsPerPage?: number,
  page?: number,
  orderBy?: string,
  order?: 'desc' | 'asc',
  search?: string
) => {
  const url = '/seance';
  const query: GetScreeningsQuery = {
    perPage: rowsPerPage,
    page: page,
    orderBy: orderBy,
    desc: order === 'desc',
    search: search,
  };
  return await apiGetAuthorized<PagedList<Screening>, GetScreeningsQuery>(
    url,
    query
  );
};

export const apiDeleteScreening = async (seanceId: string) => {
  const url = '/seance';
  const query: DeleteScreeningQuery = {
    seanceId: seanceId,
  };
  await apiDeleteAuthorized<DeleteScreeningQuery>(url, query);
};

export const apiAddScreening = async (screening: NewScreening) => {
  const url = '/seance';
  await apiPostAuthorized(url, JSON.stringify(screening));
};

export const apiGetHallSeats = async (
  screeningId: string
): Promise<HallWithSeats> => {
  const url = '/seance/seats';
  const query: GetHallSeatsQuery = {
    seanceId: screeningId,
  };
  return await apiGetAuthorized<HallWithSeats, GetHallSeatsQuery>(url, query);
};
