import React, { useState } from 'react';
import { Button, ThemeProvider } from '@material-ui/core';
import { customTheme } from '../../../LoginPage/sections/LoginFormStyles';
import CustomModal from '../../../CustomModal';

const AddButton = () => {
  const [open, setOpen] = useState<boolean>(false);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setOpen(true);
  };
  const handleClose = (event: React.MouseEvent<HTMLElement>) => {
    setOpen(false);
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
        body={<div>Formularz dodwania</div>}
      />
    </>
  );
};

export default AddButton;
