import { Ticket, NewTicket, TicketList } from './../models/Ticket';
import { apiAddTickets, apiGetTickets } from '../api/ticketApi';
import { Moment } from 'moment';

export const addTickets = async (tickets: Ticket[]) => {
  const newTickets: NewTicket[] = [];
  tickets.forEach((ticket) => {
    newTickets.push({
      screeningId: ticket.screeningId,
      seatId: ticket.seat.seatId,
      discount: ticket.discount,
    });
  });
  await apiAddTickets(newTickets);
};

export const getTickets = async (
  filmTitle: string,
  hallName: string,
  date: Moment,
  hour: string,
  minute: string
): Promise<TicketList> => {
  const dateFormated = date.format('YYYY-MM-DD').toString();
  const time = hour + ':' + minute + '00';
  return await apiGetTickets(filmTitle, hallName, dateFormated, time);
};
