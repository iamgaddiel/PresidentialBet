import { IonAvatar, IonBadge, IonButton, IonContent, IonIcon, IonItem, IonLabel, IonList, IonPage } from '@ionic/react'
import { send } from 'ionicons/icons';
import { useEffect, useState } from 'react';
import { UserCollectionType } from '../../@types/user';
import BackHeader from '../../components/BackHeader';
import useAuth from '../../hooks/useAuth';

import './Profile.css';



const Profile = () => {

    const { getStoredUser } = useAuth()
    const [user, setUser] = useState<UserCollectionType>()


    //TODO: implement action verification
    const verifyUserAccount = () => {

    }

    const getUserDetails = async () => {
        const res = await getStoredUser()
        setUser(res)
    }


    useEffect(() => {
        getUserDetails()
    }, [])


    return (
        <IonPage>
            <BackHeader title='Profile' />
            <IonContent class='ion-padding'>

                <section className="profile_banner text-center mb-5">
                    <div className=''>
                        <IonAvatar className='w-25 mx-auto bg-light text-dark p-5 d-flex justify-content-center align-items-center'>
                            <h2>{user?.firstName['0']}</h2>
                        </IonAvatar>
                        <small className='mt-3'>Change profile picture</small>
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

                <section className='mt-5'>
                    <IonList>
                        <IonItem className=''>
                            <IonLabel>
                                <small>First name</small>
                                <h3>{user?.firstName}</h3>
                            </IonLabel>
                        </IonItem>
                        <IonItem className=''>
                            <IonLabel>
                                <small>Last name</small>
                                <h3>{user?.lastName}</h3>
                            </IonLabel>
                        </IonItem>
                        <IonItem className=''>
                            <IonLabel>
                                <small>Email</small>
                                <h3>{user?.email!}</h3>
                            </IonLabel>
                        </IonItem>
                        <IonItem className=''>
                            <IonLabel>
                                <small>Gender</small>
                                <h3>{user?.gender!}</h3>
                            </IonLabel>
                        </IonItem>
                        <IonItem className=''>
                            <IonLabel>
                                <small>Phone</small>
                                <h3>{user?.phone!}</h3>
                            </IonLabel>
                        </IonItem>
                        <IonItem className=''>
                            <IonLabel>
                                <small>State</small>
                                <h3>{user?.state!}</h3>
                            </IonLabel>
                        </IonItem>
                    </IonList>
                    <div>
                        {
                            !user?.verified ? (
                                <IonButton
                                    fill='clear'
                                    mode='ios'
                                    color="tertiary"
                                    onClick={() => verifyUserAccount()}
                                >
                                    <IonIcon color='tertiary' icon={send} slot='start' />
                                    verify
                                </IonButton>
                            ) : null
                        }
                    </div>
                </section>

            </IonContent>
        </IonPage>
    )
}

export default Profile