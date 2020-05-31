import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Table } from '@material-ui/core';
import {getEmployees} from "../../../services/EmployeeService";
import EmployeesTableBody from "./tableComponents/EmployeesTableBody";
import MyTablePagination from '../../tableComponents/TablePagination';
import { PagedList } from '../../../models/PagedList';
import {Employee} from "../../../models/Employee";
import AddButton from './AddButton';
import MyTableHead, { HeadCell, Order } from '../../tableComponents/TableHead';

const Container = styled.div`
  margin-top: 4vh;
  margin-left: 5vw;
  margin-right: 5vw;
`;
const TableContainer = styled.div`
  margin-top: 2vh;
`;
const Title = styled.div`
  color: black;
  font-size: 150%;
  font-weight: bold;
`;
const TopContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

interface EmployeeListData {
  name: string;
  surname: string;
  login: string;
  isAdmin: boolean;
}

const headCells: HeadCell<EmployeeListData>[] = [
  {
    id: 'name',
    label: 'Imię',
  },
  {
    id: 'surname',
    label: 'Nazwisko',
  },
  {
    id: 'login',
    label: 'Login',
  },
  {
    id: 'isAdmin',
    label: 'Admin',
  },
];

const Employees = () => {
  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<keyof EmployeeListData>('surname');
  const [page, setPage] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [employees, setEmployees] = useState<PagedList<Employee>>({ count: 0, data: [] });

  useEffect(() => {
    const fetchData = async () => {
      const result = await getEmployees(rowsPerPage, page, orderBy, order);
      setEmployees(result);
    };
    fetchData();
    // eslint-disable-next-line
  }, []);

  const handleRequestSort = async (
    event: React.MouseEvent<unknown>,
    newOrderBy: keyof EmployeeListData
  ) => {
    const isAsc = orderBy === newOrderBy && order === 'asc';
    const newOrder = isAsc ? 'desc' : 'asc';
    setOrder(newOrder);
    setOrderBy(newOrderBy);
    await updateEmployees(rowsPerPage, page, newOrderBy, newOrder);
  };

  const handleChangePage = async (event: unknown, newPage: number) => {
    setPage(newPage);
    await updateEmployees(rowsPerPage, newPage, orderBy, order);
  };

  const updateEmployees = async (
    rowsPerPage: number,
    page: number,
    orderBy: string,
    order: 'desc' | 'asc'
  ) => {
    const result = await getEmployees(rowsPerPage, page, orderBy, order);
    setEmployees(result);
  };

  const handleChangeRowsPerPage = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const rows: number = Number(event.target.value);
    setRowsPerPage(rows);
    await updateEmployees(rows, page, orderBy, order);
  };

  const handleEditClick = (
    event: React.MouseEvent<HTMLElement>,
    employeeId: string
  ) => {
    console.log(employeeId);
  };

  const handleDeleteClick = (
    event: React.MouseEvent<HTMLElement>,
    employeeId: string
  ) => {
    console.log(employeeId);
  };

  return (
    <Container>
      <TopContainer>
        <Title>Wszyscy Pracownicy</Title>
        <AddButton />
      </TopContainer>
      <TableContainer>
        <Table size='small'>
          <MyTableHead
            onRequestSort={handleRequestSort}
            orderBy={orderBy}
            order={order}
            headCells={headCells}
          />
          <EmployeesTableBody
            employees={employees.data}
            handleEditClick={handleEditClick}
            handleDeleteClick={handleDeleteClick}
          />
        </Table>
        <MyTablePagination
          page={page}
          totalCount={employees.count}
          rowsPerPage={rowsPerPage}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </TableContainer>
    </Container>
  );
};

export default Employees;
