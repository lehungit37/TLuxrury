import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { Toaster } from 'react-hot-toast';

import App from './App';
import theme from 'src/theme';
import store from 'src/redux_store';
import GlobalDndContext from './dnd-context';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <Provider store={store}>
    <GlobalDndContext>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <App />
        </BrowserRouter>
        <Toaster position="top-center" />
      </ThemeProvider>
    </GlobalDndContext>
  </Provider>,
);
