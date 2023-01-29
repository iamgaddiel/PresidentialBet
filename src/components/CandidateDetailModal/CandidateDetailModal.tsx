import { IonModal, IonContent, IonAvatar, IonImg, IonButton, IonIcon } from '@ionic/react'
import { alert, thumbsUp } from 'ionicons/icons'
import React, { useContext, useEffect, useState } from 'react'
import { StakeDataType } from '../../@types/collections'
import { CandidateType, UserCollectionType } from '../../@types/user'
import { UtilContext, UtilContextValues } from '../../context/utilContext'
import useAuth from '../../hooks/useAuth'
import useCollection from '../../hooks/useCollection'
import useSettings from '../../hooks/useSetting'
import useStorage from '../../hooks/useStorage'
import { CANDIDATES_COLLECTION, STAKES_COLLECTION, STAKE_DATA, USERS_COLLECTION, WALLET_BALANCE } from '../../keys'
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
    image: string | undefined
    getUserDetail: () => Promise<void>
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
    image,
    getUserDetail
}) => {

    const { pb, storeUser, getStoredUser, clearStoredUser } = useAuth()
    const { getItem, clearItems } = useStorage()
    const { DEBUG } = useSettings()

    const { addToCollection, updateCollection } = useCollection()



    const closeModel = async () => {
        setModalIsOpen(false)
        setShowModal(false)

        const paymentData = await getItem(STAKE_DATA) as StakeDataType
        const newWalletBalance: number = await getItem(WALLET_BALANCE)

        if (paymentData !== null) {

            //  update user properties
            if (!user.hasSelected) {
                updateCollection(USERS_COLLECTION, user?.id, {
                    hasSelected: true,
                    selected_candidate: candidate.id
                })
                storeUser({
                    ...user,
                    hasSelected: true,
                    selected_candidate: candidate.id
                })
            }
            
            clearStoredUser()
            
            addToCollection(STAKES_COLLECTION, paymentData)


            storeUser({ ...user, wallet_balance: newWalletBalance })
            updateCollection(USERS_COLLECTION, user.id, { wallet_balance: newWalletBalance })

            getUserDetail()

            // reset payment data on memory
            clearItems()
        }

    }




    return (
        <section className='mt-4'>
            <IonModal
                isOpen={modalIsOpen}
                initialBreakpoint={0.25}
                breakpoints={[0, 0.5, 0.75]}
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
                                        <span className="mt-5">{candidate?.fullname} </span>
                                    </div>

                                    <p className="text-justify mt-y">{candidate?.description}</p>

                                    <div className='d-flex justify-content-center'>
                                        {
                                            user?.hasSelected && candidate?.id === user?.selected_candidate ? (
                                                <IonButton
                                                    className='fill'
                                                    shape='round'
                                                    onClick={() => handleSelection(candidate?.id)}
                                                >
                                                    Continue
                                                    <IonIcon icon={thumbsUp} color='dark' slot='end' />
                                                </IonButton>
                                            ) : null
                                        }
                                        {
                                            !user?.hasSelected ? (
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
                                // loading={loading}
                                // setLoading={setLoading}
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