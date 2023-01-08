import { IonPage, IonContent, IonLoading, IonToast, IonText, IonInput, IonButton, IonFooter, IonToolbar, IonCard, IonCardContent, IonIcon } from '@ionic/react'
import { warning } from 'ionicons/icons'
import React, { useEffect, useState } from 'react'
import BackHeader from '../../components/BackHeader'
import { register } from '../../serviceWorkerRegistration'
import { useForm, SubmitHandler } from "react-hook-form";
import useAuth from '../../hooks/useAuth'
import useHttp from '../../hooks/useHttp'
import useCollection from '../../hooks/useCollection'
import { WALLET_COLLECTION } from '../../keys'






type WalletInputType = {
    address: string
    network: string
}

type WalletType = {
    address: string;
    collectionId: string;
    collectionName: string;
    created: string;
    expand: {};
    id: string;
    network: string;
    updated: string;
    user: string;
    isNew: boolean;
}

const Wallet = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm<WalletInputType>();
    const [walletFound, setWalletFound] = useState(false)
    const [loading, setLoading] = useState(false)
    const [showAlert, setShowAlert] = useState(false)
    const { pb } = useAuth()
    const { addToCollection, getFilteredCollection } = useCollection()
    const [wallet, setWallet] = useState<WalletType>()




    const getUserWallet = async () => {
        const _wallet: any = await getFilteredCollection(WALLET_COLLECTION, pb.authStore.model?.id!)
        
        if (typeof _wallet !== "undefined" && _wallet.hasOwnProperty('id')) {
            setWalletFound(true)
            setWallet(_wallet)
        } 
        else {
            setWalletFound(false)
        }
        setTimeout(() => {
            setLoading(false)
        }, 3000)
    }

    const handleFormSubmit: SubmitHandler<WalletInputType> = async ({ address, network }) => {
        setLoading(true)
        try {
            const walletDetails = {
                address,
                network,
                user: pb.authStore.model?.id!
            }
            addToCollection(WALLET_COLLECTION, walletDetails)
            getUserWallet()
        }
        catch (err: any) {
            console.error(err.data)
        }
    }

    useEffect(() => {
        getUserWallet()
    }, [])



    return (
        <IonPage>
            <BackHeader title="Accounts" />
            <IonContent fullscreen className='ion-padding'>

                <IonLoading
                    isOpen={loading}
                    // duration={3000}
                    message={"Verifying account details ...."}
                    spinner="circular"
                    onDidDismiss={() => getUserWallet()}
                />
                <IonToast
                    isOpen={showAlert}
                    message="Incorrect account details"
                    color={"danger"}
                    onDidDismiss={() => setShowAlert(false)}
                    duration={3000}
                    position="top"
                />


                <IonText className="ion-padding">Bank Accounts</IonText>

                {
                    !walletFound ? (

                        <section className="account_details ion-padding">
                            <form onSubmit={handleSubmit(handleFormSubmit)}>

                                <div className="input_field">
                                    <div>
                                        <label htmlFor="">
                                            <small>Network</small>
                                        </label>
                                        <IonInput
                                            type="text"
                                            // placeholder="0xas34l3439sds0dsd0032230sdsd0w4"
                                            value={"TRC-20"}
                                            readonly
                                            {...register('network', {
                                                required: {
                                                    value: true,
                                                    message: "network must be filled"
                                                }
                                            })}
                                        />
                                    </div>
                                    {errors.network && <small className="text-danger">{errors.network.message}</small>}
                                </div>


                                <div className="input_field">
                                    <div>
                                        <label htmlFor="">
                                            <small>Wallet Address</small>
                                        </label>
                                        <IonInput
                                            type="text"
                                            placeholder="0xas34l3439sds0dsd0032230sdsd0w43"
                                            {...register('address', {
                                                required: {
                                                    value: true,
                                                    message: "address must be filled"
                                                }
                                            })}
                                        />
                                    </div>
                                    {errors.address && <small className="text-danger">{errors.address.message}</small>}
                                </div>

                                <div className="text-center mt-4">
                                    <IonButton type="submit" shape="round" className="fill">Add Wallet</IonButton>
                                </div>
                            </form>
                        </section>

                    ) : (

                        <section className="account_details ion-padding">
                            <div className="input_field">
                                <label htmlFor="">
                                    <small>Network</small>
                                </label>
                                <IonInput
                                    type="text"
                                    value={wallet?.network}
                                />
                            </div>

                            <div className="input_field">
                                <label htmlFor="">
                                    <small>Wallet Address</small>
                                </label>
                                <IonInput
                                    type="text"
                                    value={wallet?.address}
                                    readonly
                                />
                            </div>

                        </section>

                    )
                }

            </IonContent>

            <IonFooter>
                <IonToolbar>
                    <IonCard color="warning">
                        <IonCardContent>
                            <IonIcon icon={warning} color="warning" slot="start" />
                            <IonText className="ion-margin-start">Wallet details can not be update once added!</IonText>
                        </IonCardContent>
                    </IonCard>
                </IonToolbar>
            </IonFooter>
        </IonPage>
    )
}

export default Wallet