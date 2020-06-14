import React from 'react';
import {
  Table,
  TableRow,
  TableCell,
  TextField,
  TableBody,
} from '@material-ui/core';
import styled from 'styled-components';

const Text = styled.div`
  color: black;
  font-weight: bold;
`;

interface TicketFilterProps {
  row: number | undefined;
  seat: number | undefined;
  handleRowChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSeatChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const TicketFilter = (props: TicketFilterProps) => {
  const { row, seat, handleRowChange, handleSeatChange } = props;
  return (
    <>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell align='center'>
              <Text>Filtry</Text>
            </TableCell>
            <TableCell align='left'>Rząd</TableCell>
            <TableCell align='right'>
              <TextField id='row' value={row} onChange={handleRowChange} />
            </TableCell>
            <TableCell align='left'>Numer</TableCell>
            <TableCell align='right'>
              <TextField id='seat' value={seat} onChange={handleSeatChange} />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </>
  );
};

export default TicketFilter;
