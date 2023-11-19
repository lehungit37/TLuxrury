import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, SxProps, Tab } from '@mui/material';
import React from 'react';
import Scrollbars from 'react-custom-scrollbars-2';
import theme from 'src/theme';
import { ITabItem } from 'src/types/common';

interface IProps {
  value: string;
  handleChange: (value: string) => void;
  tabList: ITabItem[];
  sx?: SxProps;
}

const TabLayout = (props: IProps) => {
  const { value, handleChange, tabList, sx = {} } = props;

  const onChange = (event: React.SyntheticEvent, newValue: string) => {
    handleChange(newValue);
  };

  return (
    <Box display="flex" height="100%" flex={1} flexDirection="column">
      <TabContext value={value}>
        <Box
          bgcolor={theme.palette.background.paper}
          mx={1}
          sx={{
            borderBottom: 1,
            borderColor: 'divider',
            ...sx,
          }}
        >
          <TabList onChange={onChange} variant="scrollable">
            {tabList.map((tab) => (
              <Tab sx={{ fontWeight: 700 }} label={tab.label} value={tab.key} key={tab.key} />
            ))}
          </TabList>
        </Box>
        {tabList.map((tab) => (
          <TabPanel sx={{ m: 0, p: 0, flex: 1 }} value={tab.key} key={tab.key}>
            <Scrollbars>
              <Box height="100%" display="flex">
                {tab.component}
              </Box>
            </Scrollbars>
          </TabPanel>
        ))}
      </TabContext>
    </Box>
  );
};

export default TabLayout;
