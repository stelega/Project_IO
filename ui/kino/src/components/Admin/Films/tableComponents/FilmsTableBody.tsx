import React, { useState } from 'react';
import { TableBody, TableRow, TableCell, IconButton } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { Film } from '../../../../models/Film';
import CustomPopover from '../../../CustomPopover';

interface FilmsTableBodyProps {
  films: Film[];
  handleEditClick: (
    event: React.MouseEvent<HTMLElement>,
    movieId: string
  ) => void;
  handleDeleteClick: (
    event: React.MouseEvent<HTMLElement>,
    movieId: string
  ) => void;
}

const FilmsTableBody = (props: FilmsTableBodyProps) => {
  const { films } = props;
  const [anchorEl, setAnchorEl] = useState<Element | null>(null);
  const handleDeleteClick = (event: any, movieId: string) => {
    setAnchorEl(event.currentTarget);
    props.handleDeleteClick(event, movieId);
  };
  const handleClose = () => {
    setAnchorEl(null);
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
                    onClick={(event) =>
                      props.handleEditClick(event, row.movieId)
                    }>
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
        body={<div>Simple popover</div>}
      />
    </>
  );
};

export default FilmsTableBody;
