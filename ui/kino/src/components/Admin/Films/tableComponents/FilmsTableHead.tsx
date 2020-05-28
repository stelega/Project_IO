import React from 'react';
import {
  TableHead,
  TableRow,
  TableCell,
  TableSortLabel,
} from '@material-ui/core';
import styled from 'styled-components';

const Bold = styled.div`
  font-weight: bold;
`;

export interface FilmListData {
  title: string;
  category: string;
  releasedate: string;
  closeDate: string;
}

interface HeadCell {
  disablePadding: boolean;
  id: keyof FilmListData;
  label: string;
  numeric: boolean;
}

const headCells: HeadCell[] = [
  {
    id: 'title',
    numeric: false,
    disablePadding: false,
    label: 'Tytuł',
  },
  {
    id: 'category',
    numeric: false,
    disablePadding: false,
    label: 'Kategoria',
  },
  {
    id: 'releaseDate',
    numeric: false,
    disablePadding: false,
    label: 'Wyświetlane od',
  },
  {
    id: 'closeDate',
    numeric: false,
    disablePadding: false,
    label: 'Wyświetlane do',
  },
];

export type Order = 'asc' | 'desc';

interface FilmsTableHeadProps {
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof FilmListData
  ) => void;
  order: Order;
  orderBy: string;
}

const FilmsTableHead = (props: FilmsTableHeadProps) => {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler = (property: keyof FilmListData) => (
    event: React.MouseEvent<unknown>
  ) => {
    console.log();
    onRequestSort(event, property);
  };
  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={'center'}
            padding={'default'}
            sortDirection={orderBy === headCell.id ? order : false}>
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}>
              <Bold>{headCell.label}</Bold>
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

export default FilmsTableHead;
