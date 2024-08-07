import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Home from './components/Home/Home';
import Register from './components/Register/Register';
import Navigation from './components/Navigation/Navigation';
import Login from './components/Login/Login';
import Profile from './components/Profile/Profile';
import AddPetForm from './components/AddPet/AddPetForm';

const App: React.FC = () => {
    return (
        <Router>
            <Navigation />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/register' element={<Register />} />
                <Route path='/login' element={<Login />} />
                <Route path='/profile' element={<Profile />} />
                <Route path='/add-pet' element={<AddPetForm />} />
            </Routes>
        </Router>
    );
};

export default App;
