import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Table, ThemeProvider, Dialog } from '@material-ui/core';
import { getFilms, deleteFilm } from '../../../services/FilmService';
import MyTableHead, { Order, HeadCell } from '../../tableComponents/TableHead';
import FilmsTableBody from './tableComponents/FilmsTableBody';
import { PagedList } from '../../../models/PagedList';
import { Film } from '../../../models/Film';
import AddButton from './AddFilm/AddButton';
import MyTablePagination from '../../tableComponents/TablePagination';
import EditFilm from './EditFilm/EditFilm';
import SearchField from '../../SearchField';
import {
  customTheme,
  ErrorContent,
} from '../../LoginPage/sections/LoginFormStyles';

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
  const [editFilmId, setEditFilmId] = useState<string | undefined>(undefined);
  const [search, setSearch] = useState<string>('');
  const [typingTimeout, setTypingTimeout] = useState<number>(0);
  const [error, setError] = useState<string | undefined>(undefined);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getFilms(rowsPerPage, page, orderBy, order, search);
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
    await updateFilms(rowsPerPage, page, newOrderBy, newOrder, search);
  };

  const handleChangePage = async (event: unknown, newPage: number) => {
    setPage(newPage);
    await updateFilms(rowsPerPage, newPage, orderBy, order, search);
  };

  const updateFilms = async (
    rowsPerPage: number,
    page: number,
    orderBy: string,
    order: 'desc' | 'asc',
    search: string
  ) => {
    const result = await getFilms(rowsPerPage, page, orderBy, order, search);
    setFilms(result);
  };

  const handleChangeRowsPerPage = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const rows: number = Number(event.target.value);
    setRowsPerPage(rows);
    await updateFilms(rows, page, orderBy, order, search);
  };

  const handleEdit = (
    event: React.MouseEvent<HTMLElement>,
    movieId: string
  ) => {
    setEditFilmId(movieId);
  };

  const handleEditClose = () => {
    setEditFilmId(undefined);
  };

  const handleDelete = async (
    event: React.MouseEvent<HTMLElement>,
    movieId: string
  ) => {
    try {
      await deleteFilm(movieId);
      handleUpdate();
    } catch (error) {
      setError(error);
    }
  };
  const handleDialogClose = () => {
    setError(undefined);
  };

  const handleUpdate = () => {
    updateFilms(rowsPerPage, page, orderBy, order, search);
    handleEditClose();
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    let text = event.target.value;
    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }
    setTypingTimeout(
      setTimeout(() => {
        setSearch(text);
        updateFilms(rowsPerPage, page, orderBy, order, text);
      }, 300)
    );
  };

  return (
    <ThemeProvider theme={customTheme}>
      <Container>
        <TopContainer>
          <Title>Wszystkie Filmy</Title>
          <RightSideContainer>
            <SearchField handleSearch={handleSearch} />
            <AddButton handleAdded={handleUpdate} />
          </RightSideContainer>
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
              handleEdit={handleEdit}
              handleDelete={handleDelete}
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
      {editFilmId && (
        <EditFilm
          movieId={editFilmId}
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
    </ThemeProvider>
  );
};

export default Films;
