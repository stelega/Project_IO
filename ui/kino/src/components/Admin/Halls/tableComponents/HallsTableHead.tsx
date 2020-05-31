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

export interface HallListData {
  name: string;
  numOfSeats: number;
  availability: boolean;
}

interface HeadCell {
  disablePadding: boolean;
  id: keyof HallListData;
  label: string;
  numeric: boolean;
}

const headCells: HeadCell[] = [
  {
    id: 'name',
    numeric: false,
    disablePadding: false,
    label: 'Nazwa',
  },
  {
    id: 'numOfSeats',
    numeric: true,
    disablePadding: false,
    label: 'Pojemność',
  },
  {
    id: 'availability',
    numeric: false,
    disablePadding: false,
    label: 'Dostepna',
  }
];

export type Order = 'asc' | 'desc';

interface HallsTableHeadProps {
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof HallListData
  ) => void;
  order: Order;
  orderBy: string;
}

const HallsTableHead = (props: HallsTableHeadProps) => {
  const {order, orderBy, onRequestSort} = props;
  const createSortHandler = (property: keyof HallListData) => (
    event: React.MouseEvent<unknown>
  ) => {
    onRequestSort(event, property);
  }
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

export default HallsTableHead;