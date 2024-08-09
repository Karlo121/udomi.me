import axiosInstance from '../axios';

export const createPet = async (formData: FormData) => {
    const response = await axiosInstance.post('/pets', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
};

export const getPets = async () => {
    const response = await axiosInstance.get('/pets');
    return response.data;
};
