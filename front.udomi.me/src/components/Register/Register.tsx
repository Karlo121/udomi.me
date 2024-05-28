// src/pages/Register.tsx
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
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        try {
            const data = { username, email, password };
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
        <Container>
            <Typography variant='h4' component='h2' gutterBottom>
                Register
            </Typography>
            <Paper elevation={3} sx={{ padding: 3, marginTop: 2 }}>
                <Box
                    component='form'
                    sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
                    onSubmit={handleSubmit}
                >
                    <TextField
                        label='Username'
                        variant='outlined'
                        fullWidth
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <TextField
                        label='Email'
                        variant='outlined'
                        fullWidth
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        label='Password'
                        type='password'
                        variant='outlined'
                        fullWidth
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button variant='contained' color='primary' type='submit'>
                        Register
                    </Button>
                </Box>
                {error && <Typography color='error'>{error}</Typography>}
                {success && <Typography color='primary'>{success}</Typography>}
            </Paper>
        </Container>
    );
};

export default Register;
