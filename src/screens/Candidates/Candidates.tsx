import { IonAvatar, IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonIcon, IonImg, IonLabel, IonPage } from '@ionic/react'
import { useContext, useEffect, useState } from 'react'
import Header from '../../components/Header'

import useCollection from '../../hooks/useCollection';
import { CANDIDATES } from '../../collections';

import './Candidates.css';
import { UtilContext, UtilContextValues } from '../../context/utilContext';
import { arrowForwardOutline } from 'ionicons/icons';


type CollectionType = {
    collectionId: string
    collectionName: string
    created: string
    description: string
    expand: {}
    party: string
    partyLogo: string
    party_initials: string
    updated: string
    image: string
    fullname: string
    id: string;
}

const Candidates = () => {
    const [candidates, setCandidates] = useState<CollectionType[]>([])
    const { getCollectionList } = useCollection()
    const { getImage, getImageThumbnail } = useContext(UtilContext) as UtilContextValues

    const getAllCandidates = async () => {
        const res: any = await getCollectionList(CANDIDATES)
        setCandidates(res)
    }


    useEffect(() => {
        getAllCandidates()
    }, [])


    return (
        <IonPage>
            <Header title='Candidates' />
            <IonContent className='ion-padding' fullscreen>
                {
                    candidates && candidates.map && candidates.map(({
                        collectionId,
                        description,
                        partyLogo,
                        party_initials,
                        image,
                        fullname,
                        id,

                    }, indx) => (
                        <IonCard
                            key={indx}
                            routerDirection="forward"
                            routerLink={`/candidate/${id}`}
                            className="mb-5"
                        >
                            {/* <IonImg src={item.image} /> */}
                            <IonImg src={getImage(collectionId, id, image)} />

                            <IonCardHeader>
                                <IonCardSubtitle>
                                    <IonLabel>{party_initials}</IonLabel>
                                </IonCardSubtitle>
                                <IonCardTitle className='d-flex align-items-center justify-content-between'>
                                    {fullname}
                                    <IonAvatar>
                                        <IonImg
                                            src={getImageThumbnail(collectionId, id, partyLogo, 2, 2)}
                                        />
                                    </IonAvatar>
                                </IonCardTitle>
                            </IonCardHeader>

                            <IonCardContent className='card_content'>
                                <p>{description}</p>
                                <div className='d-flex justify-content-center mt-4'>
                                    <IonButton
                                        shape='round'
                                        className='fill'
                                    >
                                        <IonIcon icon={arrowForwardOutline} color='dark' slot='end' />
                                    </IonButton>
                                </div>
                            </IonCardContent>

                        </IonCard>
                    ))
                }
            </IonContent>
        </IonPage>
    )
}

export default Candidates