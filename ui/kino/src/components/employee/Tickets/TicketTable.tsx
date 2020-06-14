import React, { useState, useEffect } from 'react';
import { TicketDto } from '../../../models/Ticket';
import { Moment } from 'moment';
import { getTickets, deleteTicket } from '../../../services/TicketService';
import { PagedList } from '../../../models/PagedList';
import styled from 'styled-components';
import TicketFilter from './TicketFilter';
import { Table } from '@material-ui/core';
import MyTableHead, { Order, HeadCell } from '../../tableComponents/TableHead';
import TicketsTableBody from './tableComponents/TicketsTableBody';
import MyTablePagination from '../../tableComponents/TablePagination';

const FilterContainer = styled.div`
  width: 35vw;
`;
const TableContainer = styled.div`
  margin-top: 1vh;
  width: 35vw;
`;

interface TicketListProps {
  film: string;
  hall: string;
  date: Moment;
  hour: string;
  minute: string;
}

interface TicketListData {
  row: number;
  number: number;
  price: number;
}

const headCells: HeadCell<TicketListData>[] = [
  {
    id: 'row',
    label: 'Rząd',
  },
  {
    id: 'number',
    label: 'Numer',
  },
  {
    id: 'price',
    label: 'Cena',
  },
];

const TicketTable = (props: TicketListProps) => {
  const { film, hall, date, hour, minute } = props;
  const [row, setRow] = useState<number>();
  const [seat, setSeat] = useState<number>();
  const [tickets, setTickets] = useState<PagedList<TicketDto>>();
  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<keyof TicketListData>('row');
  const [page, setPage] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);

  useEffect(() => {
    const fetchTickets = async () => {
      const tickets = await getTickets(
        film,
        hall,
        date,
        hour,
        minute,
        row,
        seat,
        page,
        rowsPerPage,
        order,
        orderBy
      );
      setTickets(tickets);
    };

    fetchTickets();
  }, [
    film,
    hall,
    date,
    hour,
    minute,
    row,
    seat,
    order,
    orderBy,
    page,
    rowsPerPage,
  ]);

  const handleRowChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRow(Number(event.target.value));
  };
  const handleSeatChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSeat(Number(event.target.value));
  };
  const handleRequestSort = async (
    event: React.MouseEvent<unknown>,
    newOrderBy: keyof TicketListData
  ) => {
    const isAsc = orderBy === newOrderBy && order === 'asc';
    const newOrder = isAsc ? 'desc' : 'asc';
    setOrder(newOrder);
    setOrderBy(newOrderBy);
  };
  const handleDelete = async (
    event: React.MouseEvent<HTMLElement>,
    ticketId: string
  ) => {
    await deleteTicket(ticketId);
    await updateTickets();
  };
  const handleChangePage = async (event: unknown, newPage: number) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const rows: number = Number(event.target.value);
    setRowsPerPage(rows);
  };
  const updateTickets = async () => {
    const tickets = await getTickets(
      film,
      hall,
      date,
      hour,
      minute,
      row,
      seat,
      page,
      rowsPerPage,
      order,
      orderBy
    );
    setTickets(tickets);
  };

  return (
    <>
      {tickets && (
        <>
          <FilterContainer>
            <TicketFilter
              row={row}
              seat={seat}
              handleRowChange={handleRowChange}
              handleSeatChange={handleSeatChange}
            />
          </FilterContainer>
          <TableContainer>
            <Table size='small'>
              <MyTableHead
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
                headCells={headCells}
              />
              <TicketsTableBody
                tickets={tickets.data}
                handleDelete={handleDelete}
              />
            </Table>
            <MyTablePagination
              page={page}
              totalCount={tickets.count}
              rowsPerPage={rowsPerPage}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
            />
          </TableContainer>
        </>
      )}
    </>
  );
};

export default TicketTable;
