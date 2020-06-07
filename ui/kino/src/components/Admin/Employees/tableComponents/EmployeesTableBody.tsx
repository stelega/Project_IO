import React, {useState} from 'react';
import {IconButton, TableBody, TableCell, TableRow} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import {Employee} from "../../../../models/Employee";
import CustomPopover from "../../../Popover/CustomPopover";
import ConfirmDeletePopover from "../../../Popover/ConfirmDeletePopover";

interface EmployeesTableBodyProps {
  employees: Employee[];
  handleEdit: (
    event: React.MouseEvent<HTMLElement>,
    employeeId: string
  ) => void;
  handleDelete: (
    event: React.MouseEvent<HTMLElement>,
    employeeId: string
  ) => void;
}

const EmployeesTableBody = (props: EmployeesTableBodyProps) => {
  const { employees } = props;
  const [anchorEl, setAnchorEl] = useState<Element | null>(null);
  const [rowToDelete, setRowToDelete] = useState<string | null>(null);
  const handleDeleteClick = (event: any, employeeId: string) => {
    setAnchorEl(event.currentTarget);
    setRowToDelete(employeeId);
  };
  const handleClose = () => {
    setAnchorEl(null);
    setRowToDelete(null);
  };
  const handleConfirmDelete = (event: React.MouseEvent<HTMLElement>) => {
    if (rowToDelete) {
      props.handleDelete(event, rowToDelete);
      handleClose();
    }
  };
  return (
    <>
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
                onClick={(event) => props.handleEdit(event, row.employeeId)}>
                <EditIcon />
              </IconButton>
              <IconButton
                onClick={(event) =>
                  handleDeleteClick(event, row.employeeId)
                }>
                <DeleteIcon />
              </IconButton>
            </TableCell>
          </TableRow>
        );
      })}
    </TableBody>
      <CustomPopover
        handleClose={handleClose}
        body={<ConfirmDeletePopover
          onCancel={handleClose}
          onConfirm={handleConfirmDelete}
        />}
        id={'delete-popover'}
        anchorEl={anchorEl}
      />
      </>
  );
};

export default EmployeesTableBody;
