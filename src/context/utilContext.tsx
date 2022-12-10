import React, { createContext, useState } from 'react'


export type UtilProviderProps = {
    children: any
}

export type UtilContextValues = {
    showTabs: boolean,
    setShowTabs: React.Dispatch<React.SetStateAction<boolean>>
}

export const UtilContext = createContext<UtilContextValues | null>(null);




const UtilProvider = ({ children }: UtilProviderProps) => {
    const [showTabs, setShowTabs] = useState<boolean>(false);

    return (
        <UtilContext.Provider value={{
            showTabs,
            setShowTabs
        }}>
            {children}
        </UtilContext.Provider>
    )
}

export default UtilProvider
