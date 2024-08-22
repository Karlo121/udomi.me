import axiosInstance from '../axios';
import { IAdoptionRequest, IAdoptionResponse } from '../../models/adoption';

export const createAdoption = async (
    data: IAdoptionRequest
): Promise<IAdoptionResponse> => {
    try {
        const response = await axiosInstance.post<IAdoptionResponse>(
            '/adoptions',
            data
        );
        return response.data;
    } catch (error) {
        console.error('Adoption error:', error);
        throw error;
    }
};
