import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Table } from '@material-ui/core';
import {
  deleteScreening,
  getScreenings,
} from '../../../services/ScreeningService';
import ScreeningsTableBody from './tableComponents/ScreeningsTableBody';
import MyTablePagination from '../../tableComponents/TablePagination';
import { PagedList } from '../../../models/PagedList';
import { Screening } from '../../../models/Screening';
import AddButton from './AddScreening/AddButton';
import MyTableHead, { HeadCell, Order } from '../../tableComponents/TableHead';
import SearchField from '../../SearchField';

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

interface ScreeningListData {
  movie: string;
  hall: string;
  time: string;
  date: string;
  ticketsSold: number;
}

const headCells: HeadCell<ScreeningListData>[] = [
  {
    id: 'movie',
    label: 'Film',
  },
  {
    id: 'hall',
    label: 'Sala',
  },
  {
    id: 'time',
    label: 'Godzina',
  },
  {
    id: 'date',
    label: 'Data',
  },
  {
    id: 'ticketsSold',
    label: 'Sprzedane bilety',
  },
];

const Screenings = () => {
  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<keyof ScreeningListData>('movie');
  const [page, setPage] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [screenings, setScreenings] = useState<PagedList<Screening>>({
    count: 0,
    data: [],
  });
  const [search, setSearch] = useState<string>('');
  const [typingTimeout, setTypingTimeout] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getScreenings(
        rowsPerPage,
        page,
        orderBy,
        order,
        search
      );
      setScreenings(result);
    };
    fetchData();
    // eslint-disable-next-line
  }, []);

  const handleRequestSort = async (
    event: React.MouseEvent<unknown>,
    newOrderBy: keyof ScreeningListData
  ) => {
    const isAsc = orderBy === newOrderBy && order === 'asc';
    const newOrder = isAsc ? 'desc' : 'asc';
    setOrder(newOrder);
    setOrderBy(newOrderBy);
    await updateScreenings(rowsPerPage, page, newOrderBy, newOrder, search);
  };

  const handleChangePage = async (event: unknown, newPage: number) => {
    setPage(newPage);
    await updateScreenings(rowsPerPage, newPage, orderBy, order, search);
  };

  const updateScreenings = async (
    rowsPerPage: number,
    page: number,
    orderBy: string,
    order: 'desc' | 'asc',
    search: string
  ) => {
    const result = await getScreenings(
      rowsPerPage,
      page,
      orderBy,
      order,
      search
    );
    setScreenings(result);
  };

  const handleChangeRowsPerPage = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const rows: number = Number(event.target.value);
    setRowsPerPage(rows);
    await updateScreenings(rows, page, orderBy, order, search);
  };

  const handleEdit = (
    event: React.MouseEvent<HTMLElement>,
    seanceId: string
  ) => {
    console.log(seanceId);
  };

  const handleDelete = async (
    event: React.MouseEvent<HTMLElement>,
    seanceId: string
  ) => {
    await deleteScreening(seanceId);
    handleUpdate();
  };

  const handleUpdate = () => {
    updateScreenings(rowsPerPage, page, orderBy, order, search);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    let text = event.target.value;
    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }
    setTypingTimeout(
      setTimeout(() => {
        setSearch(text);
        updateScreenings(rowsPerPage, page, orderBy, order, text);
      }, 300)
    );
  };

  return (
    <Container>
      <TopContainer>
        <Title>Wszystkie Seanse</Title>
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
          <ScreeningsTableBody
            screenings={screenings.data}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        </Table>
        <MyTablePagination
          page={page}
          totalCount={screenings.count}
          rowsPerPage={rowsPerPage}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </TableContainer>
    </Container>
  );
};

export default Screenings;
