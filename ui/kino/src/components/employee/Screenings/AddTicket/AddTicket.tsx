import React from 'react';
import CustomModal from '../../../CustomModal';
import TicketForm from './TicketForm';
import { Ticket } from '../../../../models/Ticket';
import { addTickets } from '../../../../services/TicketService';

interface AddTicketProps {
  handleClose: () => void;
  handleAdded: () => void;
  open: boolean;
  screeningId: string;
}
const AddTicket = (props: AddTicketProps) => {
  const handleAddTickets = async (tickets: Ticket[]) => {
    await addTickets(tickets);
    props.handleClose();
    props.handleAdded();
  };
  return (
    <CustomModal
      open={props.open}
      handleClose={props.handleClose}
      body={
        <TicketForm
          screeningId={props.screeningId}
          handleClose={props.handleClose}
          handleAction={handleAddTickets}
        />
      }
    />
  );
};

export default AddTicket;
