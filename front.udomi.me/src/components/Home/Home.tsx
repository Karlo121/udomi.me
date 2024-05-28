import React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

const Home: React.FC = () => {
    return (
        <Container>
            <Typography variant='h1' component='h2' gutterBottom>
                Welcome to Pet Adoption
            </Typography>
            <Paper elevation={3} sx={{ padding: 2, marginTop: 2 }}>
                <Typography variant='body1'>
                    Find your new best friend today. Browse through our
                    available pets and adopt your perfect match.
                </Typography>
                <Button
                    variant='contained'
                    color='primary'
                    sx={{ marginTop: 2 }}
                >
                    See Available Pets
                </Button>
            </Paper>
        </Container>
    );
};

export default Home;
