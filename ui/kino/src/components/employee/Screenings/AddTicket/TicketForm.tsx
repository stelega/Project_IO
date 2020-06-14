import React, { useState, useEffect } from 'react';
import { HallWithSeats, Seat } from '../../../../models/Hall';
import { getHallSeats } from '../../../../services/HallService';
import styled from 'styled-components';
import MyIcon from './MyIcon';
import SelectedTicketList from './SelectedTicketList';
import { Ticket } from '../../../../models/Ticket';
import { Button, ThemeProvider } from '@material-ui/core';
import { customTheme } from '../../../LoginPage/sections/LoginFormStyles';

const MainContainer = styled.div``;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 2vh;
`;
const Text = styled.div`
  font-weight: bold;
`;
const TableContainer = styled.div`
  display: block;
`;
const Row = styled.div`
  display: flex;
  height: 25px;
  text-align: center;
`;
const Cell = styled.div`
  width: 25px;
  text-align: center;
  hover: fade;
`;
const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 5%;
`;

interface TicketFormProps {
  screeningId: string;
  handleClose: () => void;
  handleAction: (tickets: Ticket[]) => void;
}

const TicketForm = (props: TicketFormProps) => {
  const [seats, setSeats] = useState<HallWithSeats>();
  const [selected, setSelected] = useState<Ticket[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getHallSeats(props.screeningId);
      setSeats(data);
    };
    fetchData();
    // eslint-disable-next-line
  }, []);

  const handleClick = (seat: Seat) => {
    const ticket: Ticket = {
      screeningId: props.screeningId,
      seat: seat,
      discount: false,
    };
    setSelected([...selected, ticket]);
  };
  const handleRemoveSelected = (seat: Seat) => {
    const index = selected.findIndex((ele) => ele.seat.seatId === seat.seatId);
    setSelected(selected.filter((_, i) => i !== index));
  };
  const handleDiscountChange = (seatId: string, discount: boolean) => {
    const index = selected.findIndex((ele) => ele.seat.seatId === seatId);
    setSelected((prevState) => {
      const newItems = [...prevState];
      newItems[index].discount = discount;
      return newItems;
    });
  };
  const handleActionClick = () => {
    props.handleAction(selected);
  };
  return (
    <MainContainer>
      <Container>
        <TableContainer>
          <Row key='chairsNumbers'>
            <Cell key='emptyCell' />
            {seats &&
              seats.data[0].map((element, index) => {
                return (
                  <Cell key={'chairNumber' + index}>
                    <Text>{index + 1}</Text>
                  </Cell>
                );
              })}
          </Row>
          {seats &&
            seats.data.map((element, index) => {
              return (
                <Row key={'row' + index}>
                  <Cell key={'rowNumber' + index}>
                    <Text>{index + 1}</Text>
                  </Cell>
                  {element.map((chair) => {
                    return (
                      <Cell key={chair.seatId}>
                        <MyIcon
                          seat={chair}
                          handleClicked={handleClick}
                          handleRemoved={handleRemoveSelected}
                        />
                      </Cell>
                    );
                  })}
                </Row>
              );
            })}
        </TableContainer>
      </Container>
      <Container>
        <SelectedTicketList
          selected={selected}
          handleTicketDiscountChange={handleDiscountChange}
        />
      </Container>
      <ThemeProvider theme={customTheme}>
        <ButtonContainer>
          <Button
            variant='contained'
            color='default'
            onClick={props.handleClose}>
            Wróć
          </Button>
          <Button
            variant='contained'
            color='secondary'
            disabled={selected.length === 0}
            onClick={handleActionClick}>
            Dodaj
          </Button>
        </ButtonContainer>
      </ThemeProvider>
    </MainContainer>
  );
};

export default TicketForm;
