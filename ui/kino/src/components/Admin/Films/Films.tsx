import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Table } from '@material-ui/core';
import { getFilms } from '../../../services/FilmService';
import FilmsTableHead, {
  Order,
  FilmListData,
} from './tableComponents/FilmsTableHead';
import FilmsTableBody from './tableComponents/FilmsTableBody';
import FilmsTablePagination from './tableComponents/FilmsTablePagination';
import { PagedList } from '../../../models/PagedList';
import { Film } from '../../../models/Film';
import AddButton from './AddFilm/AddButton';

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

const Films = () => {
  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<keyof FilmListData>('title');
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [films, setFilms] = useState<PagedList<Film>>({ count: 0, data: [] });

  useEffect(() => {
    const fetchData = async () => {
      const result = await getFilms();

      setFilms(result);
    };

    fetchData();
  }, []);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof FilmListData
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(Number(event.target.value));
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
        <Table>
          <FilmsTableHead
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
          />
          <FilmsTableBody
            films={films.data}
            handleEditClick={handleEditClick}
            handleDeleteClick={handleDeleteClick}
          />
        </Table>
        <FilmsTablePagination
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
