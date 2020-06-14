import React, { useState, useEffect } from 'react';
import { Employee } from '../../../../models/Employee';
import CustomModal from '../../../CustomModal';
import {
  getEmployee,
  editEmployee,
} from '../../../../services/EmployeeService';
import EditEmployeeForm from './EditEmployeeForm';

interface EditEmployeeProps {
  handleEdited: () => void;
  handleClose: () => void;
  employeeId: string;
}

const EditEmployee = (props: EditEmployeeProps) => {
  const [open, setOpen] = useState<boolean>(true);
  const [employee, setEmployee] = useState<Employee>();

  useEffect(() => {
    const fetchData = async () => {
      const result = await getEmployee(props.employeeId);
      setEmployee(result);
    };
    fetchData();
    // eslint-disable-next-line
  }, []);

  const handleClose = (event: React.MouseEvent<HTMLElement>) => {
    setOpen(false);
    props.handleClose();
  };
  const handleEdit = async (
    name: string,
    surname: string,
    login: string,
    isAdmin: boolean
  ) => {
    await editEmployee(props.employeeId, name, surname, login, isAdmin);
    props.handleEdited();
  };
  const handleEditWithPassword = async (
    name: string,
    surname: string,
    login: string,
    password: string,
    isAdmin: boolean
  ) => {
    await editEmployee(
      props.employeeId,
      name,
      surname,
      login,
      isAdmin,
      password
    );
    props.handleEdited();
  };

  return (
    <>
      {employee && (
        <CustomModal
          open={open}
          handleClose={handleClose}
          body={
            <EditEmployeeForm
              employee={employee}
              handleClose={handleClose}
              handleEdit={handleEdit}
              handleEditWithPassword={handleEditWithPassword}
            />
          }
        />
      )}
    </>
  );
};

export default EditEmployee;
