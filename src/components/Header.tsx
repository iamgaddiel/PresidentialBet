import { IonHeader, IonToolbar, IonTitle } from '@ionic/react'
import React from 'react'

import './Header.css'

type HeaderType = {
    title: string
}
const Header: React.FC<HeaderType> = ({ title }) => {
    return (
        <IonHeader className='ion-no-border'>
            <IonToolbar>
                <IonTitle>{title}</IonTitle>
            </IonToolbar>
        </IonHeader>
    )
}

export default Header