import { IonCard, IonContent, IonIcon, IonItem, IonLabel, IonList, IonListHeader, IonPage } from '@ionic/react'
import { timeOutline } from 'ionicons/icons'
import { useState } from 'react'
import Header from '../../components/Header'
import NotFound from '../../components/NotFound'

const History = () => {
    const [history, setHistory] = useState([])

    return (
        <IonPage>
            <Header title="History" />
            <IonContent className='ion-padding' fullscreen>
                {
                    history.length > 0 ? (
                        <IonList>
                            <IonListHeader>
                                History
                                <IonIcon icon={timeOutline} color="success" slot="end" />
                            </IonListHeader>

                            <IonItem>
                                <IonCard>
                                    <IonLabel></IonLabel>
                                </IonCard>
                            </IonItem>
                        </IonList>
                    ) : (
                        <NotFound text="You don't have any transactions yet" />
                    )
                }
            </IonContent>
        </IonPage>
    )
}

export default History