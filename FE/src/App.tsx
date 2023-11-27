import React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import Routes from './routes';
import ModalController from './components/modal';
import './App.css';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Authentication from './components/authentication';

const App = () => {
  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <Authentication />
      <Routes />
      <ModalController />
    </LocalizationProvider>
  );
};

export default App;
