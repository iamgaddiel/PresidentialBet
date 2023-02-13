import { IonAlert, IonAvatar, IonBadge, IonContent, IonIcon, IonItem, IonItemDivider, IonLabel, IonList, IonPage } from '@ionic/react'
import { cardSharp, logOut, personSharp, trash, walletSharp } from 'ionicons/icons'
import { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import { UserCollectionType } from '../../@types/user'
import Header from '../../components/Header'
import useAuth from '../../hooks/useAuth'
import { UtilContext, UtilContextValues } from '../../context/utilContext'
import useCollection from '../../hooks/useCollection'
import { USERS_COLLECTION } from '../../keys'


const User = () => {
    const { logoutUser, getStoredUser, deleteStoredUser } = useAuth()
    const [isOpen, setIsOpen] = useState(false)
    const [user, setUser] = useState<UserCollectionType>()
    const history = useHistory()
    const { setShowTabs } = useContext(UtilContext) as UtilContextValues
    const { deleteRecord } = useCollection()

    const getUser = async () => {
        setUser(await getStoredUser())
    }

    const deAuthenticateUser = () => {
        logoutUser()
        deleteStoredUser()
        setShowTabs(false)
        history.push("/login")
    }

    async function deleteUserAccount() {
        const { isDeleted } = await deleteRecord(USERS_COLLECTION, user?.id!)
        if (isDeleted) deAuthenticateUser();
    }

    useEffect(() => {
        getUser()
    }, [])

    return (
        <IonPage>
            <Header title={'User'} />
            <IonContent fullscreen className="ion-padding">

                <IonAlert
                    isOpen={isOpen}
                    buttons={
                        [
                            {
                                text: 'Confirm',
                                handler: () => deleteUserAccount()
                            },
                            {
                                text: 'Ignore',
                                handler: (param) => setIsOpen(false)
                            }
                        ]
                    }
                    onDidDismiss={() => setIsOpen(false)}
                    header={"WARNING  \u26A0\uFE0F"}
                    // subHeader={"You are about to delete your account!"}
                    message={"Are you sure you want to delete your account?"}
                    translucent
                />

                <section className="profile_banner text-center">
                    <div className=''>
                        <IonAvatar className='w-25 mx-auto bg-light text-dark p-5 d-flex justify-content-center align-items-center'>
                            {
                                user?.id! ? (
                                    <strong className='m-0 h2'>{user?.firstName['0']}{user?.lastName['0']}</strong>
                                ) : null
                            }
                        </IonAvatar>
                        <small className='mt-3' style={{ fontSize: "25px" }}>{user?.firstName} {user?.lastName}</small> <br />
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
                            <IonItemDivider />
                            <IonItem onClick={() => deAuthenticateUser()}>
                                <IonLabel>
                                    <IonIcon color='danger' icon={logOut} slot='start' />
                                    <span className="text-danger ion-margin-start">Logout</span>
                                </IonLabel>
                            </IonItem>
                            <IonItem onClick={() => setIsOpen(true)}>
                                <IonLabel>
                                    <IonIcon color='danger' icon={trash} slot='start' />
                                    <span className="text-danger ion-margin-start">Delete Account</span>
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