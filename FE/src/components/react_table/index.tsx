import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import classNames from 'classnames';
import React, { ReactNode } from 'react';
import Scrollbars from 'react-custom-scrollbars-2';

import theme from 'src/theme';
import Loading from '../loading';
import CScrollbars from '../scrollbars';
import { useStyles } from './styles';

interface IReactTableProps<
  T extends {
    id?: number | string;
  },
> {
  data: T[];
  columns: ColumnDef<T>[];
  isLoading?: boolean;
  isLoadingMore?: boolean;
  isError?: boolean;
  selectedId?: string | number;
  isResize?: boolean;
  isScroll?: boolean;
  size?: 'small' | 'medium';
  handleClick?: (data: T) => void;
  handleScrollStop?: (index: number) => void;
  handleScroll?: (index: number) => void;
}

const ReactTable = <
  T extends {
    id?: number | string;
  },
>(
  props: IReactTableProps<T>,
) => {
  const classes = useStyles();

  const {
    data,
    columns,
    handleClick,
    selectedId,
    isLoading = false,
    isLoadingMore = false,
    isError = false,
    isScroll = true,
    isResize = true,
    size = 'small',
    handleScroll,
    handleScrollStop,
  } = props;

  const scrollRef = React.createRef<Scrollbars>();

  const table = useReactTable({
    data,
    columns,
    enableColumnResizing: true,
    columnResizeMode: 'onChange',
    getCoreRowModel: getCoreRowModel(),
  });

  const handleScrollStopTable = () => {
    if (handleScrollStop && scrollRef.current) {
      const current: any = scrollRef.current;
      const top = current.getValues()?.top;
      const roundingTop = Math.ceil(top * 100);

      handleScrollStop(roundingTop);
    }
  };

  const handleScrollTable = () => {
    if (handleScroll && scrollRef.current) {
      const current: any = scrollRef.current;
      const top = current.getValues()?.top;
      const roundingTop = Math.ceil(top * 100);

      handleScroll(roundingTop);
    }
  };

  const renderStatus = (Node: ReactNode) => {
    return (
      <TableRow>
        <TableCell colSpan={columns.length} sx={{ borderBottom: 'none', textAlign: 'center' }}>
          {Node}
        </TableCell>
      </TableRow>
    );
  };

  const renderTableBody = () => {
    if (isLoading) {
      return renderStatus(<Loading />);
    }

    if (isError) {
      return renderStatus('Có lỗi xảy ra khi lấy dữ liệu');
    }

    if (table.getRowModel().rows.length === 0) {
      return renderStatus('Không có dữ liệu');
    }

    return (
      <React.Fragment>
        {table.getRowModel().rows.map((row) => {
          return (
            <TableRow
              key={row.id}
              hover
              sx={{
                cursor: 'pointer',
              }}
              onClick={(e) => {
                if (handleClick) {
                  e.stopPropagation();
                  handleClick(row.original);
                }
              }}
              selected={selectedId === row.original?.id}
            >
              {row.getVisibleCells().map((cell) => {
                return (
                  <TableCell
                    key={cell.id}
                    sx={{
                      overflow: 'hidden',
                      width: cell.column.getSize(),
                      maxWidth: cell.column.getSize(),
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                );
              })}
            </TableRow>
          );
        })}
        {isLoadingMore && renderStatus(<Loading />)}
      </React.Fragment>
    );
  };

  const renderTable = () => {
    return (
      <Table size={size} stickyHeader>
        <TableHead>
          {table.getHeaderGroups().map((headerGroup) => {
            return (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableCell
                      key={header.id}
                      className={classes.th}
                      colSpan={header.colSpan}
                      sx={{
                        width: header.getSize(),
                        fontWeight: 'bold',
                        whiteSpace: 'nowrap',
                        textAlign: header.id === 'STT' ? 'center' : 'initial',
                      }}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}

                      {header.column.getCanResize() && data.length > 0 && isResize && (
                        <Box
                          onMouseDown={header.getResizeHandler()}
                          onTouchStart={header.getResizeHandler()}
                          className={classNames(classes.resizer, {
                            [classes.isResizing]: header.column.getIsResizing(),
                          })}
                        />
                      )}
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
        </TableHead>

        <TableBody>{renderTableBody()}</TableBody>
      </Table>
    );
  };

  return (
    <TableContainer flex={1} bgcolor={theme.palette.common.white} component={Box}>
      {isScroll ? (
        <CScrollbars
          isTable
          ref={scrollRef}
          onScrollStop={handleScrollStopTable}
          onScroll={handleScrollTable}
        >
          {renderTable()}
        </CScrollbars>
      ) : (
        renderTable()
      )}
    </TableContainer>
  );
};

export default ReactTable;
