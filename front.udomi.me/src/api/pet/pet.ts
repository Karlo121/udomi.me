import axiosInstance from '../axios';
import { IPet } from '../../models/Pet';

export const createPet = async (formData: FormData): Promise<IPet> => {
    const response = await axiosInstance.post<IPet>('/pets', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
};

export const getPets = async (): Promise<IPet[]> => {
    const response = await axiosInstance.get<IPet[]>('/pets');
    return response.data;
};

export const getPetById = async (id: number): Promise<IPet> => {
    const response = await axiosInstance.get<IPet>(`/pets/${id}`);
    return response.data;
};
