import axiosInstance from '../axios';

interface Breed {
    id: number;
    name: string;
}

export const getBreeds = async (): Promise<Breed[]> => {
    try {
        const response = await axiosInstance.get('/breeds');
        return response.data;
    } catch (error) {
        console.error('Failed to fetch breeds:', error);
        throw error;
    }
};
