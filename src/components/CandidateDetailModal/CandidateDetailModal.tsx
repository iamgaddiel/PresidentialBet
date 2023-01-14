import { IonModal, IonContent, IonAvatar, IonImg, IonButton, IonIcon } from '@ionic/react'
import { thumbsUp } from 'ionicons/icons'
import React, { useContext, useEffect, useState } from 'react'
import { CandidateType, UserCollectionType } from '../../@types/user'
import { UtilContext, UtilContextValues } from '../../context/utilContext'
import useCollection from '../../hooks/useCollection'
import { CANDIDATES_COLLECTION, STAKES_COLLECTION, USERS_COLLECTION } from '../../keys'
import Stake from '../Stake'

import "./CandidateDetailModal.css"



type PropType = {
    modalIsOpen: boolean
    candidate: CandidateType
    PlaceholderImage: string
    user: UserCollectionType
    handleSelection: (id: string) => void
    setModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>
    showStakeModal: boolean
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>
    image: string
}

const CandidateDetailModal: React.FC<PropType> = ({
    PlaceholderImage,
    modalIsOpen,
    setModalIsOpen,
    handleSelection,
    candidate,
    user,
    showStakeModal,
    setShowModal,
    image
}) => {

    const { pb, subscribeToCollectionRecord, unSubscribeFromCollection } = useCollection()
    const [subscribedUserData, setSubscribedUserData] = useState<UserCollectionType>(user)
    const { addToCollection, updateCollection } = useCollection()
    const { paymentData } = useContext(UtilContext) as UtilContextValues
    
    
    const closeModel = () => {
        pb.collection(CANDIDATES_COLLECTION).unsubscribe()
        unSubscribeFromCollection(USERS_COLLECTION)
        setModalIsOpen(false)
        setShowModal(false)

        
        console.log("🚀 ~ file: CandidateDetailModal.tsx:42 ~ paymentData", paymentData, typeof paymentData === "undefined" )
        
        if (typeof paymentData !== "undefined" && paymentData?.payout) {

            // * create stake daa
            addToCollection(STAKES_COLLECTION, paymentData)

            // // * update user properties
            updateCollection(USERS_COLLECTION, user?.id, {
                hasSelected: true,
                selected_candidate: candidate.id
            })
        }


    }


    // useEffect(() => {
    //     const userSubRes = subscribeToCollectionRecord(USERS_COLLECTION, user?.id)
    //     setSubscribedUserData(userSubRes as any)
    // }, [])


    return (
        <section className='mt-4'>
            <IonModal
                isOpen={modalIsOpen}
                initialBreakpoint={0.25}
                breakpoints={[0, 0.25, 0.5, 0.75]}
                onDidDismiss={() => closeModel()}>

                <IonContent className="" style={{ position: 'relative' }}>
                    <div className="overlay ion-padding" style={{ backgroundImage: `url(${image})` }}>
                        {
                            !showStakeModal ? (
                                <section className="detail-modal">

                                    <section className="text-center d-flex justify-content-center my-4">
                                        <div className=''>
                                            <IonAvatar className='mx-auto'>
                                                <IonImg src={image} alt={candidate?.fullname} />
                                            </IonAvatar>
                                        </div>
                                    </section>
                                    <div className="text-center my-3">
                                        <span className="mt-5">{candidate?.fullname}</span>
                                    </div>

                                    <p className="text-justify mt-y">{candidate?.description}</p>

                                    <div className='d-flex justify-content-center'>
                                        {
                                            !subscribedUserData?.hasSelected ? (
                                                <IonButton
                                                    className='fill'
                                                    shape='round'
                                                    onClick={() => handleSelection(candidate?.id)}
                                                >
                                                    Select Candidate
                                                    <IonIcon icon={thumbsUp} color='dark' slot='end' />
                                                </IonButton>
                                            ) : null
                                        }
                                    </div>

                                </section>

                            ) : (
                                <Stake
                                    user={user}
                                    candidate={candidate}
                                    closeModalFallback={closeModel}
                                />
                            )
                        }
                    </div>

                </IonContent>
            </IonModal>
        </section>
    )
}

export default CandidateDetailModal