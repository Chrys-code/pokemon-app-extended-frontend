import { createContext, useEffect, useReducer } from 'react';
import { User, UserActions } from './authContext.types';

// Creating context to hold & mutate state
export const AuthContext = createContext<User | null>(null);
export const AuthDispatchContext = createContext<React.Dispatch<any> | null>(null);

/**
 * Auth provider acts as a state manager for auth context cotaining user data
 * @param {ReactNode} children - The child components of the context provider 
 * @returns 
 */
export function AuthProvider({ children }: { children: React.ReactNode }) {

    const [user, dispatch] = useReducer(userReducer, initialUser);

    useEffect((): (() => void) => {
        console.log(user)
        return (): void => { }
    }, [user])

    return (
        <AuthContext.Provider value={user}>
            <AuthDispatchContext.Provider value={dispatch}>
                {children}
            </AuthDispatchContext.Provider>
        </AuthContext.Provider>
    );
}

/**
 * Handles state mutations
 * @param state - The User or Auth state 
 * @param action - Actions related to the auth context
 * @returns 
 */
function userReducer(state: User, action: UserActions) {
    switch (action.type) {
        case 'register': {
            return {
                ...state,
                id: action.userData?.id,
                email: action.userData?.email,
                isAuthenticated: action.userData?.isAuthenticated || false
            };
        }
        case 'login': {
            return {
                ...state,
                id: action.userData?.id,
                email: action.userData?.email,
                isAuthenticated: action.userData?.isAuthenticated || false
            };
        }
        case 'logout': {
            return {
                ...state,
                id: undefined,
                email: undefined,
                isAuthenticated: false
            };
        }
        default: {
            throw Error('Unknown action: ' + action.type);
        }
    }
}

function handleLogin() {

    console.log("login")

}

function handleLogout() {
    console.log("logout")
}

// Initial state for auth context
const initialUser: User = { id: undefined, email: undefined, isAuthenticated: false };