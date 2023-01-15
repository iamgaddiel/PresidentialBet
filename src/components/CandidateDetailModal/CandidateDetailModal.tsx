import { IonModal, IonContent, IonAvatar, IonImg, IonButton, IonIcon } from '@ionic/react'
import { thumbsUp } from 'ionicons/icons'
import React, { useContext, useEffect, useState } from 'react'
import { CandidateType, UserCollectionType } from '../../@types/user'
import useAuth from '../../hooks/useAuth'
import useCollection from '../../hooks/useCollection'
import useSettings from '../../hooks/useSetting'
import useStorage from '../../hooks/useStorage'
import { CANDIDATES_COLLECTION, STAKES_COLLECTION, STAKE_DATA, USERS_COLLECTION } from '../../keys'
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
    getStoredUser: () => Promise<any>
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
}) => {

    const { pb, storeUser, getStoredUser } = useAuth()
    const { getItem, clearItems } = useStorage()
    const { DEBUG } = useSettings()

    const { addToCollection, updateCollection } = useCollection()
    const [_user, setUser] = useState<UserCollectionType>(user)



    useEffect(() => {
        getCurrentUserDetail()
    }, [])



    async function getCurrentUserDetail() {
        const res = await getStoredUser()
        console.log("🚀 ~ file: CandidateDetailModal.tsx:59 ~ getCurrentUserDetail ~ res", res)
        setUser(res)
    }

    const closeModel = async () => {
        pb.collection(CANDIDATES_COLLECTION).unsubscribe()
        setModalIsOpen(false)
        setShowModal(false)

        const paymentData = await getItem(STAKE_DATA)

        if (paymentData !== null) {
            if (DEBUG) console.log("🚀 ~ file: CandidateDetailModal.tsx:65 ~ closeModel ~ paymentData - After", paymentData);

            //  create stake daa
            addToCollection(STAKES_COLLECTION, paymentData)

            //  update user properties
            const updatedUserDeatail = await updateCollection(USERS_COLLECTION, user?.id, {
                hasSelected: true,
                selected_candidate: candidate.id
            }) as UserCollectionType
            storeUser(updatedUserDeatail)
            setUser(updatedUserDeatail)
        }

        // reset payment data
        clearItems()
    }




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
                                        <span className="mt-5">{candidate?.fullname} </span>
                                    </div>

                                    <p className="text-justify mt-y">{candidate?.description}</p>

                                    <div className='d-flex justify-content-center'>
                                        {
                                            _user?.hasSelected && candidate?.id === _user?.selected_candidate ? (
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
                                            !_user?.hasSelected ? (
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
                                    user={_user}
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