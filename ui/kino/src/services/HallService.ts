import {apiGetHalls} from "../api/hallsApi";
import {PagedList} from "../models/PagedList";
import {Hall} from "../models/Hall";

export const getHalls = async (
  rowsPerPage?: number,
  page?: number,
  orderBy?: string,
  order?: 'asc' | 'desc'
): Promise<PagedList<Hall>> => {
  const halls: PagedList<Hall> = await apiGetHalls(
    rowsPerPage,
    page,
    orderBy,
    order
  );
  return halls;
};