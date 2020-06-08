import React, { useState } from 'react';
import { Button, ThemeProvider } from '@material-ui/core';
import { customTheme } from '../../../LoginPage/sections/LoginFormStyles';
import CustomModal from '../../../CustomModal';
import FilmForm from '../FilmForm';
import { Moment } from 'moment';
import { addFilm } from '../../../../services/FilmService';

interface AddButtonProps {
  handleAdded: () => void;
}
const AddButton = (props: AddButtonProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setOpen(true);
  };
  const handleClose = (event: React.MouseEvent<HTMLElement>) => {
    setOpen(false);
  };

  const handleAdd = async (
    title: string,
    director: string,
    ageCategory: string,
    movieCategory: string,
    duration: number,
    dateStart: Moment,
    dateEnd: Moment
  ) => {
    await addFilm(
      title,
      director,
      ageCategory,
      movieCategory,
      duration,
      dateStart,
      dateEnd
    );
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
          <FilmForm
            handleClose={handleClose}
            handleAction={handleAdd}
            buttonText='Dodaj'
            formTitle='Dodaj film'
          />
        }
      />
    </>
  );
};

export default AddButton;
