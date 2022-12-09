import React, { createContext } from 'react'

import { User, UserContextType } from '../@types/user'




const UserProvider = ({ children }: { children: any}) => {

    const user: User = {
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        state: "",
        id: "",
        gender: "male",
    }

    const registerUser = (user: User) => {
        return user
    }

    const getUser = (id: string) => {
        return ""
    }

    
    const loginUser = (email: string, password: string) => {
        return user
    }

    

    const UserContext = createContext<UserContextType>({
        user,
        registerUser,
        getUser,
        loginUser
    })

    return (
        <UserContext.Provider value={{ user, registerUser, getUser, loginUser }}>
            { children }
        </UserContext.Provider>
    )
}

export default UserProvider