import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Table } from '@material-ui/core';
import {
  deleteEmployee,
  getEmployees,
} from '../../../services/EmployeeService';
import EmployeesTableBody from './tableComponents/EmployeesTableBody';
import MyTablePagination from '../../tableComponents/TablePagination';
import { PagedList } from '../../../models/PagedList';
import { Employee } from '../../../models/Employee';
import AddButton from './AddEmployee/AddButton';
import MyTableHead, { HeadCell, Order } from '../../tableComponents/TableHead';
import SearchField from '../../SearchField';
import EditEmployee from './EditEmployee/EditEmployee';

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

const RightSideContainer = styled.div`
  display: flex;
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
  const [employees, setEmployees] = useState<PagedList<Employee>>({
    count: 0,
    data: [],
  });
  const [search, setSearch] = useState<string>('');
  const [typingTimeout, setTypingTimeout] = useState<number>(0);
  const [editEmployeeId, setEditEdmployeeId] = useState<string | undefined>();

  useEffect(() => {
    const fetchData = async () => {
      const result = await getEmployees(
        rowsPerPage,
        page,
        orderBy,
        order,
        search
      );
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
    await updateEmployees(rowsPerPage, page, newOrderBy, newOrder, search);
  };

  const handleChangePage = async (event: unknown, newPage: number) => {
    setPage(newPage);
    await updateEmployees(rowsPerPage, newPage, orderBy, order, search);
  };

  const updateEmployees = async (
    rowsPerPage: number,
    page: number,
    orderBy: string,
    order: 'desc' | 'asc',
    search: string
  ) => {
    const result = await getEmployees(
      rowsPerPage,
      page,
      orderBy,
      order,
      search
    );
    setEmployees(result);
  };

  const handleChangeRowsPerPage = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const rows: number = Number(event.target.value);
    setRowsPerPage(rows);
    await updateEmployees(rows, page, orderBy, order, search);
  };

  const handleEdit = (
    event: React.MouseEvent<HTMLElement>,
    employeeId: string
  ) => {
    setEditEdmployeeId(employeeId);
  };

  const handleDelete = async (
    event: React.MouseEvent<HTMLElement>,
    employeeId: string
  ) => {
    await deleteEmployee(employeeId);
    handleUpdate();
  };

  const handleUpdate = () => {
    updateEmployees(rowsPerPage, page, orderBy, order, search);
    handleEditClose();
  };

  const handleEditClose = () => {
    setEditEdmployeeId(undefined);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    let text = event.target.value;
    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }
    setTypingTimeout(
      setTimeout(() => {
        setSearch(text);
        updateEmployees(rowsPerPage, page, orderBy, order, text);
      }, 300)
    );
  };

  return (
    <>
      <Container>
        <TopContainer>
          <Title>Wszyscy Pracownicy</Title>
          <RightSideContainer>
            <SearchField handleSearch={handleSearch} />
            <AddButton handleAdded={handleUpdate} />
          </RightSideContainer>
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
              handleEdit={handleEdit}
              handleDelete={handleDelete}
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
      {editEmployeeId && (
        <EditEmployee
          employeeId={editEmployeeId}
          handleClose={handleEditClose}
          handleEdited={handleUpdate}
        />
      )}
    </>
  );
};

export default Employees;
