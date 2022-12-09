import { IonButton, IonContent, IonIcon, IonInput, IonItem, IonLabel, IonList, IonPage, IonRouterLink, IonSelect, IonSelectOption, IonText, IonToast } from "@ionic/react"
import { atSharp, eye, eyeOff, home, lockClosed, maleFemale, personSharp, phonePortraitOutline, print } from "ionicons/icons"
import { useEffect, useRef, useState } from "react";

import { useForm, SubmitHandler } from 'react-hook-form';
import { RegistrationFormType } from "../@types/forms";
import useAuth from "../hooks/useAuth";
import useDB from "../hooks/useDB";

// Styles
import './Login.css'



const Register = () => {
    const { createUser } = useAuth()

    const [showPassword, setShowPassword] = useState(false)
    const passwordFiled = useRef<HTMLIonInputElement>(null)
    const [showToast, setShowToast] = useState(false)
    const [toastMessage, setToastMessage] = useState("")


    const { handleSubmit, register, formState: { errors } } = useForm<RegistrationFormType>()



    console.log(errors)
    const checkRegistration = () => {
        if (errors.password) setToastMessage(errors.password.message!);
        if (errors.email) setToastMessage(errors.email.message!);
        if (errors.firstName) setToastMessage(errors.firstName.message!);
        if (errors.lastName) setToastMessage(errors.lastName.message!);
        if (errors.phone) setToastMessage(errors.phone.message!);
        setShowToast(true);
    }

    const handleTogglePasswordVisibility = (show: boolean) => {
        show ?
            passwordFiled.current!.setAttribute("type", 'password')
            : passwordFiled.current!.setAttribute("type", "text")
        setShowPassword(!showPassword)
    }

    const alertCreateError = (field: string, error: string ) => {
        // setToastMessage(res.data.data.password.message || res.data.data.passwordConfirm.message);
        setToastMessage(`${field}: ${error}`);
        setShowToast(true);
    }


    const handleRegistration: SubmitHandler<RegistrationFormType> = async (data) => {
        // handling db validation error
        const res: any = await createUser(data)
        if ((res.code !== 200 || 201) && res.data.data.password) alertCreateError("password", res.data.data.password.message);
        if ((res.code !== 200 || 201) && res.data.data.passwordConfirm) alertCreateError("passwordConfirm", res.data.data.passwordConfirm.message);
        if ((res.code !== 200 || 201) && res.data.data.gender) alertCreateError("gender", res.data.data.gender.message);
        if ((res.code !== 200 || 201) && res.data.data.phone) alertCreateError("phone", res.data.data.phone.message);
        if ((res.code !== 200 || 201) && res.data.data.firstName) alertCreateError("firstName", res.data.data.firstName.message);
        if ((res.code !== 200 || 201) && res.data.data.lastName) alertCreateError("lastName", res.data.data.lastName.message);
        if ((res.code !== 200 || 201) && res.data.data.state) alertCreateError("state", res.data.data.state.message);
        if ((res.code !== 200 || 201) && res.data.data.email) alertCreateError("email", res.data.data.email.message);

    }

    useEffect(() => {
        checkRegistration()
    }, [])

    return (
        <IonPage>
            <IonContent fullscreen className='background'>
                <IonToast
                    isOpen={showToast}
                    color="danger"
                    message={toastMessage}
                    position="top"
                    onDidDismiss={() => setShowToast(false)}
                    duration={3000}
                />


                <section className="heading ion-padding">
                    <h1>Create better Together</h1>
                </section>

                <section className="auth-section ion-padding">
                    <form onSubmit={handleSubmit(handleRegistration)}>

                        <h2 className="ion-padding">Sign up</h2>

                        <IonList lines="none">

                            {/* Names  */}
                            <IonItem class="ion-margin-vertical">
                                <IonIcon icon={personSharp} slot='start' />
                                <IonInput type="text" placeholder="First Name" {...register('firstName', { required: true })} />
                            </IonItem>

                            <IonItem class="ion-margin-vertical">
                                <IonIcon icon={personSharp} slot='start' />
                                <IonInput type="text" placeholder="Last Name" {...register('lastName', { required: true })} />
                            </IonItem>


                            {/* Email */}
                            <IonItem class="ion-margin-vertical">
                                <IonIcon icon={atSharp} slot='start' />
                                <IonInput type="email" placeholder="Email ID" {...register('email', { required: true })} />
                            </IonItem>


                            {/* State */}
                            <IonItem class="ion-margin-vertical">
                                <IonIcon icon={home} slot='start' />
                                <IonInput type="text" placeholder="State" {...register('state', { required: true })} />
                            </IonItem>

                            {/* Gender */}
                            <IonItem class="ion-margin-vertical">
                                <IonIcon icon={maleFemale} slot='start' />
                                <IonSelect {...register('gender', { required: true })} placeholder="Gender">
                                    <IonSelectOption value="male">Male</IonSelectOption>
                                    <IonSelectOption value="female">Female</IonSelectOption>
                                </IonSelect>
                            </IonItem>

                            {/* Phone */}
                            <IonItem class="ion-margin-vertical">
                                <IonIcon icon={phonePortraitOutline} slot='start' />
                                <IonInput type="tel" placeholder="Mobile" {...register('phone', { required: true })} />
                            </IonItem>

                            {/* Password */}
                            <IonItem class="ion-margin-vertical">
                                <IonIcon icon={lockClosed} slot='start' />
                                <IonInput
                                    type="password" placeholder="Password"
                                    {...register('password', { required: true })}
                                // ref={passwordFiled}
                                />
                                {
                                    showPassword ? (
                                        <IonIcon icon={eye} slot='end' onClick={() => handleTogglePasswordVisibility(false)} />
                                    ) : (
                                        <IonIcon icon={eyeOff} slot='end' onClick={() => handleTogglePasswordVisibility(true)} />
                                    )
                                }
                            </IonItem>


                            {/* Password Confirm */}
                            <IonItem class="ion-margin-vertical">
                                <IonIcon icon={lockClosed} slot='start' />
                                <IonInput
                                    type="password" placeholder="Confirm Password"
                                    {...register('passwordConfirm', { required: true })}
                                // ref={passwordFiled}
                                />
                                {
                                    showPassword ? (
                                        <IonIcon icon={eye} slot='end' onClick={() => handleTogglePasswordVisibility(false)} />
                                    ) : (
                                        <IonIcon icon={eyeOff} slot='end' onClick={() => handleTogglePasswordVisibility(true)} />
                                    )
                                }
                            </IonItem>


                            {/* Signum Button */}
                            <IonItem>
                                <small className="ion-text-center">
                                    <IonText>
                                        if you continue, you agree to our
                                        <IonRouterLink routerDirection="forward" href="/forgot-password" style={{ textAlign: 'center' }} className='ion-margin-horizontal'>
                                            Terms & Condition
                                        </IonRouterLink>
                                        and
                                        <IonRouterLink routerDirection="forward" href="/forgot-password" style={{ textAlign: 'center' }} className='ion-margin-horizontal'>
                                            Privacy Policy
                                        </IonRouterLink>
                                    </IonText>
                                </small>
                            </IonItem>
                        </IonList>

                        <IonButton
                            type="submit"
                            className="auth-button"
                            fill="solid"
                            expand="block"
                            size="large"
                            shape="round"
                        >Continue</IonButton>

                    </form>

                    <section className="footer">
                        Joined us before ?
                        <IonRouterLink routerDirection="back" routerLink="/login" className='forgot-password ion-padding-horizontal'>
                            Login
                        </IonRouterLink>
                    </section>
                </section>
            </IonContent>
        </IonPage>
    )
}

export default Register
