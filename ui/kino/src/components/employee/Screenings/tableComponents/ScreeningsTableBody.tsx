import React, { useState } from 'react';
import { IconButton, TableBody, TableCell, TableRow } from '@material-ui/core';
import ConfirmationNumberIcon from '@material-ui/icons/ConfirmationNumber';
import DeleteIcon from '@material-ui/icons/Delete';
import { Screening } from '../../../../models/Screening';
import CustomPopover from '../../../Popover/CustomPopover';
import ConfirmDeletePopover from '../../../Popover/ConfirmDeletePopover';
import moment from 'moment';

interface ScreeningsTableBodyProps {
  screenings: Screening[];
  handleTicket: (
    event: React.MouseEvent<HTMLElement>,
    seanceId: string
  ) => void;
  handleDelete: (
    event: React.MouseEvent<HTMLElement>,
    seanceId: string
  ) => void;
}

const ScreeningsTableBody = (props: ScreeningsTableBodyProps) => {
  const { screenings } = props;
  const [anchorEl, setAnchorEl] = useState<Element | null>(null);
  const [rowToDelete, setRowToDelete] = useState<string | null>(null);
  const handleDeleteClick = (event: any, seanceId: string) => {
    setAnchorEl(event.currentTarget);
    setRowToDelete(seanceId);
  };
  const handleClose = () => {
    setAnchorEl(null);
    setRowToDelete(null);
  };
  const handleConfirmDelete = (event: React.MouseEvent<HTMLElement>) => {
    if (rowToDelete) {
      props.handleDelete(event, rowToDelete);
      handleClose();
    }
  };
  return (
    <>
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
                    disabled={moment().isAfter(row.date, 'd')}
                    onClick={(event) =>
                      props.handleTicket(event, row.seanceId)
                    }>
                    <ConfirmationNumberIcon />
                  </IconButton>
                  <IconButton
                    onClick={(event) => handleDeleteClick(event, row.seanceId)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            );
          })}
      </TableBody>
      <CustomPopover
        id='delete-popover'
        handleClose={handleClose}
        anchorEl={anchorEl}
        body={
          <ConfirmDeletePopover
            onCancel={handleClose}
            onConfirm={handleConfirmDelete}
          />
        }
      />
    </>
  );
};

export default ScreeningsTableBody;
