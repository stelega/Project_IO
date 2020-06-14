import React, { useState } from 'react';
import { TableBody, TableRow, TableCell, IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import CustomPopover from '../../../Popover/CustomPopover';
import ConfirmDeletePopover from '../../../Popover/ConfirmDeletePopover';
import { TicketDto } from '../../../../models/Ticket';

interface TicketsTableBodyProps {
  tickets: TicketDto[];
  handleDelete: (
    event: React.MouseEvent<HTMLElement>,
    ticketId: string
  ) => void;
}

const TicketsTableBody = (props: TicketsTableBodyProps) => {
  const { tickets } = props;
  const [anchorEl, setAnchorEl] = useState<Element | null>(null);
  const [rowToDelete, setRowToDelete] = useState<string | null>(null);
  const handleDeleteClick = (event: any, movieId: string) => {
    setAnchorEl(event.currentTarget);
    setRowToDelete(movieId);
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
        {tickets &&
          tickets.map((row) => {
            return (
              <TableRow hover tabIndex={-1} key={row.ticketId}>
                <TableCell align='center'>{row.row + 1}</TableCell>
                <TableCell align='center'>{row.number + 1}</TableCell>
                <TableCell align='center'>{row.price}</TableCell>
                <TableCell align='right'>
                  <IconButton
                    onClick={(event) => handleDeleteClick(event, row.ticketId)}>
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

export default TicketsTableBody;
