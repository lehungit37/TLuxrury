import React from 'react';
import { Routes as Router, Route, Navigate } from 'react-router-dom';
import { Box } from '@mui/material';

import Loading from 'src/components/loading';
import { CPath, CRouteList } from 'src/constants';
import { useAppSelector } from 'src/redux_store';
import { checkRenderRouteAndMenu } from 'src/utils/user';
import _ from 'lodash';

const Routes = () => {
  const { me } = useAppSelector((state) => state.myAccountSlice);

  return (
    <Router>
      {!_.isEmpty(me) ? (
        <Route path="/" element={<Navigate to={CPath.home} replace />} />
      ) : (
        <Route path="/" element={<Navigate to={CPath.login} replace />} />
      )}

      {CRouteList.map((route) => {
        const Page = route.component;
        const Layout = route.layout ? route.layout : React.Fragment;
        // if (route?.isNotDefaultRoute) return;
        // if (me && route.permission) {
        //   const isRender = checkRenderRouteAndMenu(me, route.permission);

        //   if (!isRender) return;
        // }

        return (
          <Route
            key={route.path}
            path={route.path}
            element={
              <Layout>
                <React.Suspense
                  fallback={
                    <Box flex={1}>
                      <Loading />
                    </Box>
                  }
                >
                  <Page />
                </React.Suspense>
              </Layout>
            }
          />
        );
      })}
    </Router>
  );
};

export default Routes;
