import {PagedList} from "../models/PagedList";
import {apiGetAuthorized} from "./base";
import {Employee} from "../models/Employee";

export interface GetEmployeesQuery {
  perPage?: number;
  page?: number;
  orderBy?: string;
  desc?: Boolean;
}

export const apiGetEmployees = async (
  rowsPerPage?: number,
  page?: number,
  orderBy?: string,
  order?: 'desc' | 'asc'
) => {
  const url = '/employee';
  const query: GetEmployeesQuery = {
    perPage: rowsPerPage,
    page: page,
    orderBy: orderBy,
    desc: order === 'desc'
  };
  const response: PagedList<Employee> = await apiGetAuthorized<PagedList<Employee>,
    GetEmployeesQuery>(url, query);
  return response;
}