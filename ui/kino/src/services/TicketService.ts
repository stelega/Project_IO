import { Ticket, NewTicket } from './../models/Ticket';
import { apiAddTickets } from '../api/ticketApi';

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
