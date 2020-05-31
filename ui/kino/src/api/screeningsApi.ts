import {PagedList} from "../models/PagedList";
import {apiGetAuthorized} from "./base";
import {Screening} from "../models/Screening";

export interface GetScreeningsQuery {
  perPage?: number;
  page?: number;
  orderBy?: string;
  desc?: Boolean;
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
  const response: PagedList<Screening> = await apiGetAuthorized<PagedList<Screening>,
    GetScreeningsQuery>(url, query);
  return response;
}