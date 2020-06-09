export interface NewHall {
  name: string;
  availability: boolean;
  rows: number;
  seatsPerRow: number;
  numOfSeats: number;
}

export interface Hall extends NewHall {
  hallId: string;
}

export interface HallWithHours {
  hallId: string;
  name: string;
  hours: string[];
}

export interface HallWithHoursDto {
  data: HallWithHours[];
}
