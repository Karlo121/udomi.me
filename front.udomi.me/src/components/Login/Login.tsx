import React, { useState } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { useUser } from '../../context/userContext/userContext';
import { loginUser } from '../../api/user/user';

const Login: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);

    const { login } = useUser();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        try {
            const data = { username, password };
            const user = await loginUser(data);
            console.log(user);
            login(user);
            setError(null);
            console.log('Login successful:', user);
        } catch (err) {
            setError('Login failed');
        }
    };

    return (
        <Container>
            <Typography variant='h4' component='h2' gutterBottom>
                Login
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
                        label='Password'
                        type='password'
                        variant='outlined'
                        fullWidth
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button variant='contained' color='primary' type='submit'>
                        Login
                    </Button>
                </Box>
                {error && <Typography color='error'>{error}</Typography>}
            </Paper>
        </Container>
    );
};

export default Login;
