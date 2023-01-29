import { IonInput, IonButton, IonAlert } from '@ionic/react'
import React, { useState } from 'react'
import { CandidateType, UserCollectionType } from '../../@types/user'
import '../../screens/Login/Login.css'
import Loader from '../Loader'
import useSettings from '../../hooks/useSetting'
import { closePaymentModal, useFlutterwave } from 'flutterwave-react-v3'
import useStorage from '../../hooks/useStorage'
import { STAKES_COLLECTION, STAKE_DATA, USERS_COLLECTION, WALLET_BALANCE } from '../../keys'
import { StakeDataType } from '../../@types/collections'
import useAuth from '../../hooks/useAuth'
import useCollection from '../../hooks/useCollection'





type PropType = {
    candidate: CandidateType
    user: UserCollectionType
    closeModalFallback: () => void
    loading?: boolean
    setLoading?: React.Dispatch<React.SetStateAction<boolean>>
}


const Stake: React.FC<PropType> = ({ candidate, user, closeModalFallback }) => {
    const [subscribedCandidateDetail, setSubscribedCandidateDetail] = useState<CandidateType>(candidate)
    const { storeUser, clearStoredUser } = useAuth()
    const { updateCollection } = useCollection()


    const [payout, setPayout] = useState<number>(0)
    const [stake, setStake] = useState(0)
    const [showError, setShowError] = useState(false)
    const { storeItem } = useStorage()
    const [loading, setLoading] = useState(false)
    const [toastMessage, setToastMessage] = useState("")
    const [showToast, setShowToast] = useState(false)




    async function handleFormSubmission() {
        if (stake < 100) {
            setShowError(true)
            return
        }

        setLoading(true)

        const data: StakeDataType = {
            payout: String(payout),
            candidate: candidate?.id!,
            stake,
            user: user?.id!,
            odd: candidate?.odds!
        }

        if (user?.wallet_balance < data?.stake) {
            setLoading(false)
            setToastMessage("Inssuficient wallet balance")
            setShowToast(true)
            return;
        }

        let newWalletBalance = user.wallet_balance - data.stake

        // set stake data and wallet balance to memory
        storeItem(STAKE_DATA, data)
        storeItem(WALLET_BALANCE, { wallet_balance: newWalletBalance })

        // update user's remote wallet balance
        // updateCollection(USERS_COLLECTION, user.id, { wallet_balance: newWalletBalance })

        setLoading(false)
        closeModalFallback()
    }


    // 
    const calculatePayout = (currentStake: number = 100) => {
        currentStake = (!isNaN(currentStake)) ? currentStake : 0
        setStake(currentStake)
        setPayout(currentStake * subscribedCandidateDetail?.odds!)
    }


    return (
        <>
            {
                loading ? (
                    <Loader
                        isOpen={loading}
                        fallback={() => setLoading(false)}
                        message={"Processing...."}
                    />
                ) : null
            }
            <IonAlert
                isOpen={showToast}
                message={toastMessage}
                onDidDismiss={() => {
                    closeModalFallback()
                    setShowToast(false)
                }} />
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
                    <IonButton
                        shape='round'
                        className='mt-3 fill'
                        onClick={() => handleFormSubmission()}
                    >
                        Stake
                    </IonButton>
                </div>
            </form >
        </>

    )
}

export default Stake
