import React from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import { Pets, Home as HomeIcon } from '@mui/icons-material'; // Import icons
import Paper from '@mui/material/Paper';

const Home: React.FC = () => {
    return (
        <Box
            sx={{
                width: '100vw',
                height: 'calc(100vh - 132px)',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                backgroundImage: 'url(/cat_bg.png)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '50%',
                    marginBottom: '50px',
                    padding: '20px',
                }}
            >
                <Button
                    variant='contained'
                    sx={{
                        backgroundColor: '#FFB347',
                        color: 'white',
                        fontSize: '1.5rem',
                        borderRadius: '50px',
                        padding: '20px 40px',
                        marginBottom: '20px',
                        display: 'flex',
                        alignItems: 'center',
                        '&:hover': {
                            backgroundColor: '#FF8C00',
                        },
                        '&:active': {
                            backgroundColor: '#FF4500',
                        },
                    }}
                    startIcon={<Pets />}
                >
                    Adopt
                </Button>
                <Button
                    variant='contained'
                    sx={{
                        backgroundColor: '#FFB347',
                        color: 'white',
                        fontSize: '1.5rem',
                        borderRadius: '50px',
                        padding: '20px 40px',
                        display: 'flex',
                        alignItems: 'center',
                        '&:hover': {
                            backgroundColor: '#FF8C00',
                        },
                        '&:active': {
                            backgroundColor: '#FF4500',
                        },
                    }}
                    startIcon={<HomeIcon />}
                >
                    Find a home
                </Button>
            </Box>
            <Box
                component='img'
                src='/home_bg.png'
                alt='Cat background'
                sx={{
                    width: '50%',
                    height: '100%',
                    objectFit: 'cover',
                }}
            />
        </Box>
    );
};

export default Home;
