import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { AppDataContextProvider } from './components/AppDataProvider.tsx';
import { FileDropperContextProvider } from './components/FileDropperProvider';
import './index.css';
import { createTheme } from '@mui/material/styles';

import { ThemeProvider } from '@emotion/react';

window.global = window;

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#5361D9',
      contrastText: '#FFFFFF',
    },
    secondary: {
      contrastText: '#5361D9',
      main: '#FFFFFF',
    },
  },
  typography: {
    h3: {
      fontSize: '2rem',
      fontWeight: 500,
    },
    h4: {
      fontSize: '1.5rem',
      letterSpacing: '3px',
      fontWeight: 500,
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 500,
    },
    allVariants: {
      letterSpacing: '0.46px',
      lineHeight: 1.375,
      fontSize: '1rem',
      fontWeight: 400,
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ThemeProvider theme={theme}>
    <AppDataContextProvider>
      <FileDropperContextProvider>
        <App />
      </FileDropperContextProvider>
    </AppDataContextProvider>
  </ThemeProvider>,
);
