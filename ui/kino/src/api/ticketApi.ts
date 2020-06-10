import { NewTicket } from '../models/Ticket';
import { apiPostAuthorized } from './base';

interface NewTicketQuery {
  seanceId: string;
  seatId: string;
  discount: boolean;
}
interface NewTicketsQuery {
  tickets: NewTicketQuery[];
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
