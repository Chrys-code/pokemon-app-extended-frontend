export interface User {
    id: string | undefined,
    email: string | undefined,
    isAuthenticated: boolean;
}

export interface UserActions {
    type: UserActionTypes,
    userData?: AuthContextUserData
}

export type UserData = { id: string, email: string };

export interface AuthContextUserData extends UserData {
    isAuthenticated: boolean;
}

export type UserActionTypes = "login" | "logout" | "register";