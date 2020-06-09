import React, { useState, useEffect } from 'react';
import { HallWithSeats } from '../../../../models/Hall';
import { getHallSeats } from '../../../../services/HallService';

interface TicketFormProps {
  screeningId: string;
}
const TicketForm = (props: TicketFormProps) => {
  const [seats, setSeats] = useState<HallWithSeats>();
  useEffect(() => {
    const fetchData = async () => {
      const data = await getHallSeats(props.screeningId);
      setSeats(data);
      console.log(data);
    };
    fetchData();
    // eslint-disable-next-line
  }, []);
  return <div>Ticket</div>;
};

export default TicketForm;
