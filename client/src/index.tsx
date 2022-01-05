import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Routes from './Routes';
import reportWebVitals from './reportWebVitals';
import { ClientWrapper, UserWrapper } from './contexts';
import { createTheme, ThemeProvider } from '@mui/material';

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#2e4045'
    },
    secondary: {
      main: '#f50057'
    }
  },
  typography: {
    fontFamily: [
      'HKGrotesk',
      '-apple-system',
      'BlinkMacSystemFont',
      'Segoe UI',
      'Roboto',
      'Oxygen',
      'Ubuntu',
      'Cantarell',
      'Fira Sans',
      'Droid Sans',
      'Helvetica Neue',
      'sans-serif'
    ].join(',')
  }
});

ReactDOM.render(
  <React.StrictMode>
    <ClientWrapper>
      <UserWrapper>
        <ThemeProvider theme={lightTheme}>
          <Routes />
        </ThemeProvider>
      </UserWrapper>
    </ClientWrapper>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
