import React, { PureComponent } from 'react';
import { Box, Typography } from '@mui/material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import theme from 'src/theme';
import { formatNumberToVND } from 'src/utils/function';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <Box
        sx={{
          background: theme.palette.common.white,
          p: 2,
          borderRadius: 1,
          border: `1px solid ${theme.palette.grey[300]}`,
        }}
      >
        <Typography fontWeight={600}>Thời gian: {payload[0].payload.id}</Typography>
        <Typography fontWeight={600}>Doanh thu: {formatNumberToVND(payload[0].value)}</Typography>
      </Box>
    );
  }

  return null;
};

const renderLegend = (props) => {
  const { payload } = props;

  return (
    <Box>
      {payload.map((entry, index) => (
        <>
          <Box width="10px" height="10px" />
          <Typography>{entry.value}</Typography>
        </>
      ))}
    </Box>
  );
};

export default class Chart extends PureComponent {
  render() {
    const { data } = this.props;
    return (
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={300}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="id" />
          <YAxis tickCount={10} />
          <Legend />
          <Tooltip content={<CustomTooltip />} />
          <Bar
            name="Doanh thu"
            dataKey="totalAmount"
            barSize={60}
            fill={theme.palette.success.main}
          />
        </BarChart>
      </ResponsiveContainer>
    );
  }
}
