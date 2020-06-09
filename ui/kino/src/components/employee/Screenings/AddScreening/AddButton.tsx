import React, { useState } from 'react';
import { Button, ThemeProvider } from '@material-ui/core';
import { customTheme } from '../../../LoginPage/sections/LoginFormStyles';
import CustomModal from '../../../CustomModal';
import ScreeningForm from './ScreeningForm';
import { Moment } from 'moment';
import { addScreening } from '../../../../services/ScreeningService';

interface AddScreeningProps {
  handleAdded: () => void;
}

const AddButton = (props: AddScreeningProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setOpen(true);
  };
  const handleClose = (event: React.MouseEvent<HTMLElement>) => {
    setOpen(false);
  };
  const handleAdd = async (
    filmId: string,
    date: Moment,
    hallId: string,
    hour: string
  ) => {
    await addScreening(filmId, date, hallId, hour);
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
          <ScreeningForm handleClose={handleClose} handleAction={handleAdd} />
        }
      />
    </>
  );
};

export default AddButton;
