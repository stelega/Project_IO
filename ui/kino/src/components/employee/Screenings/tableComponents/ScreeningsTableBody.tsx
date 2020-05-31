import React from 'react';
import {IconButton, TableBody, TableCell, TableRow} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import {Screening} from "../../../../models/Screening";

interface ScreeningsTableBodyProps {
  screenings: Screening[];
  handleEditClick: (
    event: React.MouseEvent<HTMLElement>,
    seanceId: string
  ) => void;
  handleDeleteClick: (
    event: React.MouseEvent<HTMLElement>,
    seanceId: string
  ) => void;
}

const ScreeningsTableBody = (props: ScreeningsTableBodyProps) => {
  const {screenings} = props;
  return (
    <TableBody>
      {screenings &&
      props.screenings.map((row) => {
        return (
          <TableRow hover tabIndex={-1} key={row.seanceId}>
            <TableCell align='center'>{row.movie}</TableCell>
            <TableCell align='center'>{row.hall}</TableCell>
            <TableCell align='center'>{row.time}</TableCell>
            <TableCell align='center'>{row.date}</TableCell>
            <TableCell align='center'>{row.ticketsSold}</TableCell>
            <TableCell align='right'>
              <IconButton
                onClick={(event) => props.handleEditClick(event, row.seanceId)}>
                <EditIcon/>
              </IconButton>
              <IconButton
                onClick={(event) =>
                  props.handleDeleteClick(event, row.seanceId)
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

export default ScreeningsTableBody;
