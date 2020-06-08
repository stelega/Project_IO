import {apiDeleteScreening, apiGetScreenings} from "../api/screeningsApi";
import {PagedList} from "../models/PagedList";
import {Screening} from "../models/Screening";

export const getScreenings = async (
  rowsPerPage?: number,
  page?: number,
  orderBy?: string,
  order?: 'asc' | 'desc',
  search?: string
): Promise<PagedList<Screening>> => {
  return await apiGetScreenings(
    rowsPerPage,
    page,
    orderBy,
    order,
    search
  );
};

export const deleteScreening = async (seanceId: string) => {
  await apiDeleteScreening(seanceId);
};