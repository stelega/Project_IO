import React from 'react';
import {IconButton, TableBody, TableCell, TableRow} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import {Employee} from "../../../../models/Employee";

interface EmployeesTableBodyProps {
  employees: Employee[];
  handleEditClick: (
    event: React.MouseEvent<HTMLElement>,
    employeeId: string
  ) => void;
  handleDeleteClick: (
    event: React.MouseEvent<HTMLElement>,
    employeeId: string
  ) => void;
}

const EmployeesTableBody = (props: EmployeesTableBodyProps) => {
  const { employees } = props;
  return (
    <TableBody>
      {employees &&
      props.employees.map((row) => {
        return (
          <TableRow hover tabIndex={-1} key={row.employeeId}>
            <TableCell align='center'>{row.name}</TableCell>
            <TableCell align='center'>{row.surname}</TableCell>
            <TableCell align='center'>{row.login}</TableCell>
            <TableCell align='center'>{row.isAdmin ? '\u2714' : '\u2716'}</TableCell>
            <TableCell align='right'>
              <IconButton
                onClick={(event) => props.handleEditClick(event, row.employeeId)}>
                <EditIcon />
              </IconButton>
              <IconButton
                onClick={(event) =>
                  props.handleDeleteClick(event, row.employeeId)
                }>
                <DeleteIcon />
              </IconButton>
            </TableCell>
          </TableRow>
        );
      })}
    </TableBody>
  );
};

export default EmployeesTableBody;
