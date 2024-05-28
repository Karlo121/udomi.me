import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';

const Navigation: React.FC = () => {
    const navigate = useNavigate();

    const handleRegisterClick = () => {
        navigate('/register');
    };

    const handleLoginClick = () => {
        navigate('/login');
    };

    return (
        <AppBar position='static' sx={{ backgroundColor: '#FFB347' }}>
            <Toolbar>
                <Box
                    sx={{ display: 'flex', flexGrow: 1, alignItems: 'center' }}
                >
                    <Typography variant='h6' sx={{ flexGrow: 1 }}>
                        Udomi.me
                    </Typography>
                    <Button
                        color='inherit'
                        sx={{ mr: 2 }}
                        onClick={handleLoginClick}
                    >
                        Login
                    </Button>
                    <Button
                        color='inherit'
                        variant='outlined'
                        onClick={handleRegisterClick}
                    >
                        Register
                    </Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Navigation;
