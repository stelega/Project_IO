import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Table } from '@material-ui/core';
import { getFilms } from '../../../services/FilmService';
import MyTableHead, { Order, HeadCell } from '../../tableComponents/TableHead';
import FilmsTableBody from './tableComponents/FilmsTableBody';
import { PagedList } from '../../../models/PagedList';
import { Film } from '../../../models/Film';
import AddButton from './AddFilm/AddButton';
import MyTablePagination from '../../tableComponents/TablePagination';

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

interface FilmListData {
  title: string;
  movieCategory: string;
  releaseDate: string;
  closeDate: string;
}

const headCells: HeadCell<FilmListData>[] = [
  {
    id: 'title',
    label: 'Tytuł',
  },
  {
    id: 'movieCategory',
    label: 'Kategoria',
  },
  {
    id: 'releaseDate',
    label: 'Wyświetlane od',
  },
  {
    id: 'closeDate',
    label: 'Wyświetlane do',
  },
];

const Films = () => {
  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<keyof FilmListData>('title');
  const [page, setPage] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [films, setFilms] = useState<PagedList<Film>>({ count: 0, data: [] });

  useEffect(() => {
    const fetchData = async () => {
      const result = await getFilms(rowsPerPage, page, orderBy, order);
      setFilms(result);
    };
    fetchData();
    // eslint-disable-next-line
  }, []);

  const handleRequestSort = async (
    event: React.MouseEvent<unknown>,
    newOrderBy: keyof FilmListData
  ) => {
    const isAsc = orderBy === newOrderBy && order === 'asc';
    const newOrder = isAsc ? 'desc' : 'asc';
    setOrder(newOrder);
    setOrderBy(newOrderBy);
    await updateFilms(rowsPerPage, page, newOrderBy, newOrder);
  };

  const handleChangePage = async (event: unknown, newPage: number) => {
    setPage(newPage);
    await updateFilms(rowsPerPage, newPage, orderBy, order);
  };

  const updateFilms = async (
    rowsPerPage: number,
    page: number,
    orderBy: string,
    order: 'desc' | 'asc'
  ) => {
    const result = await getFilms(rowsPerPage, page, orderBy, order);
    setFilms(result);
  };

  const handleChangeRowsPerPage = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const rows: number = Number(event.target.value);
    setRowsPerPage(rows);
    await updateFilms(rows, page, orderBy, order);
  };

  const handleEditClick = (
    event: React.MouseEvent<HTMLElement>,
    movieId: string
  ) => {
    console.log(movieId);
  };

  const handleDeleteClick = (
    event: React.MouseEvent<HTMLElement>,
    movieId: string
  ) => {
    console.log(movieId);
  };

  return (
    <Container>
      <TopContainer>
        <Title>Wszystkie Filmy</Title>
        <AddButton />
      </TopContainer>
      <TableContainer>
        <Table size='small'>
          <MyTableHead
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
            headCells={headCells}
          />
          <FilmsTableBody
            films={films.data}
            handleEditClick={handleEditClick}
            handleDeleteClick={handleDeleteClick}
          />
        </Table>
        <MyTablePagination
          page={page}
          totalCount={films.count}
          rowsPerPage={rowsPerPage}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </TableContainer>
    </Container>
  );
};

export default Films;
