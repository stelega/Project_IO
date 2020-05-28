import React from 'react';
import { TableBody, TableRow, TableCell, IconButton } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { Film } from '../../../../models/Films';

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
  return (
    <TableBody>
      {props.films.map((row) => {
        return (
          <TableRow hover tabIndex={-1} key={row.movieId}>
            <TableCell align='center'>{row.title}</TableCell>
            <TableCell align='center'>{row.movieCategory}</TableCell>
            <TableCell align='center'>{row.releaseDate}</TableCell>
            <TableCell align='center'>{row.closeDate}</TableCell>
            <TableCell align='right'>
              <IconButton
                onClick={(event) => props.handleEditClick(event, row.movieId)}>
                <EditIcon />
              </IconButton>
              <IconButton
                onClick={(event) =>
                  props.handleDeleteClick(event, row.movieId)
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

export default FilmsTableBody;
