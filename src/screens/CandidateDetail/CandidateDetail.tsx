import { IonAlert, IonAvatar, IonBackButton, IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonHeader, IonIcon, IonImg, IonLabel, IonPage, IonTitle, IonToolbar, useIonAlert } from '@ionic/react'
import { image, arrowForwardOutline, thumbsUp, handLeft } from 'ionicons/icons'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { CANDIDATES } from '../../collections'
import Header from '../../components/Header'
import { UtilContext, UtilContextValues } from '../../context/utilContext'
import useCollection from '../../hooks/useCollection'



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

const CandidateDetail = () => {
    const { id }: { id: string } = useParams()
    const { getImage, getImageThumbnail, setShowTabs } = useContext(UtilContext) as UtilContextValues
    const { getSingleCollection } = useCollection()
    const [showAlert] = useIonAlert()


    const [candidate, setCandidate] = useState<CollectionType>({
        collectionId: "",
        collectionName: "",
        created: "",
        description: "",
        expand: {},
        party: "",
        partyLogo: "",
        party_initials: "",
        updated: "",
        image: "",
        fullname: "",
        id: "",
    })


    const getCandidateDetail = async () => {
        const res: any = await getSingleCollection(CANDIDATES, id)
        setCandidate(res)
    }


    useEffect(() => {
        getCandidateDetail()
        setShowTabs(true)
    }, [])


    return (
        <IonPage>
            <IonHeader  className='ion-no-border'>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton />
                    </IonButtons>
                    <IonTitle>{candidate.fullname}</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent className='ion-padding'>
                <IonImg src={getImage(candidate.collectionId, candidate.id, `${candidate.image}?thumb=0x100b`)} />
                <section className='d-flex align-items-center justify-content-between row-reverse my-4'>
                    <IonLabel>
                        ({candidate.party_initials}) {candidate.party}
                        <h1 className="h1 fw-bold">{candidate.fullname}</h1>
                    </IonLabel>
                    <IonAvatar>
                        <IonImg
                            src={getImageThumbnail(CANDIDATES, candidate.id, candidate.partyLogo, 2, 2)}
                        />
                    </IonAvatar>
                </section>
                <section className='mt-3'>
                    <p>{candidate.description}</p>
                    <div className='d-flex justify-content-center my-4'>
                        {/* TODO: hide if use selects a candidate */}
                        <IonButton
                            color='success'
                            shape='round'
                            onClick={() => {
                                showAlert({
                                    header: 'Nice Choice!',
                                    subHeader: 'How far are you willing to go?',
                                    inputs: [
                                        {
                                            type: "number",
                                            label: "Stack Amount",
                                            placeholder: "₦10,000",
                                            min: "100",
                                            max: "100000"

                                        }
                                    ],
                                    buttons: [
                                        {
                                            text: "No",
                                            cssClass: "alert-button-cancel"
                                        },
                                        {
                                            text: "Confirm",
                                            cssClass: "alert-button-confirm",
                                        },
                                    ],
                                })
                            }}
                        >
                            Select Candidate
                            <IonIcon icon={thumbsUp} color='dark' slot='end' />
                        </IonButton>
                    </div>
                </section>
            </IonContent>
        </IonPage>
    )
}

export default CandidateDetail