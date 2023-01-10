import React, { createContext, useState } from 'react'
import useSettings from '../hooks/useSetting';


export type UtilContextValues = {
    showTabs: boolean;
    setShowTabs: React.Dispatch<React.SetStateAction<boolean>>;
    getImageThumbnail: (collectionId: string, recordId: string, filename: string, height: number, width: number) => string;
    getImage: (collectionId: string, recordId: string, filename: string) => string;
}

export const UtilContext = createContext<UtilContextValues | null>(null);



const UtilProvider = ({ children }: any) => {
    const { pbBaseUrl } = useSettings()
    const [showTabs, setShowTabs] = useState<boolean>(false);


    const getImage = (collectionId: string, recordId: string, filename: string) => {
        const image = `${pbBaseUrl}/api/files/${collectionId}/${recordId}/${filename}`
        return image
    }

    const getImageThumbnail = (collectionId: string, recordId: string, filename: string, height: number, width: number) => {
        const image = `${pbBaseUrl}/api/files/${collectionId}/${recordId}/${filename}?thumb=${width}x${height}`
        return image
    }


    return (
        <UtilContext.Provider value={{
            showTabs,
            setShowTabs,
            getImage,
            getImageThumbnail
        }}>
            {children}
        </UtilContext.Provider>
    )
}

export default UtilProvider
