import { Box, Divider, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Scrollbars from 'react-custom-scrollbars-2';
import { useAppDispatch } from 'src/hooks';
import { useAppSelector } from 'src/redux_store';
import { getRoomsShow } from 'src/redux_store/room/room_actions';
import { IGetRoom, IRoom } from 'src/types/room';
import Filter from './filter';
import RoomItem from './room_item';
import emptyDataImage from 'src/assets/images/empty_data.jpeg';

function Home() {
  const [payload, setPayload] = useState<IGetRoom>({ status: '', roomTypeId: '' });
  const { data } = useAppSelector((state) => state.roomSlice.roomData);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getRoomsShow(payload)).unwrap();
  }, [payload]);

  const handleChangePayload = (name: string, value: any) => {
    setPayload((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Box sx={{ width: '100%', height: '100%' }}>
      <Grid container flexDirection="column" height="100%" rowSpacing={1}>
        <Grid item>
          <Filter handleChangePayload={handleChangePayload} />
        </Grid>
        <Grid item flex={1}>
          <Scrollbars>
            <Box sx={{ padding: 3, background: '#ffffff', height: '100%' }} flexWrap="wrap">
              {data.length ? (
                <Grid container spacing={3}>
                  {data.map((item) => {
                    return (
                      <Grid item md={3} key={item.id}>
                        <RoomItem room={item} />
                      </Grid>
                    );
                  })}
                </Grid>
              ) : (
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                  <img src={emptyDataImage} />
                </Box>
              )}
            </Box>
          </Scrollbars>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Home;
