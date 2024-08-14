// src/api/auth.ts
import axiosInstance from '../axios';

interface RegisterData {
    username: string;
    email: string;
    password: string;
    phone_number: string;
}

interface LoginData {
    username: string;
    password: string;
}

interface User {
    id: number;
    username: string;
    email: string;
    phone_number: string | null;
}

export const registerUser = async (data: RegisterData) => {
    try {
        const response = await axiosInstance.post('/register', data);
        return response.data;
    } catch (error) {
        console.error('Registration error:', error);
        throw error;
    }
};

export const loginUser = async (userData: LoginData): Promise<User> => {
    try {
        const response = await axiosInstance.post<User>('/login', userData);
        return response.data;
    } catch (error) {
        console.error('Login error:', error);
        throw error;
    }
};

export const getUserById = async (id: number) => {
    const response = await axiosInstance.get(`/users/${id}`);
    return response.data;
};
