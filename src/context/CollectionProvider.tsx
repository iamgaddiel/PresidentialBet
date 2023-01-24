import React, { createContext, useEffect, useState } from 'react'
import { useQuery, UseQueryResult } from 'react-query'
import { StakeCollectionType } from '../@types/collections'
import { UserCollectionType } from '../@types/user'
import useAuth from '../hooks/useAuth'
import useCollection from '../hooks/useCollection'
import { STAKES_COLLECTION } from '../keys'





export type CollectionContextType = {
    UserStakes: UseQueryResult<any, unknown>
    getUserStakes: (userId: string) => Promise<any>
}


export const CollectionContext = createContext<CollectionContextType | null>(null)

// useQuery(['todos'], fetchAllTodos)

// useQuery(['todos', todoId], () => fetchTodoById(todoId))

// useQuery(['todos', todoId], async () => {

//   const data = await fetchTodoById(todoId)

//   return data

// })

// useQuery(['todos', todoId], ({ queryKey }) => fetchTodoById(queryKey[1]))

const CollectionProvider: React.FC<{ children: any }> = ({ children }) => {

    const { getStoredUser } = useAuth()
    const { filterCollectionByUser } = useCollection()

    const [user, setUser] = useState<UserCollectionType>()

    const UserStakes = useQuery([STAKES_COLLECTION, user?.id!], () => getUserStakes(user?.id!))

    useEffect(() => {
        getUser()
    }, [])


    async function getUserStakes(userId: string) {
        const stakes: any = await filterCollectionByUser(STAKES_COLLECTION, userId)
        return stakes
    }

    async function getUser() {
        const res = await getStoredUser()
        setUser(res)
    }


    return (
        <CollectionContext.Provider value={{ UserStakes, getUserStakes }}>
            {children}
        </CollectionContext.Provider>
    )
}

export default CollectionProvider