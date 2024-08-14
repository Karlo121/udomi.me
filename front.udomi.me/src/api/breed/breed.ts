import { IBreed } from '../../models/breed';
import axiosInstance from '../axios';

export const getBreeds = async (): Promise<IBreed[]> => {
    try {
        const response = await axiosInstance.get('/breeds');
        return response.data;
    } catch (error) {
        console.error('Failed to fetch breeds:', error);
        throw error;
    }
};

export const getBreedById = async (id: number): Promise<IBreed> => {
    const response = await axiosInstance.get<IBreed>(`/breeds/${id}`);
    return response.data;
};
