import { IonButton, IonContent, IonIcon, IonInput, IonPage, IonToast } from '@ionic/react'
import { closePaymentModal, useFlutterwave } from 'flutterwave-react-v3'
import { cardSharp } from 'ionicons/icons'
import { useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import { UserCollectionType } from '../../@types/user'
import BackHeader from '../../components/BackHeader'
import Loader from '../../components/Loader'
import useAuth from '../../hooks/useAuth'
import useCollection from '../../hooks/useCollection'
import useSettings from '../../hooks/useSetting'
import useStorage from '../../hooks/useStorage'
import { USER, USERS_COLLECTION } from '../../keys'

const Topup = () => {
    const [topupAmount, setTopupAmount] = useState(0)
    const [authUser, setAuthUser] = useState<UserCollectionType>()
    const [showToastMessage, setShowToastMessage] = useState(false)
    const [toastMessage, setToastMessage] = useState("")
    const [loading, setLoading] = useState(false)


    const { storeUser } = useAuth()
    const { getStoredUser } = useAuth()
    const { FLUTTERWAVE_PK_KEY } = useSettings()
    const history = useHistory()
    const { updateCollection } = useCollection()



    useEffect(() => {
        getAuthUser()
    }, [])




    const flutterConfig = {
        public_key: FLUTTERWAVE_PK_KEY,
        tx_ref: `pg-${Date.now()}`,
        amount: topupAmount,
        currency: 'NGN',
        payment_options: 'card',
        customer: {
            email: authUser?.email!,
            phone_number: authUser?.phone!,
            name: `${authUser?.firstName!} ${authUser?.lastName!}`,
        },
        customizations: {
            title: 'PresidentialGame Staking Payment',
            description: 'Stake for favorite candidate',

            // TODO link logo server
            logo: 'https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg',
        },
    };

    const handleFlutterPayment = useFlutterwave(flutterConfig);

    async function getAuthUser() {
        const user = await getStoredUser()
        setAuthUser(user)
    }


    // async function updateUserDetail(user: UserCollectionType) {
    //     // update user details locally
    //     let newBalance = user?.wallet_balance + topupAmount
    //     await storeUser({ ...user, wallet_balance: newBalance })

    //     // update user detail remotely
    //     await updateCollection(USERS_COLLECTION, user?.id!, { wallet_balance: newBalance })
    // }


    async function handleTopup(user: UserCollectionType) {

        if (topupAmount < 100) return;

        setLoading(true)

        let newBalance = user?.wallet_balance + topupAmount

        // flutterwave
        handleFlutterPayment({
            callback: (response) => {
                // updateUserDetail(user)
                storeUser({ ...user, wallet_balance: newBalance })
                updateCollection(USERS_COLLECTION, user?.id!, { wallet_balance: newBalance })
                setLoading(false)
                closePaymentModal() // this will close the modal programmatically
                history.push('/dashboard')
            },
            onClose: () => {
                setLoading(false)
            }
        })
    }





    return (
        <IonPage>
            <BackHeader title='Topup' />
            <IonContent className="ion-padding" fullscreen>
                <Loader isOpen={loading} message={"Processing...."} fallback={() => setLoading(false)} />

                <IonToast
                    position='top'
                    color={"danger"}
                    duration={3000}
                    isOpen={showToastMessage}
                    onDidDismiss={() => setShowToastMessage(false)}
                    message={toastMessage}
                />
                < div className="input_field ion-padding">
                    <IonInput
                        type='text'
                        inputMode='numeric'
                        placeholder='Enter topup amount'
                        id="stake"
                        min={100}
                        className="m-0 p-0 border mt-3 rounded border-success"
                        style={{ fontSize: "22px" }}
                        onIonChange={(e) => setTopupAmount(parseInt(e.detail.value!))}
                    />
                </ div>

                <section>
                    <ul className="">
                        <li className="text-muted">topup can't be lower than 100</li>
                        <li className="text-muted">double check topup amount before procceding</li>
                    </ul>
                </section>

                <section className="ion-padding">
                    <IonButton
                        expand='block'
                        className='text-light text-capitalize fill text-dark'
                        size='large'
                        onClick={() => handleTopup(authUser!)}
                    >
                        <IonIcon icon={cardSharp} color={"dark"} slot="end" />
                        Top up
                    </IonButton>
                </section>
            </IonContent>
        </IonPage>
    )
}

export default Topup