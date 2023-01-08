import React, { createContext } from 'react'

import { User, UserContextType } from '../@types/user'





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

const getUserFromDB = (id: string) => {
    return ""
}


const loginUser = (email: string, password: string) => {
    return user
}

export const UserContext = createContext<UserContextType>({
    user,
    registerUser,
    getUserFromDB,
    loginUser
})


const UserProvider = ({ children }: { children: any}) => {

    return (
        <UserContext.Provider value={{ user, registerUser, getUserFromDB, loginUser }}>
            { children }
        </UserContext.Provider>
    )
}

export default UserProvider