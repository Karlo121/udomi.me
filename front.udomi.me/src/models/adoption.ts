export interface IAdoptionRequest {
    pet_id: number;
    user_id: number;
    owner_id: number;
    status: string;
    request_date: string;
}

export interface IAdoptionResponse {
    id: number;
    pet_id: number;
    user_id: number;
    owner_id: number;
    status: string;
    request_date: string;
    adoption_date: string | null;
}
