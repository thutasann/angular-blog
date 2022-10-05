export interface token{
    access_token: string;
}

export interface LoginForm{
    email: string;
    password: string;
}

export interface RegisterForm{
    name?: string;
    username?: string;
    email?: string;
    password?: string;
    passwordConfirm?: string;
}