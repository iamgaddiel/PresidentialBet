import { IonAvatar, IonBadge, IonContent, IonIcon, IonItem, IonLabel, IonList, IonPage } from '@ionic/react'
import { cardSharp, logOut, personSharp, walletSharp } from 'ionicons/icons'
import { useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import { UserCollectionType } from '../../@types/user'
import Header from '../../components/Header'
import useAuth from '../../hooks/useAuth'


const User = () => {
    const { logoutUser, getStoredUser } = useAuth()
    const [user, setUser] = useState<UserCollectionType>()
    const history = useHistory()


    const getUser = async () => {
        setUser(await getStoredUser())
    }

    const deAuthenticateUser = () => {
        logoutUser()
        history.push("/login")
    }

    useEffect(() => {
        getUser()
    }, [])

    return (
        <IonPage>
            <Header title={'User'} />
            <IonContent fullscreen className="ion-padding">

                <section className="profile_banner text-center">
                    <div className=''>
                        <IonAvatar className='w-25 mx-auto bg-light text-dark p-5 d-flex justify-content-center align-items-center'>
                            {
                                user?.id! ? (
                                    <strong className='m-0 h2'>{user?.firstName['0']}{user?.lastName['0']}</strong>
                                ) : null
                            }
                        </IonAvatar>
                        <small className='mt-3' style={{ fontSize: "25px"}}>{user?.firstName} {user?.lastName}</small> <br />
                        <small className='mt-3'>{user?.email}</small>
                        <p className="mt-2">
                            <span>
                                {
                                    user?.verified ? (
                                        <IonBadge color="success">Verified</IonBadge>
                                    ) : (
                                        <IonBadge color="warning">Not Verified</IonBadge>
                                    )
                                }
                            </span>
                        </p>
                    </div>
                </section>

                <section className='' style={{ marginTop: "5rem" }}>
                    <IonList lines='none'>
                        <IonList>
                            <IonItem routerLink={'/profile'} routerDirection="forward">
                                <IonLabel>
                                    <IonIcon color='success' icon={personSharp} slot='start' />
                                    <span className="text-light ion-margin-start">Profile</span>
                                </IonLabel>
                            </IonItem>
                            <IonItem routerLink={'/accounts'} routerDirection="forward">
                                <IonLabel>
                                    <IonIcon color='success' icon={cardSharp} slot='start' />
                                    <span className="text-light ion-margin-start">Accounts</span>
                                </IonLabel>
                            </IonItem>
                            <IonItem routerLink={'/wallet'} routerDirection="forward">
                                <IonLabel>
                                    <IonIcon color='success' icon={walletSharp} slot='start' />
                                    <span className="text-light ion-margin-start">Wallet</span>
                                </IonLabel>
                            </IonItem>
                            <IonItem onClick={() => deAuthenticateUser()}>
                                <IonLabel>
                                    <IonIcon color='danger' icon={logOut} slot='start' />
                                    <span className="text-danger ion-margin-start">logout</span>
                                </IonLabel>
                            </IonItem>
                        </IonList>
                    </IonList>
                </section>
            </IonContent>
        </IonPage>
    )
}

export default User