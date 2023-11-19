import React, { ReactNode, useEffect, useMemo, useRef, useState } from 'react';
import { Box } from '@mui/material';
import { Resize, ResizeHorizon } from 'react-resize-layout';

import theme from 'src/theme';
import { TableBoxLayout, TableContentLayout, TableFilterLayout } from './styles';
import { useAppSelector } from 'src/redux_store';

interface ITableLayout {
  filterPanel: ReactNode;
  tablePanel: ReactNode;
  tablePaginationPanel?: ReactNode;
  detailPanel: ReactNode;
  detailActionsPanel: ReactNode;
  isOpenDetailPanel: boolean;
  isResize?: boolean;

  optionsSize?: {
    left: number;
    right: number;
  };
}

const TableLayout: React.FunctionComponent<ITableLayout> = ({
  filterPanel,
  tablePanel,
  tablePaginationPanel,
  detailPanel,
  detailActionsPanel,
  isOpenDetailPanel,
  isResize = false,
  optionsSize,
}) => {
  const contentRef = useRef<any>();
  const [width, setWidth] = useState(window.innerWidth);
  const { isPin } = useAppSelector((state) => state.topBarSlice);

  useEffect(() => {
    const handleResize = () => {
      if (contentRef.current) {
        setWidth(contentRef.current.offsetWidth);
      }
    };
    handleResize();
  }, [contentRef.current, isPin]);

  useEffect(() => {
    const handleResize = () => {
      if (contentRef.current) {
        setWidth(contentRef.current.offsetWidth);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [contentRef.current, isPin]);

  return (
    <TableBoxLayout>
      {filterPanel && <TableFilterLayout>{filterPanel}</TableFilterLayout>}
      {isResize && width > 1240 ? (
        <TableContentLayout ref={contentRef}>
          <Resize
            onResizeStop={(e: any) => console.log(e)}
            handleWidth="8px"
            handleColor="transparent"
          >
            <Box display="flex" flexDirection="column" flex={optionsSize?.left || 1}>
              <Box display="flex" flex={1}>
                {tablePanel}
              </Box>
              {tablePaginationPanel && (
                <Box display="flex" mt={1} bgcolor={theme.palette.common.white} px={2} height={50}>
                  {tablePaginationPanel}
                </Box>
              )}
            </Box>
            {isOpenDetailPanel && (
              <ResizeHorizon minWidth={Math.max(615, width * 0.4)}>
                <Box height="100%" display="flex" flexDirection="column">
                  <Box flex={1} display="flex">
                    {detailPanel}
                  </Box>

                  {detailActionsPanel && (
                    <Box display="flex" mt={1} bgcolor={theme.palette.common.white} height={50}>
                      {detailActionsPanel}
                    </Box>
                  )}
                </Box>
              </ResizeHorizon>
            )}
          </Resize>
        </TableContentLayout>
      ) : (
        <TableContentLayout>
          <Box display="flex" flexDirection="column" flex={optionsSize?.left || 1}>
            <Box display="flex" flex={1}>
              {tablePanel}
            </Box>
            {tablePaginationPanel && (
              <Box display="flex" mt={1} bgcolor={theme.palette.common.white} px={2} height={50}>
                {tablePaginationPanel}
              </Box>
            )}
          </Box>
          {isOpenDetailPanel && (
            <Box flex={optionsSize?.right || 1} display="flex" flexDirection="column">
              <Box flex={1} display="flex">
                {detailPanel}
              </Box>
              {detailActionsPanel && (
                <Box display="flex" mt={1} bgcolor={theme.palette.common.white} height={50}>
                  {detailActionsPanel}
                </Box>
              )}
            </Box>
          )}
        </TableContentLayout>
      )}
    </TableBoxLayout>
  );
};

export default TableLayout;
