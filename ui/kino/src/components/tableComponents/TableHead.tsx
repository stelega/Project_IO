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

export interface HeadCell<T> {
  id: keyof T;
  label: string;
}

interface MyHeadCells<T> {
  id: keyof T | 'actions';
  label: string;
}

export type Order = 'asc' | 'desc';

interface TableHeadProps<T> {
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof T) => void;
  order: Order;
  orderBy: string;
  headCells: HeadCell<T>[];
}

function MyTableHead<T>(props: TableHeadProps<T>) {
  const { order, orderBy, headCells, onRequestSort } = props;
  const myHeadCells: MyHeadCells<T>[] = [...headCells];
  myHeadCells.push({ id: 'actions', label: '' });
  const createSortHandler = (property: keyof T) => (
    event: React.MouseEvent<unknown>
  ) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {myHeadCells.map((headCell, index) => (
          <TableCell
            key={headCell.id as string}
            align={'center'}
            padding={'default'}
            size={index === 0 ? 'medium' : 'small'}
            sortDirection={orderBy === headCell.id ? order : false}>
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={
                headCell.id !== 'actions'
                  ? createSortHandler(headCell.id)
                  : undefined
              }>
              <Bold>{headCell.label}</Bold>
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

export default MyTableHead;
