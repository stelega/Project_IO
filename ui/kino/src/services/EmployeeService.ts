import {apiGetEmployees} from "../api/employeesApi";
import {PagedList} from "../models/PagedList";
import {Employee} from "../models/Employee";

export const getEmployees = async (
  rowsPerPage?: number,
  page?: number,
  orderBy?: string,
  order?: 'asc' | 'desc'
): Promise<PagedList<Employee>> => {
  const employees: PagedList<Employee> = await apiGetEmployees(
    rowsPerPage,
    page,
    orderBy,
    order
  );
  return employees;
};