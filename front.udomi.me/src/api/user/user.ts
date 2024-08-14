// src/api/auth.ts
import axiosInstance from '../axios';
import { IUser, IRegisterData, ILoginData } from '../../models/user';

export const registerUser = async (data: IRegisterData) => {
    try {
        const response = await axiosInstance.post('/register', data);
        return response.data;
    } catch (error) {
        console.error('Registration error:', error);
        throw error;
    }
};

export const loginUser = async (userData: ILoginData): Promise<IUser> => {
    try {
        const response = await axiosInstance.post<IUser>('/login', userData);
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
