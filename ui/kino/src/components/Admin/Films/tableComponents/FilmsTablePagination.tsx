import React from 'react';
import { TablePagination } from '@material-ui/core';

interface FilmsTablePaginationProps {
  page: number;
  totalCount: number;
  rowsPerPage: number;
  onChangePage: any;
  onChangeRowsPerPage: any;
}

const FilmsTablePagination = (props: FilmsTablePaginationProps) => {
  const {
    page,
    totalCount,
    rowsPerPage,
    onChangePage,
    onChangeRowsPerPage,
  } = props;
  return (
    <TablePagination
      rowsPerPageOptions={[5, 10, 25]}
      component='div'
      count={totalCount}
      rowsPerPage={rowsPerPage}
      page={page}
      onChangePage={onChangePage}
      onChangeRowsPerPage={onChangeRowsPerPage}
      labelRowsPerPage={'Wierszy na stronę'}
      labelDisplayedRows={({ from, to, count }) => `${from}-${to} z ${count}`}
    />
  );
};

export default FilmsTablePagination;
