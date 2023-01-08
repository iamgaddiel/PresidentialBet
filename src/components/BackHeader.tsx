import { IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle } from '@ionic/react'
import React from 'react'


type PropType = {
    title: string
}
const BackHeader: React.FC<PropType> = ({ title }) => {
    return (
        <IonHeader className='ion-no-border'>
            <IonToolbar>
                <IonButtons slot="start">
                    <IonBackButton />
                </IonButtons>
                <IonTitle>{title}</IonTitle>
            </IonToolbar>
        </IonHeader>
    )
}

export default BackHeader