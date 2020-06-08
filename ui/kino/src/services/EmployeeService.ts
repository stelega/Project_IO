import {
  apiDeleteEmployee,
  apiGetEmployees,
  apiAddEmployee,
} from '../api/employeesApi';
import { PagedList } from '../models/PagedList';
import { Employee, NewEmployee } from '../models/Employee';

export const getEmployees = async (
  rowsPerPage?: number,
  page?: number,
  orderBy?: string,
  order?: 'asc' | 'desc'
): Promise<PagedList<Employee>> => {
  return await apiGetEmployees(rowsPerPage, page, orderBy, order);
};

export const deleteEmployee = async (employeeId: string) => {
  await apiDeleteEmployee(employeeId);
};

export const addEmployee = async (
  name: string,
  surname: string,
  login: string,
  password: string,
  isAdmin: boolean
) => {
  const employee: NewEmployee = {
    name: name,
    surname: surname,
    login: login,
    password: password,
    isAdmin: isAdmin,
  };
  await apiAddEmployee(employee);
};
