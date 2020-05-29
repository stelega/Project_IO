import React from 'react';
import { Button, ThemeProvider } from '@material-ui/core';
import { customTheme } from '../../LoginPage/sections/LoginFormStyles';

const AddButton = () => {
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    console.log('dodaj');
  };
  return (
    <ThemeProvider theme={customTheme}>
      <Button
        variant={'contained'}
        color={'secondary'}
        size={'large'}
        onClick={handleClick}>
        Dodaj
      </Button>
    </ThemeProvider>
  );
};

export default AddButton;
