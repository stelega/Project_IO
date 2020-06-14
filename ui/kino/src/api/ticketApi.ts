import { TicketDto } from './../models/Ticket';
import { NewTicket } from '../models/Ticket';
import {
  apiPostAuthorized,
  apiGetAuthorized,
  apiDeleteAuthorized,
} from './base';
import { PagedList } from '../models/PagedList';

interface NewTicketQuery {
  seanceId: string;
  seatId: string;
  discount: boolean;
}
interface NewTicketsQuery {
  tickets: NewTicketQuery[];
}
interface GetTicketsQuery {
  movie: string;
  date: string;
  time: string;
  hall: string;
  filterRow: number | string;
  filterNumber: number | string;
  page: number;
  perPage: number;
  desc: boolean;
  orderBy: string;
}
interface DeleteTicketQuery {
  ticketId: string;
}
interface TicketPrice {
  totalPrice: number;
}

export const apiAddTickets = async (tickets: NewTicket[]): Promise<number> => {
  const url = '/ticket';
  const query: NewTicketQuery[] = [];
  tickets.forEach((ticket) => {
    query.push({
      seanceId: ticket.screeningId,
      seatId: ticket.seatId,
      discount: ticket.discount,
    });
  });
  const ticketsQuery: NewTicketsQuery = {
    tickets: query,
  };
  const response = await apiPostAuthorized<TicketPrice>(
    url,
    JSON.stringify(ticketsQuery)
  );
  return response.totalPrice;
};

export const apiGetTickets = async (
  filmTitle: string,
  hallName: string,
  date: string,
  time: string,
  row: number | undefined,
  seat: number | undefined,
  page: number,
  rowsPerPage: number,
  order: string,
  orderBy: string
): Promise<PagedList<TicketDto>> => {
  const url = '/ticket';
  const query: GetTicketsQuery = {
    movie: filmTitle,
    date: date,
    time: time,
    hall: hallName,
    filterRow: '',
    filterNumber: '',
    page: page,
    perPage: rowsPerPage,
    desc: order === 'desc',
    orderBy: orderBy,
  };
  if (row) {
    query.filterRow = row - 1;
  }
  if (seat) {
    query.filterNumber = seat - 1;
  }
  return apiGetAuthorized<PagedList<TicketDto>, GetTicketsQuery>(url, query);
};

export const apiDeleteTicket = async (ticketId: string) => {
  const url = '/ticket';
  const query: DeleteTicketQuery = {
    ticketId: ticketId,
  };
  await apiDeleteAuthorized<DeleteTicketQuery>(url, query);
};
