import { IonAlert, IonButton, IonContent, IonIcon, IonImg, IonInput, IonItem, IonList, IonPage, IonRouterLink, IonSelect, IonSelectOption, IonText, IonThumbnail, IonToast } from "@ionic/react"
import { atSharp, eye, eyeOff, home, lockClosed, maleFemale, personSharp, phonePortraitOutline } from "ionicons/icons"
import { useRef, useState } from "react";
import { useHistory } from 'react-router-dom'

import { useForm, SubmitHandler } from 'react-hook-form';
import { RegistrationFormType } from "../../@types/forms";
import useAuth from "../../hooks/useAuth";

import Logo from '../../assets/images/dice_.png'

// Styles
import '../Login/Login.css'
import './Register.css'
import Loader from "../../components/Loader";




const Register = () => {
    const history = useHistory()
    const { createUser } = useAuth()
    const [showPassword, setShowPassword] = useState(false)
    const passwordFiled = useRef<HTMLIonInputElement>(null)
    const [showToast, setShowToast] = useState(false)
    const [toastMessage, setToastMessage] = useState("")
    const [showAlet, setShowAlert] = useState(false)
    const [showLoader, setShowLoader] = useState(false)


    const { handleSubmit, register, formState: { errors } } = useForm<RegistrationFormType>()


    const handleRegistrationComplete = () => {
        history.push('/login')
    }

    const handleTogglePasswordVisibility = (show: boolean) => {
        show ?
            passwordFiled.current!.setAttribute("type", 'password')
            : passwordFiled.current!.setAttribute("type", "text")
        setShowPassword(!showPassword)
    }

    const createErrorAlert = (field: string, error: string) => {
        setToastMessage(`${field}: ${error}`);
        setShowToast(true);
    }


    const handleRegistration: SubmitHandler<RegistrationFormType> = async (data) => {
        setShowLoader(true)

        // handling db validation error
        const res: any = await createUser({ ...data, hasSelected: false })
        if ((res.code !== 200 || 201) && res?.data?.data?.password) {
            setShowLoader(false)
            createErrorAlert("password", res.data.data.password.message);
        }
        if ((res.code !== 200 || 201) && res?.data?.data?.passwordConfirm) {
            setShowLoader(false)
            createErrorAlert("passwordConfirm", res.data.data.passwordConfirm.message);
        }
        if ((res.code !== 200 || 201) && res?.data?.data?.gender) {
            setShowLoader(false)
            createErrorAlert("gender", res.data.data.gender.message);
        }
        if ((res.code !== 200 || 201) && res?.data?.data?.phone) {
            setShowLoader(false)
            createErrorAlert("phone", res.data.data.phone.message);
        }
        if ((res.code !== 200 || 201) && res?.data?.data?.firstName) {
            setShowLoader(false)
            createErrorAlert("firstName", res.data.data.firstName.message);
        }
        if ((res.code !== 200 || 201) && res?.data?.data?.lastName) {
            setShowLoader(false)
            createErrorAlert("lastName", res.data.data.lastName.message);
        }
        if ((res.code !== 200 || 201) && res?.data?.data?.state) {
            setShowLoader(false)
            createErrorAlert("state", res.data.data.state.message);
        }
        if ((res.code !== 200 || 201) && res?.data?.data?.email) {
            setShowLoader(false)
            createErrorAlert("email", res.data.data.email.message);
        }
        if (res.created) {
            setShowLoader(false)
            setShowAlert(true);
        }
    }


    return (
        <IonPage>
            <IonContent fullscreen className='background'>
                <Loader isOpen={showLoader} message={"Loading..."} fallback={() => setShowLoader(false)} />
                <IonAlert
                    isOpen={showAlet}
                    onDidDismiss={() => setShowAlert(false)}
                    header="Sing up Complete"
                    message="kindly login to continue to start making money"
                    translucent={true}
                    buttons={
                        [
                            {
                                text: "Okay",
                                role: "confirm",
                                handler: () => handleRegistrationComplete()
                            }
                        ]
                    }
                />

                <IonToast
                    isOpen={showToast}
                    color="danger"
                    message={toastMessage}
                    position="top"
                    onDidDismiss={() => setShowToast(false)}
                    duration={3000}
                />

                <section className="heading">
                    <section className="d-flex align-items-center">
                        <IonImg src={Logo} alt="dice" className="mx-auto" />
                        <span className="h1">Presidential Game</span>
                    </section>
                </section>

                <section className="auth-section ion-padding">
                    <form onSubmit={handleSubmit(handleRegistration)}>

                        <h2 className="ion-padding">Sign up</h2>

                        <IonList lines="none">

                            {/* Names  */}
                            <IonItem class="ion-margin-vertical">
                                <IonIcon icon={personSharp} slot='end' color="light" />
                                <IonInput type="text" placeholder="First Name" {...register('firstName', { required: true })} />
                            </IonItem>

                            <IonItem class="ion-margin-vertical">
                                <IonIcon icon={personSharp} slot='end' color="light" />
                                <IonInput type="text" placeholder="Last Name" {...register('lastName', { required: true })} />
                            </IonItem>


                            {/* Email */}
                            <IonItem class="ion-margin-vertical">
                                <IonIcon icon={atSharp} slot='end' color="light" />
                                <IonInput type="email" placeholder="Email ID" {...register('email', { required: true })} />
                            </IonItem>


                            {/* State */}
                            <IonItem class="ion-margin-vertical">
                                <IonIcon icon={home} slot='end' color="light" />
                                <IonInput type="text" placeholder="State" {...register('state', { required: true })} />
                            </IonItem>

                            {/* Gender */}
                            <IonItem class="ion-margin-vertical">
                                <IonIcon icon={maleFemale} slot='end' color="light" />
                                <IonSelect {...register('gender', { required: true })} placeholder="Gender">
                                    <IonSelectOption value="male"><span>Male</span></IonSelectOption>
                                    <IonSelectOption value="female">Female</IonSelectOption>
                                </IonSelect>
                            </IonItem>

                            {/* Phone */}
                            <IonItem class="ion-margin-vertical">
                                <IonIcon icon={phonePortraitOutline} slot='end' color="light" />
                                <IonInput type="tel" placeholder="Mobile" {...register('phone', { required: true })} />
                            </IonItem>

                            {/* Password */}
                            <IonItem class="ion-margin-vertical">
                                <IonIcon icon={lockClosed} slot='end' color="light" />
                                <IonInput
                                    type="password" placeholder="Password"
                                    {...register('password', { required: true })}
                                // ref={passwordFiled}
                                />
                                {/* {
                                    showPassword ? (
                                        <IonIcon icon={eye} slot='end' onClick={() => handleTogglePasswordVisibility(false)} color="light"/>
                                    ) : (
                                        <IonIcon icon={eyeOff} slot='end' onClick={() => handleTogglePasswordVisibility(true)} color="light"/>
                                    )
                                } */}
                            </IonItem>


                            {/* Password Confirm */}
                            <IonItem class="ion-margin-vertical">
                                <IonIcon icon={lockClosed} slot='end' color="light" />
                                <IonInput
                                    type="password" placeholder="Confirm Password"
                                    {...register('passwordConfirm', { required: true })}
                                // ref={passwordFiled}
                                />
                                {/* {
                                    showPassword ? (
                                        <IonIcon icon={eye} slot='end' onClick={() => handleTogglePasswordVisibility(false)} color="light"/>
                                    ) : (
                                        <IonIcon icon={eyeOff} slot='end' onClick={() => handleTogglePasswordVisibility(true)} color="light"/>
                                    )
                                } */}
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
                            className="auth-button fill"
                            fill="clear"
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
