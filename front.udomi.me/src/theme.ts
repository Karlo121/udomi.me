// src/theme.ts
import { createTheme } from '@mui/material/styles';

// Define the pastel colors
const pastelOrange = '#FFB347';
const pastelGreen = '#B0E57C';
const pastelBlue = '#AEC6CF';
const pastelPink = '#FFB3BA';
const pastelBackground = '#F7F7F7';
const pastelText = '#333333';

const theme = createTheme({
    palette: {
        primary: {
            main: pastelOrange,
        },
        secondary: {
            main: pastelGreen,
        },
        background: {
            default: pastelBackground,
        },
        text: {
            primary: pastelText,
        },
    },
    typography: {
        fontFamily: 'Roboto, Arial, sans-serif',
        h1: {
            fontSize: '2.5rem',
            fontWeight: 500,
            color: pastelOrange,
        },
        h2: {
            fontSize: '2rem',
            fontWeight: 500,
            color: pastelOrange,
        },
        body1: {
            fontSize: '1rem',
            color: pastelText,
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                },
                containedPrimary: {
                    backgroundColor: pastelOrange,
                    '&:hover': {
                        backgroundColor: '#FFA726',
                    },
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    padding: 16,
                    backgroundColor: pastelBackground,
                },
            },
        },
    },
});

export default theme;
