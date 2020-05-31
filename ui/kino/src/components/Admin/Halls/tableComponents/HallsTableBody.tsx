import React from 'react';
import { IconButton, TableBody, TableCell, TableRow } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { Hall } from '../../../../models/Hall';
import styled from 'styled-components';

const Text = styled.div`
  font-weight: bold;
`;
const Green = styled(Text)`
  color: green;
`;

const Red = styled(Text)`
  color: red;
`;

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
  const { halls } = props;
  return (
    <TableBody>
      {halls &&
        props.halls.map((row) => {
          return (
            <TableRow hover tabIndex={-1} key={row.hallId}>
              <TableCell align='center'>{row.name}</TableCell>
              <TableCell align='center'>{row.numOfSeats}</TableCell>
              <TableCell align='center'>
                {row.availability ? <Green>Tak</Green> : <Red>Nie</Red>}
              </TableCell>
              <TableCell align='right'>
                <IconButton
                  onClick={(event) => props.handleEditClick(event, row.hallId)}>
                  <EditIcon />
                </IconButton>
                <IconButton
                  onClick={(event) =>
                    props.handleDeleteClick(event, row.hallId)
                  }>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          );
        })}
    </TableBody>
  );
};

export default HallsTableBody;
