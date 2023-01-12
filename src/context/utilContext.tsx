import React, { createContext, SetStateAction, useState } from 'react'
import useSettings from '../hooks/useSetting';


export type PaymentDataType = {
    payout: number
    candidate: string
    stake: number
    user: string
}

export type UtilContextValues = {
    showTabs: boolean;
    setShowTabs: React.Dispatch<React.SetStateAction<boolean>>;
    getImageThumbnail: (collectionId: string, recordId: string, filename: string, height: number, width: number) => string;
    getImage: (collectionId: string, recordId: string, filename: string) => string;
    paymentData: PaymentDataType | undefined
    setPaymentData: React.Dispatch<SetStateAction<PaymentDataType | undefined>>
}

export const UtilContext = createContext<UtilContextValues | null>(null);


// 74550 -> NonDeltan
// 66350 -> Deltan


const UtilProvider = ({ children }: any) => {
    const { pbBaseUrl } = useSettings()
    const [showTabs, setShowTabs] = useState<boolean>(false);
    const [paymentData, setPaymentData] = useState<PaymentDataType>()


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
            getImageThumbnail,
            paymentData,
            setPaymentData
        }}>
            {children}
        </UtilContext.Provider>
    )
}

export default UtilProvider
