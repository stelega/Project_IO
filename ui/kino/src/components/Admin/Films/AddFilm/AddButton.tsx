import React, { useState } from 'react';
import { Button, ThemeProvider } from '@material-ui/core';
import { customTheme } from '../../../LoginPage/sections/LoginFormStyles';
import CustomModal from '../../../CustomModal';
import AddForm from './AddFilmForm';

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

  const handleAdded = () => {
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
        body={<AddForm handleClose={handleClose} handleAdded={handleAdded} />}
      />
    </>
  );
};

export default AddButton;
