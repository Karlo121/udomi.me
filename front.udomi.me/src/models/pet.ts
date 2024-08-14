export interface IPet {
    id: number;
    name: string;
    breed_id: number;
    age: number;
    description: string;
    gender: 'male' | 'female' | 'unknown';
    adopted: boolean;
    created_at: string | null;
    created_by: number;
    image_url: string | null;
    location: string | null;
}

export interface ICreatePet {
    name: string;
    breed_id: number;
    age: number;
    description: string;
    gender: 'male' | 'female' | 'unknown';
    created_by: number;
    location?: string;
}

export interface IPetData {
    name: string;
    breed_id: number;
    age: number;
    description: string;
    gender: string;
    image: File | null;
    location: string;
}
