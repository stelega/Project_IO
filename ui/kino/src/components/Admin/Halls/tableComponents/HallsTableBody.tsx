import React from 'react';
import {IconButton, TableBody, TableCell, TableRow} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import {Hall} from '../../../../models/Hall';

interface HallsTableBodyProps {
  halls: Hall[];
  handleEditClick: (
    event: React.MouseEvent<HTMLElement>,
    hallId: string
  ) => void;
  handleDeleteClick: (
    event: React.MouseEvent<HTMLElement>,
    hallId: string
  ) => void;
}

const HallsTableBody = (props: HallsTableBodyProps) => {
  const {halls} = props;
  return (
    <TableBody>
      {halls &&
      props.halls.map((row) => {
        return (
          <TableRow hover tabIndex={-1} key={row.hallId}>
            <TableCell align='center'>{row.name}</TableCell>
            <TableCell align='center'>{row.numOfSeats}</TableCell>
            <TableCell align='center'>{row.availability ? 'Tak' : 'Nie'}</TableCell>
            <TableCell align='right'>
              <IconButton
                onClick={(event) =>
                  props.handleEditClick(event, row.hallId)
                }>
                <EditIcon/>
              </IconButton>
              <IconButton
                onClick={(event) =>
                  props.handleDeleteClick(event, row.hallId)
                }>
                <DeleteIcon/>
              </IconButton>
            </TableCell>
          </TableRow>
        );
      })}
    </TableBody>
  );
};

export default HallsTableBody;