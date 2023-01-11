import { IonAlert, IonButton, IonContent, IonIcon, IonInput, IonItem, IonList, IonPage, IonRouterLink } from '@ionic/react'
import { atSharp, lockClosed } from 'ionicons/icons'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router'
import BackHeader from '../../components/BackHeader'
import Loader from '../../components/Loader'
import useAuth from '../../hooks/useAuth'
import { USERS_COLLECTION } from '../../keys'


type InputsType = {
    email: string
}

const ForgotPassword = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<InputsType>();
    const { resetPassword } = useAuth()
    const history = useHistory()

    const [isOpen, setIsOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [email, setEmail] = useState("")


    const handleFormSubmit = async ({ email }: InputsType) => {
        setIsLoading(true)
        resetPassword(USERS_COLLECTION, email)
        setEmail(email)
        setIsOpen(true)
    }

    const handleOnSent = () => {
        history.push("/login")
    }


    return (
        <IonPage>
            <BackHeader title="Forgot Password" />
            <IonContent className='ion-padding'>
                {/* <Loader isOpen={isOpen} message={"Loading....."} fallback={() => setIsOpen(false)} /> */}
                <IonAlert
                    isOpen={isOpen}
                    onDidDismiss={() => setIsOpen(false)}
                    header="Link Sent Successfuly"
                    message={`kindly your email (${email}) for instruction to reset your password`}
                    translucent={true}
                    buttons={
                        [
                            {
                                text: "Okay",
                                role: "confirm",
                                handler: () => handleOnSent()
                            }
                        ]
                    }
                />

                <form onSubmit={handleSubmit(handleFormSubmit)}>
                    <IonList lines="none">

                        {/* email  */}
                        <IonItem class="ion-margin-vertical">
                            <IonIcon icon={atSharp} slot='end' color='light' />
                            <IonInput
                                type="email"
                                {...register('email',
                                    {
                                        required: {
                                            message: "email is required",
                                            value: true
                                        }
                                    }
                                )}
                                placeholder="Email ID"
                            />
                        </IonItem>
                    </IonList>
                    <section className="my-3 text-center">
                        {errors.email && <span className="text-danger">{errors.email.message}</span>} <br />
                    </section>

                    <div className="text-center ion-padding">

                        <IonButton
                            type="submit"
                            className="auth-button ion-margin-top fill"
                            fill="clear"
                            expand="block"
                            size="large"
                            shape="round"
                        >Continue</IonButton>
                    </div>
                </form>
            </IonContent>
        </IonPage>
    )
}

export default ForgotPassword