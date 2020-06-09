import React from 'react';
import CustomModal from '../../../CustomModal';
import TicketForm from './TicketForm';

interface AddTicketProps {
  handleClose: () => void;
  open: boolean;
  screeningId: string;
}
const AddTicket = (props: AddTicketProps) => {
  return (
    <CustomModal
      open={props.open}
      handleClose={props.handleClose}
      body={<TicketForm screeningId={props.screeningId} />}
    />
  );
};

export default AddTicket;
