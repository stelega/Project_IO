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
