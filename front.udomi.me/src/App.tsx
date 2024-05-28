import React from 'react';

import Container from '@mui/material/Container';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Home from './components/Home/Home';
import Register from './components/Register/Register';
import Navigation from './components/Navigation/Navigation';
import Login from './components/Login/Login';

const App: React.FC = () => {
    return (
        <Router>
            <Navigation />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/register' element={<Register />} />
                <Route path='/login' element={<Login />} />
            </Routes>
        </Router>
    );
};

export default App;
