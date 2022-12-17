import { IonCard, IonCardContent, IonCardSubtitle, IonCardTitle, IonContent, IonImg, IonPage } from '@ionic/react'
import React, { useEffect, useState } from 'react'
import Header from '../components/Header'


import ApcLogo from '../assets/images/apc.png';
import useDB from '../hooks/useDB';
import { CANDIDATES } from '../collections';

const Candidates = () => {
    const [candidates, setCandidates] = useState<[]>()
    const { getCollectionList, pb } = useDB()



    useEffect(() => {
        const getAllCandidates = async () => {
            const x = await pb.collection('candidates').getFullList(200, {
                sort: '-created',
            });

            // const res = await getCollectionList(CANDIDATES)
            console.log("🚀 ~ file: Candidates.tsx:17 ~ getAllCandidates ~ z", x)
            // setCandidates(res)
        }
        getAllCandidates()
    }, [])


    return (
        <IonPage>
            <Header title='Candidates' />
            <IonContent className='ion-padding' fullscreen>
                {
                    candidates?.map((item, indx) => (
                        <IonCard>
                            <IonImg src={ApcLogo} />
                            <IonCardContent>
                                <IonCardTitle></IonCardTitle>
                                <IonCardSubtitle></IonCardSubtitle>
                            </IonCardContent>
                        </IonCard>
                    ))
                }
            </IonContent>
        </IonPage>
    )
}

export default Candidates