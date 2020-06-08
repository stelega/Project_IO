import {apiDeleteScreening, apiGetScreenings} from "../api/screeningsApi";
import {PagedList} from "../models/PagedList";
import {Screening} from "../models/Screening";

export const getScreenings = async (
  rowsPerPage?: number,
  page?: number,
  orderBy?: string,
  order?: 'asc' | 'desc'
): Promise<PagedList<Screening>> => {
  return await apiGetScreenings(
    rowsPerPage,
    page,
    orderBy,
    order
  );
};

export const deleteScreening = async (seanceId: string) => {
  await apiDeleteScreening(seanceId);
};