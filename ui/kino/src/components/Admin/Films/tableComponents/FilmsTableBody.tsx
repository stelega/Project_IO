import React, { useState } from 'react';
import { TableBody, TableRow, TableCell, IconButton } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { Film } from '../../../../models/Film';
import CustomPopover from '../../../Popover/CustomPopover';
import ConfirmDeletePopover from '../../../Popover/ConfirmDeletePopover';

interface FilmsTableBodyProps {
  films: Film[];
  handleEdit: (event: React.MouseEvent<HTMLElement>, movieId: string) => void;
  handleDelete: (event: React.MouseEvent<HTMLElement>, movieId: string) => void;
}

const FilmsTableBody = (props: FilmsTableBodyProps) => {
  const { films } = props;
  const [anchorEl, setAnchorEl] = useState<Element | null>(null);
  const [rowToDelete, setRowToDelete] = useState<string | null>(null);
  const handleDeleteClick = (event: any, movieId: string) => {
    setAnchorEl(event.currentTarget);
    setRowToDelete(movieId);
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
        {films &&
          props.films.map((row) => {
            return (
              <TableRow hover tabIndex={-1} key={row.movieId}>
                <TableCell size='medium' align='center'>
                  {row.title}
                </TableCell>
                <TableCell align='center'>{row.movieCategory}</TableCell>
                <TableCell align='center'>{row.releaseDate}</TableCell>
                <TableCell align='center'>{row.closeDate}</TableCell>
                <TableCell align='right'>
                  <IconButton
                    onClick={(event) => props.handleEdit(event, row.movieId)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    onClick={(event) => handleDeleteClick(event, row.movieId)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            );
          })}
      </TableBody>
      <CustomPopover
        id='delete-popover'
        handleClose={handleClose}
        anchorEl={anchorEl}
        body={
          <ConfirmDeletePopover
            onCancel={handleClose}
            onConfirm={handleConfirmDelete}
          />
        }
      />
    </>
  );
};

export default FilmsTableBody;
