import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Table, Dialog } from '@material-ui/core';
import { deleteHall, getHalls } from '../../../services/HallService';
import HallsTableBody from './tableComponents/HallsTableBody';
import MyTablePagination from '../../tableComponents/TablePagination';
import { PagedList } from '../../../models/PagedList';
import { Hall } from '../../../models/Hall';
import AddButton from './AddHall/AddButton';
import MyTableHead, { HeadCell, Order } from '../../tableComponents/TableHead';
import EditHall from './EditHall/EditHall';
import SearchField from '../../SearchField';
import { ErrorContent } from '../../LoginPage/sections/LoginFormStyles';

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

interface HallListData {
  name: string;
  numOfSeats: number;
  availability: boolean;
}

const headCells: HeadCell<HallListData>[] = [
  {
    id: 'name',
    label: 'Nazwa',
  },
  {
    id: 'numOfSeats',
    label: 'Pojemność',
  },
  {
    id: 'availability',
    label: 'Dostępna',
  },
];

const Halls = () => {
  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<keyof HallListData>('name');
  const [page, setPage] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [halls, setHalls] = useState<PagedList<Hall>>({ count: 0, data: [] });
  const [editHallId, setEditHallId] = useState<string | undefined>(undefined);
  const [search, setSearch] = useState<string>('');
  const [typingTimeout, setTypingTimeout] = useState<number>(0);
  const [error, setError] = useState<string | undefined>(undefined);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getHalls(rowsPerPage, page, orderBy, order, search);
      setHalls(result);
    };
    fetchData();
    // eslint-disable-next-line
  }, []);

  const handleRequestSort = async (
    event: React.MouseEvent<unknown>,
    newOrderBy: keyof HallListData
  ) => {
    const isAsc = orderBy === newOrderBy && order === 'asc';
    const newOrder = isAsc ? 'desc' : 'asc';
    setOrder(newOrder);
    setOrderBy(newOrderBy);
    await updateHalls(rowsPerPage, page, newOrderBy, newOrder, search);
  };

  const handleChangePage = async (event: unknown, newPage: number) => {
    setPage(newPage);
    await updateHalls(rowsPerPage, newPage, orderBy, order, search);
  };

  const updateHalls = async (
    rowsPerPage: number,
    page: number,
    orderBy: string,
    order: 'desc' | 'asc',
    search: string
  ) => {
    const result = await getHalls(rowsPerPage, page, orderBy, order, search);
    setHalls(result);
  };

  const handleChangeRowsPerPage = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const rows: number = Number(event.target.value);
    setRowsPerPage(rows);
    await updateHalls(rows, page, orderBy, order, search);
  };

  const handleEditClick = (
    event: React.MouseEvent<HTMLElement>,
    hallId: string
  ) => {
    setEditHallId(hallId);
  };

  const handleEditClose = () => {
    setEditHallId(undefined);
  };

  const handleDelete = async (
    event: React.MouseEvent<HTMLElement>,
    hallId: string
  ) => {
    try {
      await deleteHall(hallId);
      handleUpdate();
    } catch (error) {
      setError(error);
    }
  };
  const handleDialogClose = () => {
    setError(undefined);
  };

  const handleUpdate = () => {
    updateHalls(rowsPerPage, page, orderBy, order, search);
    setEditHallId(undefined);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    let text = event.target.value;
    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }
    setTypingTimeout(
      setTimeout(() => {
        setSearch(text);
        updateHalls(rowsPerPage, page, orderBy, order, text);
      }, 300)
    );
  };

  return (
    <>
      <Container>
        <TopContainer>
          <Title>Wszystkie Sale</Title>
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
            <HallsTableBody
              halls={halls.data}
              handleEdit={handleEditClick}
              handleDelete={handleDelete}
            />
          </Table>
          <MyTablePagination
            page={page}
            totalCount={halls.count}
            rowsPerPage={rowsPerPage}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </TableContainer>
      </Container>
      {editHallId && (
        <EditHall
          hallId={editHallId}
          handleEdited={handleUpdate}
          handleClose={handleEditClose}
        />
      )}
      {error && (
        <Dialog
          open={error !== undefined}
          keepMounted
          onClose={handleDialogClose}>
          <ErrorContent>{error}</ErrorContent>
        </Dialog>
      )}
    </>
  );
};

export default Halls;
