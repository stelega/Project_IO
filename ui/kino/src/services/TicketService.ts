import { Ticket, NewTicket, TicketDto } from './../models/Ticket';
import {
  apiAddTickets,
  apiGetTickets,
  apiDeleteTicket,
} from '../api/ticketApi';
import { Moment } from 'moment';
import { PagedList } from '../models/PagedList';

export const addTickets = async (tickets: Ticket[]): Promise<number> => {
  const newTickets: NewTicket[] = [];
  tickets.forEach((ticket) => {
    newTickets.push({
      screeningId: ticket.screeningId,
      seatId: ticket.seat.seatId,
      discount: ticket.discount,
    });
  });
  return await apiAddTickets(newTickets);
};

export const getTickets = async (
  filmTitle: string,
  hallName: string,
  date: Moment,
  hour: string,
  minute: string,
  row: number | undefined,
  seat: number | undefined,
  page: number,
  rowsPerPage: number,
  order: string,
  orderBy: string
): Promise<PagedList<TicketDto>> => {
  const dateFormated = date.format('YYYY-MM-DD').toString();
  const time = hour + ':' + minute + ':00';
  return await apiGetTickets(
    filmTitle,
    hallName,
    dateFormated,
    time,
    row,
    seat,
    page,
    rowsPerPage,
    order,
    orderBy
  );
};

export const deleteTicket = async (ticketId: string) => {
  await apiDeleteTicket(ticketId);
};
