import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../context/userContext/userContext';

const Navigation: React.FC = () => {
    const navigate = useNavigate();
    const { user, logout } = useUser();

    const handleRegisterClick = () => {
        navigate('/register');
    };

    const handleLoginClick = () => {
        navigate('/login');
    };

    const handleLogoClick = () => {
        navigate('/');
    };

    const handleProfileClick = () => {
        navigate('/profile');
    };

    const handleAddPetClick = () => {
        navigate('/add-pet');
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <AppBar
            position='static'
            sx={{
                backgroundColor: 'transparent',
            }}
        >
            <Toolbar>
                <Box
                    sx={{
                        display: 'flex',
                        flexGrow: 1,
                        alignItems: 'center',
                        height: 100,
                    }}
                >
                    <Box
                        sx={{
                            mr: 2,
                            mt: -2,
                            cursor: 'pointer',
                            '&:hover img': {
                                transform: 'scale(1.1)',
                                transition: 'transform 0.2s',
                            },
                        }}
                        onClick={handleLogoClick}
                    >
                        <img src='/logo.png' alt='Logo' height='130' />
                    </Box>
                </Box>
                <Box>
                    {user ? (
                        <>
                            <Button
                                color='inherit'
                                sx={{
                                    fontWeight: 'bold',
                                    color: '#FFB347',
                                    fontSize: '1.2rem',
                                    transition: 'transform 0.2s',
                                    '&:hover': {
                                        transform: 'scale(1.1)',
                                        color: '#FF8C00',
                                    },
                                    '&:active': {
                                        transform: 'scale(0.95)',
                                        color: '#FF4500',
                                    },
                                }}
                                onClick={handleProfileClick}
                            >
                                {user.username}
                            </Button>
                            <Button
                                color='inherit'
                                variant='outlined'
                                sx={{
                                    ml: 2,
                                    fontWeight: 'bold',
                                    color: '#FFB347',
                                    fontSize: '1.2rem',
                                    borderColor: '#FFB347',
                                    transition: 'transform 0.2s',
                                    '&:hover': {
                                        transform: 'scale(1.1)',
                                        color: '#FF8C00',
                                        borderColor: '#FF8C00',
                                    },
                                    '&:active': {
                                        transform: 'scale(0.95)',
                                        color: '#FF4500',
                                        borderColor: '#FF4500',
                                    },
                                }}
                                onClick={handleAddPetClick}
                            >
                                Add Pet
                            </Button>
                            <Button
                                color='inherit'
                                variant='outlined'
                                sx={{
                                    ml: 2,
                                    fontWeight: 'bold',
                                    color: '#FFB347',
                                    fontSize: '1.2rem',
                                    borderColor: '#FFB347',
                                    transition: 'transform 0.2s',
                                    '&:hover': {
                                        transform: 'scale(1.1)',
                                        color: '#FF8C00',
                                        borderColor: '#FF8C00',
                                    },
                                    '&:active': {
                                        transform: 'scale(0.95)',
                                        color: '#FF4500',
                                        borderColor: '#FF4500',
                                    },
                                }}
                                onClick={handleLogout}
                            >
                                Logout
                            </Button>
                        </>
                    ) : (
                        <>
                            <Button
                                color='inherit'
                                sx={{
                                    mr: 2,
                                    fontWeight: 'bold',
                                    color: '#FFB347',
                                    fontSize: '1.2rem',
                                    transition: 'transform 0.2s',
                                    '&:hover': {
                                        transform: 'scale(1.1)',
                                        color: '#FF8C00',
                                    },
                                    '&:active': {
                                        transform: 'scale(0.95)',
                                        color: '#FF4500',
                                    },
                                }}
                                onClick={handleLoginClick}
                            >
                                Login
                            </Button>
                            <Button
                                color='inherit'
                                variant='outlined'
                                sx={{
                                    fontWeight: 'bold',
                                    color: '#FFB347',
                                    fontSize: '1.2rem',
                                    borderColor: '#FFB347',
                                    transition: 'transform 0.2s',
                                    '&:hover': {
                                        transform: 'scale(1.1)',
                                        color: '#FF8C00',
                                        borderColor: '#FF8C00',
                                    },
                                    '&:active': {
                                        transform: 'scale(0.95)',
                                        color: '#FF4500',
                                        borderColor: '#FF4500',
                                    },
                                }}
                                onClick={handleRegisterClick}
                            >
                                Register
                            </Button>
                        </>
                    )}
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Navigation;
