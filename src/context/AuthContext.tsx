import { createContext } from "react";

export type UserType = {
    id: string;
    firstName: string;
    lastName?: string;
    username?: string;
    photoUrl?: string;
};

export type AuthContextType = {
    user: UserType;
    login: (userData: UserType) => void;
};

export const defaultUser: UserType = {
    id: "",
    firstName: "Guest",
};

export const AuthContext = createContext<AuthContextType | null>(null);
