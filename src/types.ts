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

export interface User {
    id?: number
    name?: string;
    username?: string;
    email?: string;
    password?: string;
    role?: string;
    profileImage?: string;
    // passwordConfirm?: string;
} 

export interface UserListData{
    items: User[],
    meta: {
        totalItems: number;
        itemCount: number;
        itemsPerPage: number;
        totalPages: number;
        currentPage: number;
    }, 
    links: {
        first: string;
        previous: string;
        next: string;
        last: string;
    }
}