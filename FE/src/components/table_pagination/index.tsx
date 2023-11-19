import React from 'react';
import { Box, Pagination, Typography } from '@mui/material';

interface ITablePagination {
  totalData?: number;
  page: number;
  totalPage: number;
  disabled?: boolean;
  handleChangePage: (page: number) => void;
}

const TablePagination = ({
  page = 1,
  totalPage,
  handleChangePage,
  disabled,
  totalData,
}: ITablePagination) => {
  const onChange = (e: React.ChangeEvent<unknown>, newPage: number) => {
    if (page === newPage) return;
    handleChangePage(newPage);
  };

  return (
    <Box display="flex" justifyContent="space-between" alignItems="center" width="100%">
      <Pagination
        onChange={onChange}
        color="primary"
        page={page}
        count={totalPage}
        disabled={totalPage === 1 || totalData === 0 || disabled}
        showFirstButton
        showLastButton
        siblingCount={1}
      />
      <Typography>{`Tổng số: ${totalData}`}</Typography>
    </Box>
  );
};

export default TablePagination;
