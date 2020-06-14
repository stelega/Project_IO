import { Employee, NewEmployee } from '../models/Employee';
import { PagedList } from '../models/PagedList';
import {
  apiDeleteAuthorized,
  apiGetAuthorized,
  apiPostAuthorized,
  apiPutAuthorized,
} from './base';

interface GetEmployeesQuery {
  perPage?: number;
  page?: number;
  orderBy?: string;
  desc?: Boolean;
  search?: string;
}

interface DeleteEmployeeQuery {
  employeeId: string;
}
interface GetEmployeeQuery {
  employeeId: string;
}
interface EditEmployeeBody {
  employeeId: string;
  name: string;
  surname: string;
  login: string;
  isAdmin: boolean;
  password?: string;
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
    search: search,
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

export const apiGetEmployee = async (employeeId: string): Promise<Employee> => {
  const url = '/employee';
  const query: GetEmployeeQuery = {
    employeeId: employeeId,
  };
  const response = await apiGetAuthorized<
    PagedList<Employee>,
    GetEmployeeQuery
  >(url, query);
  return response.data[0];
};

export const apiEditEmployee = async (
  employeeId: string,
  name: string,
  surname: string,
  login: string,
  isAdmin: boolean,
  password?: string
) => {
  const url = '/employee';
  const body: EditEmployeeBody = {
    employeeId: employeeId,
    name: name,
    surname: surname,
    login: login,
    isAdmin: isAdmin,
    password: password,
  };
  await apiPutAuthorized(url, JSON.stringify(body));
};
