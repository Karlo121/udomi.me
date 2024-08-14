export interface IRegisterData {
    username: string;
    email: string;
    password: string;
    phone_number?: string;
}

export interface ILoginData {
    username: string;
    password: string;
}

export interface IUser {
    id: number;
    username: string;
    email: string;
    phone_number: string | null;
    created_at?: string | null;
    last_login?: string | null;
}
