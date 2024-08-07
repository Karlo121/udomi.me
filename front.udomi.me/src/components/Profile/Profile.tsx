import React from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../context/userContext/userContext';

const Profile: React.FC = () => {
    const navigate = useNavigate();
    const { user, logout } = useUser();

    if (!user) {
        navigate('/login');
        return null;
    }

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <Container
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '100vh',
                padding: '20px',
                backgroundImage: 'url(/profile_bg.png)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            <Box
                sx={{
                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    borderRadius: '10px',
                    padding: '30px',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                }}
            >
                <Typography
                    variant='h4'
                    component='h1'
                    gutterBottom
                    sx={{ fontWeight: 'bold', color: '#333' }}
                >
                    Profile
                </Typography>
                <Typography
                    variant='h6'
                    component='h2'
                    gutterBottom
                    sx={{ color: '#555' }}
                >
                    Username: {user.username}
                </Typography>
                <Typography
                    variant='h6'
                    component='h2'
                    gutterBottom
                    sx={{ color: '#555' }}
                >
                    Email: {user.email}
                </Typography>
                <Button
                    variant='contained'
                    sx={{
                        backgroundColor: '#FFB347',
                        color: 'white',
                        fontSize: '1.2rem',
                        borderRadius: '50px',
                        padding: '10px 20px',
                        marginTop: '20px',
                        '&:hover': {
                            backgroundColor: '#FF8C00',
                        },
                        '&:active': {
                            backgroundColor: '#FF4500',
                        },
                    }}
                    onClick={handleLogout}
                >
                    Logout
                </Button>
            </Box>
        </Container>
    );
};

export default Profile;
