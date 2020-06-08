import React, { useState } from 'react';
import { Button, ThemeProvider } from '@material-ui/core';
import { customTheme } from '../../../LoginPage/sections/LoginFormStyles';
import CustomModal from '../../../CustomModal';
import EmployeeForm from '../EmployeeForm';
import { addEmployee } from '../../../../services/EmployeeService';

interface AddEmployeeButtonProps {
  handleAdded: () => void;
}

const AddButton = (props: AddEmployeeButtonProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setOpen(true);
  };
  const handleClose = (event: React.MouseEvent<HTMLElement>) => {
    setOpen(false);
  };
  const handleAdd = async (
    name: string,
    surname: string,
    login: string,
    password: string,
    isAdminn: boolean
  ) => {
    await addEmployee(name, surname, login, password, isAdminn);
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
          <EmployeeForm
            buttonText='Dodaj'
            handleClose={handleClose}
            handleAction={handleAdd}
            formTitle='Dodaj pracownika'
          />
        }
      />
    </>
  );
};

export default AddButton;
