import React, { createContext, SetStateAction, useState } from 'react'
import useSettings from '../hooks/useSetting';

import Atiku from '../assets/images/Atiku.jpg'
import Obi from '../assets/images/Obi.jpg'
import Tinubu from '../assets/images/Tinubu.jpg'
import Rabiu from '../assets/images/Rabiu.jpg'
import Sowore from '../assets/images/Sowore.jpg'


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
    getCandidateImage: (candidateName: string) => string | undefined
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


    function getCandidateImage(candidateName: string) {
        switch (candidateName) {
            case "Atiku Abubakar":
                return Atiku

            case "Asiwaju Bola Tinubu":
                return Tinubu

            case "Peter Obi":
                return Obi

            case "Rabi'u Musa Kwankwaso":
                return Rabiu

            case "Omoyele Sowore":
                return Sowore
        }
    }


    return (
        <UtilContext.Provider value={{
            showTabs,
            setShowTabs,
            getImage,
            getImageThumbnail,
            paymentData,
            setPaymentData,
            getCandidateImage
        }}>
            {children}
        </UtilContext.Provider>
    )
}

export default UtilProvider
