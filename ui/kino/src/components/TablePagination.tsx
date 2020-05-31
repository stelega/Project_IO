import React from 'react';
import { TablePagination } from '@material-ui/core';

interface MyTablePaginationProps {
  page: number;
  totalCount: number;
  rowsPerPage: number;
  onChangePage: any;
  onChangeRowsPerPage: any;
}

const MyTablePagination = (props: MyTablePaginationProps) => {
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
      page={page - 1}
      onChangePage={(event: unknown, pageNumber: number) =>
        onChangePage(event, pageNumber + 1)
      }
      onChangeRowsPerPage={onChangeRowsPerPage}
      labelRowsPerPage={'Wierszy na stronę'}
      labelDisplayedRows={({ from, to, count }) => `${from}-${to} z ${count}`}
    />
  );
};

export default MyTablePagination;
