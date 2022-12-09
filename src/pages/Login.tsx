import { IonBackButton, IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonInput, IonItem, IonList, IonListHeader, IonPage, IonRouterLink, IonText, IonToast, IonToolbar } from "@ionic/react"
import { atCircle, atSharp, eye, eyeOff, lockClosed, logoGoogle } from "ionicons/icons"
import { useRef, useState } from "react"

import { useForm, SubmitHandler } from "react-hook-form";



import './Login.css'

type InputsType = {
    email: string,
    password: string,
};


const Login = () => {
    const [showPassword, setShowPassword] = useState(false)
    const passwordFiled = useRef<HTMLIonInputElement>(null)
    const [showToast, setShowToast] = useState(false)
    const [toastMessage, setToastMessage] = useState("")

    const { register, handleSubmit, watch, formState: { errors } } = useForm<InputsType>();


    const handleFormSubmit: SubmitHandler<InputsType> = data => {
        if (errors.email) setToastMessage("Email is required");
        if (errors.password) setToastMessage("Password is required");
        setShowToast(true);

        console.log()
    }


    const handleTogglePasswordVisibility = (show: boolean) => {
        show ? passwordFiled.current!.setAttribute("type", 'password') : passwordFiled.current!.setAttribute("type", "text")
        console.log(show, passwordFiled)
        setShowPassword(!showPassword)
    }

    return (
        <IonPage>
            <IonContent fullscreen className='background'>
                <IonToast
                    isOpen={showToast}
                    color="danger"
                    message={toastMessage}
                    position="bottom"
                    onDidDismiss={() => setShowToast(false)}
                />

                <section className="heading ion-padding">
                    <h1>Welcome, Let's join others</h1>
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
                                <IonIcon icon={atSharp} slot='start' />
                                <IonInput type="email" {...register('email', { required: true })} placeholder="Email ID" />
                            </IonItem>

                            {/* Pssword */}
                            <IonItem class="ion-margin-vertical">
                                <IonIcon icon={lockClosed} slot='start' />
                                <IonInput type="password" placeholder="Password" {...register('password', { required: true })} ref={passwordFiled} />

                                {
                                    showPassword ? (
                                        <IonIcon icon={eye} slot='end' onClick={() => handleTogglePasswordVisibility(false)} />
                                    ) : (
                                        <IonIcon icon={eyeOff} slot='end' onClick={() => handleTogglePasswordVisibility(true)} />
                                    )
                                }
                            </IonItem>
                            <IonItem>
                                <IonRouterLink routerDirection="forward" href="/forgot-password" style={{ textAlign: 'center' }} className='forgot-password'>
                                    Forgot Password?
                                </IonRouterLink>
                            </IonItem>
                        </IonList>

                        <IonButton
                            type="submit"
                            className="auth-button ion-margin-top"
                            fill="clear"
                            expand="block"
                            size="large"
                            shape="round"
                        >Login</IonButton>
                    </form>


                    <section className="footer">
                        <div className="ion-margin-top">
                            New to NVote?
                            <IonRouterLink routerDirection="forward" routerLink="/register" className='forgot-password ion-padding-horizontal'>
                                Rgister
                            </IonRouterLink>
                        </div>
                    </section>
                </section>
            </IonContent>
        </IonPage>
    )
}

export default Login


// import { useForm, SubmitHandler } from "react-hook-form";

// type Inputs = {
//   example: string,
//   exampleRequired: string,
// };

// export default function App() {
//   const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>();
//   const onSubmit: SubmitHandler<Inputs> = data => console.log(data);

//   console.log(watch("example")) // watch input value by passing the name of it

//   return (
//     /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
//     <form onSubmit={handleSubmit(onSubmit)}>
//       {/* register your input into the hook by invoking the "register" function */}
//       <input defaultValue="test" {...register("example")} />

//       {/* include validation with required or other standard HTML validation rules */}
//       <input {...register("exampleRequired", { required: true })} />
//       {/* errors will return when field validation fails  */}
//       {errors.exampleRequired && <span>This field is required</span>}

//       <input type="submit" />
//     </form>
//   );
// }