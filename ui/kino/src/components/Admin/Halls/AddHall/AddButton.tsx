import React, { useState } from 'react';
import { Button, ThemeProvider } from '@material-ui/core';
import { customTheme } from '../../../LoginPage/sections/LoginFormStyles';
import CustomModal from '../../../CustomModal';
import HallForm from '../HallForm';
import { addHall } from '../../../../services/HallService';

interface AddHallButtonProps {
  handleAdded: () => void;
}

const AddButton = (props: AddHallButtonProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setOpen(true);
  };
  const handleClose = (event: React.MouseEvent<HTMLElement>) => {
    setOpen(false);
  };
  const handleAdd = async (
    name: string,
    rowsCount: number,
    seatsPerRow: number,
    availability: string
  ) => {
    await addHall(name, rowsCount, seatsPerRow, availability);
    setOpen(false);
    props.handleAdded();
  };
  return (
    <>
      <ThemeProvider theme={customTheme}>
        <Button
          variant={'contained'}
          color={'secondary'}
          size={'large'}
          onClick={handleClick}>
          Dodaj
        </Button>
      </ThemeProvider>
      <CustomModal
        open={open}
        handleClose={handleClose}
        body={
          <HallForm
            buttonText='Dodaj'
            handleClose={handleClose}
            handleAction={handleAdd}
            formTitle='Dodaj salę'
          />
        }
      />
    </>
  );
};

export default AddButton;
