import React, { useState } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { registerUser } from '../../api/user/user';

const Register: React.FC = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState(''); // New phone number state
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        try {
            const data = {
                username,
                email,
                password,
                phone_number: phoneNumber,
            };
            const result = await registerUser(data);
            setSuccess('Registration successful');
            setError(null);
            console.log('Registered user:', result);
        } catch (err) {
            setError('Registration failed');
            setSuccess(null);
        }
    };

    return (
        <Container
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minWidth: '100vw',
                minHeight: '87.4vh',
                paddingTop: '0px',
                position: 'relative',
                overflow: 'hidden',
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    width: '100%',
                    maxWidth: '600px',
                    marginRight: '160px',
                }}
            >
                <Typography
                    variant='h2'
                    component='h1'
                    gutterBottom
                    sx={{ color: '#FFB347', fontWeight: 'bold' }}
                >
                    Register
                </Typography>
                <Paper
                    elevation={0}
                    sx={{
                        padding: 3,
                        marginTop: 2,
                        width: '100%',
                        backgroundColor: 'transparent',
                    }}
                >
                    <Box
                        component='form'
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 3,
                        }}
                        onSubmit={handleSubmit}
                    >
                        <TextField
                            label='Username'
                            variant='outlined'
                            fullWidth
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: '50px',
                                    fontSize: '1.2rem',
                                    '& fieldset': {
                                        borderColor: '#AEC6CF',
                                    },
                                    '&:hover fieldset': {
                                        borderColor: '#FFB347',
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: '#FFB347',
                                    },
                                },
                            }}
                        />
                        <TextField
                            label='Email'
                            variant='outlined'
                            fullWidth
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: '50px',
                                    fontSize: '1.2rem',
                                    '& fieldset': {
                                        borderColor: '#AEC6CF',
                                    },
                                    '&:hover fieldset': {
                                        borderColor: '#FFB347',
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: '#FFB347',
                                    },
                                },
                            }}
                        />
                        <TextField
                            label='Password'
                            type='password'
                            variant='outlined'
                            fullWidth
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: '50px',
                                    fontSize: '1.2rem',
                                    '& fieldset': {
                                        borderColor: '#AEC6CF',
                                    },
                                    '&:hover fieldset': {
                                        borderColor: '#FFB347',
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: '#FFB347',
                                    },
                                },
                            }}
                        />
                        <TextField
                            label='Phone Number'
                            variant='outlined'
                            fullWidth
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: '50px',
                                    fontSize: '1.2rem',
                                    '& fieldset': {
                                        borderColor: '#AEC6CF',
                                    },
                                    '&:hover fieldset': {
                                        borderColor: '#FFB347',
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: '#FFB347',
                                    },
                                },
                            }}
                        />
                        <Button
                            variant='contained'
                            type='submit'
                            sx={{
                                backgroundColor: '#FFB347',
                                color: 'white',
                                fontSize: '1.2rem',
                                borderRadius: '50px',
                                padding: '10px 20px',
                                width: '150px',
                                alignSelf: 'center',
                                '&:hover': {
                                    backgroundColor: '#FF8C00',
                                },
                                '&:active': {
                                    backgroundColor: '#FF4500',
                                },
                            }}
                        >
                            Register
                        </Button>
                    </Box>
                    {error && <Typography color='error'>{error}</Typography>}
                    {success && (
                        <Typography color='primary'>{success}</Typography>
                    )}
                </Paper>
            </Box>
            <Box
                component='img'
                src='/cat_two.png'
                alt='Cat'
                sx={{
                    height: '600px',
                    position: 'absolute',
                    bottom: 0,
                    right: 0,
                    margin: 0,
                    padding: 0,
                }}
            />
        </Container>
    );
};

export default Register;
