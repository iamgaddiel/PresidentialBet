import { IonButton } from '@ionic/react'
import React, { useEffect, useState } from 'react'
import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js'


type PropType = {
    closeModalFallback: () => void
    // closeLoader: () => (value: React.SetStateAction<boolean>) => void
    closeLoader: React.Dispatch<React.SetStateAction<boolean>>
}

const PaymentForm: React.FC<PropType> = ({ closeModalFallback, closeLoader }) => {
    const [isLoading, setIsLoading] = useState(false)
    const stripe = useStripe()
    const elements = useElements()
    const [infoMessage, setInfoMessage] = useState("")


    const handleSubmit = async (e: any) => {
        e.preventDefault()

        if (!stripe || !elements) return;

        const { error, paymentIntent } = await stripe?.confirmPayment({
            elements,
            confirmParams: {
                return_url: 'http://localhost:8100/dashboard'
            },
            redirect: "if_required"
        })

        if (error) {
            setInfoMessage(error.message!)
        } else if (paymentIntent && paymentIntent.status === "succeeded") {
            closeModalFallback()
            // setInfoMessage(`${paymentIntent.status}`)
        } else {
            // setInfoMessage('Unexpected State')
        }


    }

    // useEffect(() =>{
    //     closeLoader(false)
    // }, [])


    return (
        <form onSubmit={handleSubmit}>
            <PaymentElement />
            <div>
                <div className="text-center mt-3">
                    <span className='text-center text-danger'>{infoMessage}</span>
                </div>
                {
                    !isLoading ? (
                        <IonButton
                            type="submit"
                            className="auth-button ion-margin-top fill"
                            fill="clear"
                            expand="block"
                            size="large"
                            shape="round"
                        >Confirm</IonButton>
                    ) : (
                        <IonButton
                            shape='round'
                            className="auth-button ion-margin-top fill"
                            fill="clear"
                            expand="block"
                            size="large"
                            disabled
                        >
                            <span className="spinner-border spinner-border-sm ion-margin-end" role="status" aria-hidden="true"></span>
                            Processing....
                        </IonButton>
                    )
                }
            </div>
        </form>
    )
}

export default PaymentForm