import {apiGetScreenings} from "../api/screeningsApi";
import {PagedList} from "../models/PagedList";
import {Screening} from "../models/Screening";

export const getScreenings = async (
  rowsPerPage?: number,
  page?: number,
  orderBy?: string,
  order?: 'asc' | 'desc'
): Promise<PagedList<Screening>> => {
  const screenings: PagedList<Screening> = await apiGetScreenings(
    rowsPerPage,
    page,
    orderBy,
    order
  );
  return screenings;
};