import React, { useState } from 'react'
import useSettings from '../../hooks/useSetting'
import { useFlutterwave, closePaymentModal } from 'flutterwave-react-v3';
import { IonButton } from '@ionic/react';
import useAuth from '../../hooks/useAuth';
// import { uuid } from 'uuidv4';

const FlutterwavePayment = () => {
    const { FLUTTERWAVE_PK_KEY } = useSettings()
    const [amount, setAmount] = useState(0)
    const { authUser } = useAuth()

    const flutterConfig = {
        public_key: FLUTTERWAVE_PK_KEY,
        tx_ref: `${Date.now()}`,
        amount,
        currency: 'NGN',
        payment_options: 'card,ussd',
        customer: {
            email: authUser?.email!,
            phone_number: authUser?.phone!,
            name: `${authUser?.firstName} ${authUser?.lastName}`,
        },
        customizations: {
            title: 'PresidentialGame Staking Payment',
            description: 'Payment for items in cart',
            logo: 'https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg',
        },
    };


    const handleFlutterPayment = useFlutterwave(flutterConfig);

    return (
        <section>

            <IonButton
                type="submit"
                className="auth-button ion-margin-top fill"
                fill="clear"
                expand="block"
                size="large"
                shape="round"
            >Confirm</IonButton>
        </section>
    )
}

export default FlutterwavePayment