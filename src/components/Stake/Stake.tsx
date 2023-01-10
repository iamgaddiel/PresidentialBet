import { IonInput, IonButton } from '@ionic/react'
import { Record } from 'pocketbase'
import React, { useEffect, useState } from 'react'
import { CandidateType, UserCollectionType } from '../../@types/user'
import useCollection from '../../hooks/useCollection'
import { CANDIDATES_COLLECTION, STAKES_COLLECTION, USERS_COLLECTION } from '../../keys'
import '../../screens/Login/Login.css'



type StakeDataType = {
    stake: number
    candidate: string
    payout: number
    user: string
}


type PropType = {
    candidate: CandidateType
    user: UserCollectionType
    closeModalFallback: () => void
}


const Stake: React.FC<PropType> = ({ candidate, user, closeModalFallback }) => {
    const [payout, setPayout] = useState<number>(0)
    const [stake, setStake] = useState(0)
    const { addToCollection, updateCollection, subscribeToCollectionRecord } = useCollection()
    const [loading, setLoading] = useState(false)
    const [showError, setShowError] = useState(false)
    const { pb } = useCollection()
    const [subscribedCandidateDetail, setSubscribedCandidateDetail] = useState<CandidateType>(candidate)


    const handleFormSubmission = async () => {
        if (stake < 100) {
            setShowError(true)
            return
        }

        setLoading(true)
        const data: StakeDataType = {
            payout,
            candidate: candidate?.id!,
            stake,
            user: user?.id!
        }


        // * create stake daa
        addToCollection(STAKES_COLLECTION, data)

        // // * update user properties
        updateCollection(USERS_COLLECTION, user?.id, {
            hasSelected: true,
            selected_candidate: candidate.id
        })

        // * increment candidate vote by 1
        let candidateVotes = subscribedCandidateDetail?.votes!
        console.log("🚀 ~ file: Stake.tsx:63 ~ handleFormSubmission ~ candidateVotes before", candidateVotes)
        candidateVotes = candidateVotes += 1
        console.log("🚀 ~ file: Stake.tsx:63 ~ handleFormSubmission ~ candidateVotes after", candidateVotes)
        const res = await updateCollection(CANDIDATES_COLLECTION, candidate?.id, {
            votes: candidateVotes
        })
        console.log("🚀 ~ file: Stake.tsx:65 ~ handleFormSubmission ~ res", res)

        // closeModalFallback()
    }


    const calculatePayout = (currentStake: number = 100) => {
        currentStake = (!isNaN(currentStake)) ? currentStake : 0
        setStake(currentStake)
        setPayout(currentStake * subscribedCandidateDetail?.odds!)
    }


    return (
        <form className="ion-padding">

            {/* Candidate */}
            <div className="input_field">
                <label htmlFor="">
                    <small>Candidate</small>
                </label>
                <h4>{candidate?.fullname}</h4>
            </div>

            {/* Odd */}
            <div className="input_field">
                <label htmlFor="">
                    <small>Odd</small>
                </label>
                <h4>{candidate?.odds!}</h4>
            </div>

            {/* Payout */}
            <div className="input_field">
                <label htmlFor="">
                    <small>Total Payout</small>
                </label>
                <h4>₦ {payout}</h4>
            </div>

            {/* Net Profit */}
            <div className="input_field">
                <label htmlFor="">
                    <small>Net Payout</small>
                </label>
                <h4>₦ {payout - stake}</h4>
            </div>

            {/* Stake */}
            <div className="input_field">
                <label htmlFor="stake">
                    <small>Stake</small>
                </label>
                <IonInput
                    type='text'
                    inputMode='numeric'
                    placeholder='1000.00'
                    id="stake"
                    min={100}
                    className="m-0 p-0"
                    style={{ fontSize: "22px" }}
                    onIonChange={(e) => calculatePayout(parseInt(e.detail.value!))}
                />
                {
                    showError ? (
                        <span className="text-danger">stake can't be less than ₦100</span>
                    ) : null
                }
            </div>


            <div className="text-center">
                {
                    !loading ? (
                        <IonButton
                            shape='round'
                            className='mt-3 fill'
                            onClick={() => handleFormSubmission()}
                        >
                            Stake
                        </IonButton>

                    ) : (
                        <IonButton
                            shape='round'
                            className='mt-3 fill'
                            disabled
                        >
                            <span className="spinner-border spinner-border-sm ion-margin-end" role="status" aria-hidden="true"></span>
                            Staking...
                        </IonButton>
                    )
                }
            </div>
        </form>
    )
}

export default Stake
