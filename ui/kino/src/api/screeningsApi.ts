import {PagedList} from "../models/PagedList";
import {apiDeleteAuthorized, apiGetAuthorized} from "./base";
import {Screening} from "../models/Screening";

export interface GetScreeningsQuery {
  perPage?: number;
  page?: number;
  orderBy?: string;
  desc?: Boolean;
}

export interface DeleteScreeningQuery {
  seanceId: string;
}

export const apiGetScreenings = async (
  rowsPerPage?: number,
  page?: number,
  orderBy?: string,
  order?: 'desc' | 'asc'
) => {
  const url = '/seance';
  const query: GetScreeningsQuery = {
    perPage: rowsPerPage,
    page: page,
    orderBy: orderBy,
    desc: order === 'desc'
  };
  return await apiGetAuthorized<PagedList<Screening>,
    GetScreeningsQuery>(url, query);
}

export const apiDeleteScreening = async (seanceId: string) => {
  const url = '/seance';
  const query: DeleteScreeningQuery = {
    seanceId: seanceId,
  };
  await apiDeleteAuthorized<DeleteScreeningQuery>(url, query);
};