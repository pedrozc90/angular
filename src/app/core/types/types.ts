export interface IEnvironment {
    name: string;
    version: string;
    production: boolean;
    api: string;
}

export interface IAuth {
    access_token: string;
}

export interface UserCredentials {
    email: string;
    password: string;
}

export interface UserRegistration {
    id: number | null;
    email: string;
    username: string;
    password: string;
    confirm_password: string;
}

export interface User {
    id: number;
    email: string;
    username: string;
    password?: string;
    active: boolean;
}
