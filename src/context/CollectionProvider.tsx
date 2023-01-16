import React, { createContext, useEffect, useState } from 'react'
import { useQuery, UseQueryResult } from 'react-query'
import { StakeCollectionType } from '../@types/collections'
import { UserCollectionType } from '../@types/user'
import useAuth from '../hooks/useAuth'
import useCollection from '../hooks/useCollection'
import { STAKES_COLLECTION } from '../keys'





export type CollectionContextType = {
    UserStakes: UseQueryResult<any, unknown>
    getUserStakes: () => Promise<any>
}


export const CollectionContext = createContext<CollectionContextType | null>(null)


const CollectionProvider = ({ children }: { children: any }) => {
    const UserStakes = useQuery(STAKES_COLLECTION, getUserStakes)

    const { getStoredUser } = useAuth()
    const { filterCollectionByUser } = useCollection()

    const [user, setUser] = useState<UserCollectionType>()


    useEffect(() => {
        getUser()
    }, [])


    async function getUserStakes() {
        const stakes: any = await filterCollectionByUser(STAKES_COLLECTION, user?.id!)
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