export interface AuthLogin {
    email: string;
    password: string;
}

export interface AuthRegister {
    email: string;
    username: string;
    password: string;
}

export interface AuthResponseLogin {
    username: string;
    message: string;
    jwt: string;
    status: string;
}

export interface UserInfo {
    username: string;
    email: string;
    id: number;
}