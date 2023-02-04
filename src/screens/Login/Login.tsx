import { IonButton, IonContent, IonIcon, IonImg, IonInput, IonItem, IonList, IonPage, IonRouterLink, IonToast } from "@ionic/react"
import { atSharp, flag, lockClosed } from "ionicons/icons"
import { useContext, useEffect, useRef, useState } from "react"

import { useForm, SubmitHandler } from "react-hook-form";
import { useHistory } from "react-router";
import Loader from "../../components/Loader";
import { UtilContext, UtilContextValues } from "../../context/utilContext";
import useAuth from "../../hooks/useAuth";
import Logo from '../../assets/images/dice_.png'



import './Login.css'
import { UserCollectionType } from "../../@types/user";
import Dashboard from "../Dashboard";
import { storage } from "../../atom";
import { USER } from "../../keys";

type InputsType = {
    email: string,
    password: string,
};



function Login() {
    const { authenticateUser, pb, getUserFromDB, storeUser, getStoredUser } = useAuth()

    const [showPassword, setShowPassword] = useState(false)
    const passwordFiled = useRef<HTMLIonInputElement>(null)
    const [showToast, setShowToast] = useState(false)
    const [toastMessage, setToastMessage] = useState("")
    const history = useHistory()
    const { setShowTabs } = useContext(UtilContext) as UtilContextValues
    const [showLoader, setShowLoader] = useState(false)

    const { register, handleSubmit, formState: { errors } } = useForm<InputsType>();



    const handleFormSubmit: SubmitHandler<InputsType> = async (data) => {
        setShowLoader(true)

        try {
            const { email, password } = data;
            const res: any = await authenticateUser(email, password)

            if (res.code === 400 && res.data) {
                setShowLoader(false)
                setToastMessage(`${res.message}`);
                setShowToast(true);
                return;
            }

            if (!pb.authStore.isValid) {
                setShowLoader(false)
                setToastMessage("incorrect login credentials")
                setShowToast(true)
                return;
            }
            const user = await getUserFromDB(pb.authStore.model?.id!) as UserCollectionType
            storeUser(user)

            history.push('/dashboard')
        }
        catch (err: any) {
            throw new Error(err)
        }
    }


    const handleTogglePasswordVisibility = (show: boolean) => {
        show ? passwordFiled.current!.setAttribute("type", 'password') : passwordFiled.current!.setAttribute("type", "text")
        setShowPassword(!showPassword)
    }


    return (
        <IonPage>
            <Loader isOpen={showLoader} message={"Loading...."} fallback={() => setShowLoader(false)} />
            <IonContent fullscreen className='background'>
                <IonToast
                    isOpen={showToast}
                    color="danger"
                    message={toastMessage}
                    position="top"
                    onDidDismiss={() => setShowToast(false)}
                    duration={3000}
                />
                {
                    !showLoader ? (
                        <Loader
                            isOpen={showLoader}
                            message={"Sining in..."}
                            fallback={() => setShowLoader(false)}
                        />
                    ) : null
                }
                <section className="heading">
                    <section className="d-flex align-items-center">
                        <IonImg src={Logo} alt="dice" className="mx-auto" />
                        <span className="h1">Presidential Game</span>
                    </section>
                </section>


                <section
                    className="auth-section ion-padding"
                    style={{ paddingTop: "5rem", paddingBottom: "6.8rem", marginTop: "3rem", height: "fit-content" }}
                >
                    <form onSubmit={handleSubmit(handleFormSubmit)}>
                        <h2 className="ion-padding">Login</h2>
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

                            {/* Pssword */}
                            <IonItem class="ion-margin-vertical">
                                <IonIcon icon={lockClosed} slot='end' color='light' />
                                <IonInput
                                    type="password"
                                    placeholder="Password"
                                    {...register('password',
                                        {
                                            required: {
                                                message: "password is required",
                                                value: true
                                            }
                                        }
                                    )}
                                />
                            </IonItem>
                            <IonItem>
                                <IonRouterLink routerDirection="forward" routerLink="forgot-password" style={{ textAlign: 'center' }} className='forgot-password'>
                                    Forgot Password?
                                </IonRouterLink>
                            </IonItem>
                        </IonList>

                        <section className="my-3 text-center">
                            {errors.email && <span className="text-danger">{errors.email.message}</span>} <br />
                            {errors.password && <span className="text-danger">{errors.password.message}</span>}
                        </section>
                        <IonButton
                            type="submit"
                            className="auth-button ion-margin-top fill"
                            fill="clear"
                            expand="block"
                            size="large"
                            shape="round"
                        >Login</IonButton>

                    </form>


                    <section className="footer">
                        <div className="ion-margin-top">
                            New to Presidential Game?
                            <IonRouterLink routerDirection="forward" routerLink="/register" className='forgot-password ion-padding-horizontal'>
                                Register
                            </IonRouterLink>
                        </div>
                    </section>
                </section>
            </IonContent>
        </IonPage>
    )

}




// function LoginPageContent() {

// }

export default Login