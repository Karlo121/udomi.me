import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { ThemeProvider, createTheme } from '@mui/material';
import theme from './theme';
import { UserProvider } from './context/userContext/userContext.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <UserProvider>
            <ThemeProvider theme={theme}>
                <App />
            </ThemeProvider>
        </UserProvider>
    </React.StrictMode>
);
