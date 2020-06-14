import React, { useState } from 'react';
import CustomModal from '../../../CustomModal';
import TicketForm from './TicketForm';
import { Ticket } from '../../../../models/Ticket';
import { addTickets } from '../../../../services/TicketService';
import { Dialog, Slide } from '@material-ui/core';
import { TransitionProps } from '@material-ui/core/transitions/transition';
import styled from 'styled-components';

const Content = styled.div`
  width: 25vw;
  height: 10vh;
  text-align: center;
  padding-top: 7vh;
  font-weight: bold;
`;

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>
) {
  return <Slide direction='up' ref={ref} {...props} />;
});

interface AddTicketProps {
  handleClose: () => void;
  handleAdded: () => void;
  open: boolean;
  screeningId: string;
}
const AddTicket = (props: AddTicketProps) => {
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [price, setPrice] = useState<number>(0);

  const handleDialogClose = () => {
    setOpenDialog(false);
    props.handleClose();
    props.handleAdded();
  };
  const handleAddTickets = async (tickets: Ticket[]) => {
    const price: number = await addTickets(tickets);
    setPrice(price);
    setOpenDialog(true);
  };
  return (
    <>
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
      <Dialog
        open={openDialog}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleDialogClose}>
        <Content>{'Cena całkowita: ' + price.toString()}</Content>
      </Dialog>
    </>
  );
};

export default AddTicket;
