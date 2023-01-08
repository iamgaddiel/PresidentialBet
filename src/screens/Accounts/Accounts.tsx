import { IonButton, IonCard, IonCardContent, IonContent, IonFooter, IonIcon, IonInput, IonLoading, IonPage, IonText, IonToast, IonToolbar } from "@ionic/react"
import { warning } from "ionicons/icons"
import { useEffect, useState } from "react"
import BackHeader from "../../components/BackHeader"
import { useForm, SubmitHandler } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import useCollection from "../../hooks/useCollection";
import { ACCOUNTS_COLLECTION } from "../../keys";




type BankAccountInputType = {
    bank: string;
    account_name: string;
    account_number: string;
    bvn: string;
    dob: string;
}


type BankAccountType = {
    id: string
    collectionId: string
    collectionName: string
    created: string
    updated: string
    bank: string
    user: string
    account_name: string
    account_number: string
    bvn: string
    dob: string
}


const Accounts = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<BankAccountInputType>();
    const [accountVerified, setAccountVerified] = useState(false)
    const [loading, setLoading] = useState(false)
    const [showAlert, setShowAlert] = useState(false)
    const [toastMsg, setToastMsg] = useState("")
    const [account, setAccount] = useState<BankAccountType>()
    const { pb, verifyBvn, verifyUserAccount } = useAuth()
    const { getFilteredCollection, addToCollection } = useCollection()


    const removeExcessiveSpaces = (text: string) => text.split(" ").filter(e => e !== "").join(" ").toLowerCase()


    const getUserAccount = () => {
        const _account: any = getFilteredCollection(ACCOUNTS_COLLECTION, pb.authStore.model?.id!)
        if (typeof _account !== "undefined" && _account.hasOwnProperty("id")) {
            setAccount(_account)
            setAccountVerified(true)
        } else {
            setAccountVerified(false)
        }
        setLoading(false)
    }

    const handleFormSubmit: SubmitHandler<BankAccountInputType> = async (data) => {
        setLoading(true)
        const accountDetail = { ...data, user: pb.authStore.model?.id! }

        try {

            // verify bvn
            const bvnRes = await verifyBvn(accountDetail)
            if (!bvnRes.data.status) {
                setToastMsg(bvnRes.data.message)
                setLoading(false)
                setShowAlert(true)
                return;
            }

            // verify account number
            const _acc = await verifyUserAccount(data.account_number)
            if (!_acc.data.status) {
                setToastMsg('Invalid account number')
                setLoading(false)
                setShowAlert(true)
                return;
            }

            // verify account name
            if (removeExcessiveSpaces(_acc.data.data.account_name) !== removeExcessiveSpaces(data.account_name)) {
                setToastMsg('Account name and number mismatch')
                setLoading(false)
                setShowAlert(true)
                return;
            }

            addToCollection(ACCOUNTS_COLLECTION, accountDetail)
            getUserAccount()

        }
        catch (err: any) {
            throw new Error(err)
        }
        setLoading(true)
    }


    useEffect(() => {
        getUserAccount()
    }, [])

    return (
        <IonPage>
            <BackHeader title="Accounts" />
            <IonContent fullscreen className='ion-padding'>
                <IonLoading
                    isOpen={loading}
                    message={"Verifying account details ...."}
                    spinner="circular"
                />
                <IonToast
                    isOpen={showAlert}
                    message={toastMsg}
                    color={"danger"}
                    onDidDismiss={() => setShowAlert(false)}
                    duration={3000}
                    position="top"
                />


                <IonText className="ion-padding">Bank Accounts</IonText>

                {
                    !accountVerified ? (

                        <section className="account_details ion-padding">
                            <form onSubmit={handleSubmit(handleFormSubmit)}>

                                {/* Bank */}
                                <div className="input_field">
                                    <div>
                                        <label htmlFor="">
                                            <small>Bank</small>
                                        </label>
                                        <IonInput
                                            type="text"
                                            placeholder="First Bank"
                                            {...register('bank', {
                                                required: {
                                                    value: true,
                                                    message: "bank must be filled"
                                                }
                                            })}
                                        />
                                    </div>
                                    {errors.bank && <small className="text-danger">{errors.bank.message}</small>}
                                </div>

                                {/* DOB */}
                                <div className="input_field">
                                    <div>
                                        <label htmlFor="">
                                            <small>DOB</small>
                                        </label>
                                        <IonInput
                                            type="date"
                                            placeholder="12/12/2019"
                                            {...register('dob', {
                                                required: {
                                                    value: true,
                                                    message: "date of birth must be filled"
                                                }
                                            })}
                                        />
                                    </div>
                                    {errors.dob && <small className="text-danger">{errors.dob.message}</small>}
                                </div>

                                <div className="input_field">
                                    <div>
                                        <label htmlFor="">
                                            <small>Account Name</small>
                                        </label>
                                        <IonInput
                                            type="text"
                                            placeholder="John Doe"
                                            {...register('account_name', {
                                                required: {
                                                    value: true,
                                                    message: "account name  must be filled"
                                                }
                                            })}
                                        />
                                    </div>
                                    {errors.account_name && <small className="text-danger">{errors.account_name.message}</small>}
                                </div>

                                <div className="input_field">
                                    <div>
                                        <label htmlFor="">
                                            <small>Account Number</small>
                                        </label>
                                        <IonInput
                                            type="text"
                                            placeholder="0123456789"
                                            inputMode="numeric"
                                            {...register('account_number', {
                                                required: {
                                                    value: true,
                                                    message: "account number  must be filled"
                                                }
                                            })}
                                        />
                                    </div>
                                    {errors.account_number && <small className="text-danger">{errors.account_number.message}</small>}
                                </div>

                                <div className="input_field">
                                    <div>
                                        <label htmlFor="">
                                            <small>BVN</small>
                                        </label>
                                        <IonInput
                                            type="text"
                                            inputMode="numeric"
                                            placeholder="129992199121"
                                            {...register('bvn', {
                                                required: {
                                                    value: true,
                                                    message: "bvn  must be filled"
                                                }
                                            })}
                                        />
                                    </div>
                                    {errors.bvn && <small className="text-danger">{errors.bvn.message}</small>}
                                </div>

                                <div className="text-center mt-4">
                                    <IonButton type="submit" shape="round" className="fill">Verify</IonButton>
                                </div>
                            </form>
                        </section>

                    ) : (

                        <section className="account_details ion-padding">
                            <div className="input_field">
                                <label htmlFor="">
                                    <small>Bank</small>
                                </label>
                                <IonInput
                                    type="text"
                                    value={account?.bank}
                                    readonly
                                />
                            </div>

                            <div className="input_field">
                                <label htmlFor="">
                                    <small>DOB</small>
                                </label>
                                <IonInput
                                    type="date"
                                    value={account?.dob}
                                    readonly
                                />
                            </div>

                            <div className="input_field">
                                <label htmlFor="">
                                    <small>Account Name</small>
                                </label>
                                <IonInput
                                    type="text"
                                    value={account?.account_name}
                                    readonly
                                />
                            </div>

                            <div className="input_field">
                                <label htmlFor="">
                                    <small>Account Number</small>
                                </label>
                                <IonInput
                                    type="text"
                                    value={account?.account_number}
                                    readonly
                                />
                            </div>

                            <div className="input_field">
                                <label htmlFor="">
                                    <small>BVN</small>
                                </label>
                                <IonInput
                                    type="text"
                                    value={account?.bvn}
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
                            <IonText className="ion-margin-start">Bank details can not be update once verified!</IonText>
                        </IonCardContent>
                    </IonCard>
                </IonToolbar>
            </IonFooter>
        </IonPage>
    )
}

export default Accounts