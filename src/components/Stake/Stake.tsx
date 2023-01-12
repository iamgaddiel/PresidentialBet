import { IonInput, IonButton } from '@ionic/react'
import { Record } from 'pocketbase'
import React, { useContext, useEffect, useState } from 'react'
import { CandidateType, UserCollectionType } from '../../@types/user'
import useCollection from '../../hooks/useCollection'
import { CANDIDATES_COLLECTION, STAKES_COLLECTION, USERS_COLLECTION } from '../../keys'
import '../../screens/Login/Login.css'
import useHttp from '../../hooks/useHttp'
import useApi from '../../hooks/useApi'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import PaymentForm from '../PaymentForm'
import { PaymentDataType, UtilContext, UtilContextValues } from '../../context/utilContext'



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
    const { getStripePublishableKey, getSecretKey } = useApi()
    const [stripePromise, setStripePromise] = useState<any>()
    const [clientSecret, setClientSecret] = useState("")
    const [showPaymentModal, setShowPaymentModal] = useState(false)
    const { setPaymentData } = useContext(UtilContext) as UtilContextValues




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

        setPaymentData(data)

        // * stripe client key
        const secretKey = await getSecretKey(stake)
        setClientSecret(secretKey)

        // display stripe modal
        setShowPaymentModal(true)

    }


    const calculatePayout = (currentStake: number = 100) => {
        currentStake = (!isNaN(currentStake)) ? currentStake : 0
        setStake(currentStake)
        setPayout(currentStake * subscribedCandidateDetail?.odds!)
    }



    useEffect(() => {
        (async () => {
            const res = await getStripePublishableKey()
            setStripePromise(loadStripe(res))
        })()
    }, [])


    return (
        <>
            {
                showPaymentModal ? (
                    <>
                        {
                            clientSecret && stripePromise ? (
                                <Elements stripe={stripePromise} options={{ clientSecret }}>
                                    <PaymentForm closeModalFallback={() => closeModalFallback()} />
                                </Elements>
                            ) : null
                        }
                    </>

                ) : (

                    <form className="ion-padding">

                        {/* Candidate */}
                        <div className="input_field d-flex justify-content-between align-items-center" >
                            <label htmlFor="">
                                <small>Candidate</small>
                            </label>
                            <h5>{candidate?.fullname}</h5>
                        </div >

                        {/* Odd */}
                        < div className="input_field d-flex justify-content-between align-items-center" >
                            <label htmlFor="">
                                <small>Odd</small>
                            </label>
                            <h5>{candidate?.odds!}</h5>
                        </ div>

                        {/* Payout */}
                        < div className="input_field d-flex justify-content-between align-items-center" >
                            <label htmlFor="">
                                <small>Total Payout</small>
                            </label>
                            <h5>₦ {payout}</h5>
                        </ div>

                        {/* Net Profit */}
                        < div className="input_field d-flex justify-content-between align-items-center" >
                            <label htmlFor="">
                                <small>Net Payout</small>
                            </label>
                            <h5>₦ {payout - stake}</h5>
                        </ div>

                        {/* Stake */}
                        < div className="input_field">
                            {/* <label htmlFor="">
                                <small>Stake</small>
                            </label> */}
                            <IonInput
                                type='text'
                                inputMode='numeric'
                                placeholder='Enter stake'
                                id="stake"
                                min={100}
                                className="m-0 p-0 border mt-3 rounded border-success"
                                style={{ fontSize: "22px" }}
                                onIonChange={(e) => calculatePayout(parseInt(e.detail.value!))}
                            />
                        </ div>
                        {
                            showError ? (
                                <span className="text-danger">stake can't be less than ₦100</span>
                            ) : null
                        }


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
                    </form >
                )
            }
        </>
    )
}

export default Stake
