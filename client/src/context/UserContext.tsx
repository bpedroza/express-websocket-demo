import type React from 'react';
import { createContext, useContext, useReducer, useState, type ActionDispatch } from 'react';
import type { User } from '../types/User.ts';

const userDefault = {
    id: -1,
    eventId: -1,
    isAdmin: false,
    email: '',
    name: ''
};

type UserAction = 
    | {type: 'LOGOUT'}
    | {type: 'LOGIN', payload: User}

export const UserContext = createContext<User>(userDefault);
export const UserDispatchContext = createContext<ActionDispatch<[action: UserAction]> | null>(null);

export type UserProviderProps = {
    children: React.ReactNode
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
    const [user, dispatch] = useReducer(userReducer, userDefault);

    return (
        <UserContext value={user}>
            <UserDispatchContext value={dispatch}>
                {children}
            </UserDispatchContext>
        </UserContext>
    )
};

export const useUserDispatchContext = () => {
    const context = useContext(UserDispatchContext);

    if(null === context) {
        throw new Error('User dispatch context must not be null');
    }

    return context;
}

function userReducer(user: User, action: UserAction) {
    switch(action.type) {
        case 'LOGOUT': {
            return userDefault;
        }
        case 'LOGIN': {
            return action.payload
        }
        default: {
            return user;
        }
    }
}