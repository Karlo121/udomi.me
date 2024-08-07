import axiosInstance from '../axios';

interface PetData {
    name: string;
    breed_id: number;
    age: number;
    description: string;
    gender: string;
    created_by: number;
}

export const createPet = async (petData: PetData) => {
    try {
        const response = await axiosInstance.post('/pets', petData);
        return response.data;
    } catch (error) {
        console.error('Failed to add pet:', error);
        throw error;
    }
};
