import { Employee, NewEmployee } from '../models/Employee';
import { PagedList } from '../models/PagedList';
import {
  apiDeleteAuthorized,
  apiGetAuthorized,
  apiPostAuthorized,
} from './base';

export interface GetEmployeesQuery {
  perPage?: number;
  page?: number;
  orderBy?: string;
  desc?: Boolean;
  search?: string;
}

export interface DeleteEmployeeQuery {
  employeeId: string;
}

export const apiGetEmployees = async (
  rowsPerPage?: number,
  page?: number,
  orderBy?: string,
  order?: 'desc' | 'asc',
  search?: string
) => {
  const url = '/employee';
  const query: GetEmployeesQuery = {
    perPage: rowsPerPage,
    page: page,
    orderBy: orderBy,
    desc: order === 'desc',
    search: search
  };
  return await apiGetAuthorized<PagedList<Employee>, GetEmployeesQuery>(
    url,
    query
  );
};

export const apiDeleteEmployee = async (employeeId: string) => {
  const url = '/employee';
  const query: DeleteEmployeeQuery = {
    employeeId: employeeId,
  };
  await apiDeleteAuthorized<DeleteEmployeeQuery>(url, query);
};

export const apiAddEmployee = async (employee: NewEmployee) => {
  const url = '/register';
  await apiPostAuthorized(url, JSON.stringify(employee));
};
