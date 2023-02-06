import { IonButton, IonCard, IonCardContent, IonContent, IonFooter, IonIcon, IonInput, IonLoading, IonPage, IonPopover, IonText, IonToast, IonToolbar } from "@ionic/react"
import { warning, notifications } from "ionicons/icons"
import { useEffect, useState } from "react"
import BackHeader from "../../components/BackHeader"
import { useForm, SubmitHandler } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import useCollection from "../../hooks/useCollection";
import { ACCOUNTS_COLLECTION } from "../../keys";
import { UserCollectionType } from "../../@types/user";




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
    const [accountFound, setAccountFound] = useState(false)
    const [loading, setLoading] = useState(false)
    const [toastMsg, setToastMsg] = useState("")
    const [showToast, setShowToast] = useState(false)
    const [account, setAccount] = useState<BankAccountType>()
    const { getStoredUser } = useAuth()
    const { getFilteredCollection, addToCollection } = useCollection()
    const [user, setUser] = useState<UserCollectionType | null>(null)




    useEffect(() => {
        getUser()
    }, [])



    async function getUser() {
        const user: UserCollectionType = await getStoredUser()
        getUserAccount(user?.id)
        setUser(user)
    }


    async function getUserAccount(userId: string) {
        const _account: any = await getFilteredCollection(ACCOUNTS_COLLECTION, userId)
        if (typeof _account !== "undefined" && _account.hasOwnProperty("id")) {
            setAccount(_account)
            setAccountFound(true)
        } 
        else {
            setAccountFound(false)
        }
        setLoading(false)
    }

    const handleFormSubmit: SubmitHandler<BankAccountInputType> = async (data) => {
        setLoading(true)
        const accountDetail = { ...data, user: user?.id }

        try {
            addToCollection(ACCOUNTS_COLLECTION, accountDetail)
            getUser()
            getUserAccount(user?.id!)
            setLoading(false)
        }
        catch (err: any) {
            if (err.data) {
                setLoading(false)
                if (err.data.data.bank) {
                    let msg = `${"Bank"}: ${err.data.data.bank.message}`
                    setToastMsg(msg)
                    setShowToast(true)
                    return;
                }
                if (err.data.data.account_name) {
                    let msg = `${"Account Name"}: ${err.data.data.account_name.message}`
                    setToastMsg(msg)
                    setShowToast(true)
                    return;
                }
                if (err.data.data.account_number) {
                    let msg = `${"Account Number"}: ${err.data.data.account_number.message}`
                    setToastMsg(msg)
                    setShowToast(true)
                    return;
                }
                if (err.data.data.dob) {
                    let msg = `${"DOB"}: ${err.data.data.dob.message}`
                    setToastMsg(msg)
                    setShowToast(true)
                    return;
                }
                if (err.data.data.bvn) {
                    let msg = `${"Bvn"}: ${err.data.data.bvn.message}`
                    setToastMsg(msg)
                    setShowToast(true)
                    return;
                }
            }
            throw new Error(err)
        }
    }



    return (
        <IonPage>
            <BackHeader title="Accounts" />
            <IonContent fullscreen className='ion-padding'>
                <IonLoading
                    isOpen={loading}
                    message={"Saving account details ...."}
                    spinner="circular"
                />
                <IonToast
                    isOpen={showToast}
                    message={toastMsg}
                    color={"danger"}
                    onDidDismiss={() => setShowToast(false)}
                    duration={3000}
                    position="top"
                />


                <IonText className="ion-padding">Bank Accounts Details</IonText>

                {
                    !accountFound ? (

                        <section className="account_details ion-padding">
                            <form onSubmit={handleSubmit(handleFormSubmit)}>

                                {/* Bank */}
                                <div className="input_field">
                                    <div>
                                        <label htmlFor="">
                                            <small className='text-green'>Bank</small>
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
                                        <label htmlFor="" className='text-green'>
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
                                    <IonButton type="submit" shape="round" expand="block" className="fill">Add</IonButton>
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
                            <IonText className="ion-margin-start">Bank details can not be update once added. </IonText>
                            <IonText>The specified account will be used for payment.</IonText>
                            {/* <IonPopover trigger="click-trigger" triggerAction="click">
                                <IonContent class="ion-padding"></IonContent>
                            </IonPopover> */}
                        </IonCardContent>
                    </IonCard>
                </IonToolbar>
            </IonFooter>
        </IonPage>
    )
}

export default Accounts