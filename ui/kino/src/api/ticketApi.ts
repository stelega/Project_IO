import { TicketList } from './../models/Ticket';
import { NewTicket } from '../models/Ticket';
import { apiPostAuthorized, apiGetAuthorized } from './base';

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
}

export const apiAddTickets = async (tickets: NewTicket[]) => {
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
  await apiPostAuthorized(url, JSON.stringify(ticketsQuery));
};

export const apiGetTickets = async (
  filmTitle: string,
  hallName: string,
  date: string,
  time: string
): Promise<TicketList> => {
  const url = '/ticket';
  const query: GetTicketsQuery = {
    movie: filmTitle,
    date: date,
    time: time,
    hall: hallName,
  };
  return apiGetAuthorized<TicketList, GetTicketsQuery>(url, query);
};
