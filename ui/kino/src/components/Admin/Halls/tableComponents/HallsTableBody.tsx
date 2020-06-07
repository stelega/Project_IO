import React, {useState} from 'react';
import {IconButton, TableBody, TableCell, TableRow} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import {Hall} from '../../../../models/Hall';
import styled from 'styled-components';
import CustomPopover from "../../../Popover/CustomPopover";
import ConfirmDeletePopover from "../../../Popover/ConfirmDeletePopover";

const Text = styled.div`
  font-weight: bold;
`;
const Green = styled(Text)`
  color: green;
`;

const Red = styled(Text)`
  color: red;
`;

interface HallsTableBodyProps {
  halls: Hall[];
  handleEdit: (
    event: React.MouseEvent<HTMLElement>,
    hallId: string
  ) => void;
  handleDelete: (
    event: React.MouseEvent<HTMLElement>,
    hallId: string
  ) => void;
}

const HallsTableBody = (props: HallsTableBodyProps) => {
  const {halls} = props;
  const [anchorEl, setAnchorEl] = useState<Element | null>(null);
  const [rowToDelete, setRowToDelete] = useState<string | null>(null);
  const handleDeleteClick = (event: any, hallId: string) => {
    setAnchorEl(event.currentTarget);
    setRowToDelete(hallId);
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
        {halls &&
        props.halls.map((row) => {
          return (
            <TableRow hover tabIndex={-1} key={row.hallId}>
              <TableCell align='center'>{row.name}</TableCell>
              <TableCell align='center'>{row.numOfSeats}</TableCell>
              <TableCell align='center'>
                {row.availability ? <Green>Tak</Green> : <Red>Nie</Red>}
              </TableCell>
              <TableCell align='right'>
                <IconButton
                  onClick={(event) => props.handleEdit(event, row.hallId)}>
                  <EditIcon/>
                </IconButton>
                <IconButton
                  onClick={(event) =>
                    handleDeleteClick(event, row.hallId)
                  }>
                  <DeleteIcon/>
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

export default HallsTableBody;
