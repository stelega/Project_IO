import React from 'react';
import {
  Table,
  TableRow,
  TableCell,
  TableBody,
  MenuItem,
  TextField,
} from '@material-ui/core';
import { Ticket } from '../../../../models/Ticket';

interface SelectedTicketListProps {
  selected: Ticket[];
  handleTicketDiscountChange: (seatId: string, discount: boolean) => void;
}

const SelectedTicketList = (props: SelectedTicketListProps) => {
  const discountOptions = [true, false];

  const handleDiscountChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    seatId: string
  ) => {
    props.handleTicketDiscountChange(seatId, event.target.value === 'Ulgowy');
  };

  return (
    <Table>
      <TableBody>
        {props.selected.map((ticket, index) => {
          return (
            <TableRow key={'row' + index}>
              <TableCell align='right' key={'cell1' + index}>
                Rząd:
              </TableCell>
              <TableCell key={'cell2' + index}>{ticket.seat.row + 1}</TableCell>
              <TableCell align='right' key={'cell3' + index}>
                Miejsce:
              </TableCell>
              <TableCell key={'cell4' + index}>
                {ticket.seat.number + 1}
              </TableCell>
              <TableCell align='right' key={'cell5' + index}>
                Rodzaj biletu:
              </TableCell>
              <TableCell key={'cell6' + index}>
                <TextField
                  id='discount'
                  select
                  value={ticket.discount ? 'Ulgowy' : 'Normalny'}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    handleDiscountChange(event, ticket.seat.seatId)
                  }>
                  {discountOptions.map((option, index2) => (
                    <MenuItem
                      key={'option' + index + index2}
                      value={option ? 'Ulgowy' : 'Normalny'}>
                      {option ? 'Ulgowy' : 'Normalny'}
                    </MenuItem>
                  ))}
                </TextField>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default SelectedTicketList;
