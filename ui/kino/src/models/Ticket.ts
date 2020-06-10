import { Seat } from './Hall';

export interface Ticket {
  screeningId: string;
  seat: Seat;
  discount: boolean;
}

export interface NewTicket {
  screeningId: string;
  seatId: string;
  discount: boolean;
}
