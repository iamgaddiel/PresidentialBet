import { IonAvatar, IonBadge, IonButton, IonCard, IonContent, IonIcon, IonItem, IonItemDivider, IonLabel, IonList, IonNavLink, IonPage } from '@ionic/react'
import { powerOutline, send } from 'ionicons/icons';
import React, { useContext, useState } from 'react'
import { useHistory } from 'react-router';
import Header from '../components/Header'
import { UtilContext, UtilContextValues } from '../context/utilContext';
import useAuth from '../hooks/useAuth';

import './Profile.css';



const Profile = () => {

    const { authUser } = useAuth()
    const { logoutUser } = useAuth()
    const { setShowTabs } = useContext(UtilContext) as UtilContextValues
    const history = useHistory()

    const logOut = () => {
        logoutUser()
        setShowTabs(false)
        history.push("/login")
    }

    //TODO: implement action verification
    const verifyUserAccount = () => {

    }

    return (
        <IonPage>
            <Header title='Profile' />
            <IonContent class='ion-padding'>

                <section className="profile_banner text-center">
                    <div className=''>
                        <IonAvatar className='w-25 mx-auto bg-light text-dark p-5 d-flex justify-content-center align-items-center'>
                            <h2>{authUser.firstName['0']}</h2>
                        </IonAvatar>
                        <small className='mt-3'>Change profile picture</small>
                        <p className="mt-2">
                            <span>
                                {
                                    authUser.verified ? (
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
                                <h1>{authUser.firstName}</h1>
                            </IonLabel>
                        </IonItem>
                        <IonItem className=''>
                            <IonLabel>
                                <small>Last name</small>
                                <h1>{authUser.lastName}</h1>
                            </IonLabel>
                        </IonItem>
                        <IonItem className=''>
                            <IonLabel>
                                <small>Email</small>
                                <h1>{authUser.email}</h1>
                            </IonLabel>
                        </IonItem>
                        <IonItem className=''>
                            <IonLabel>
                                <small>Gender</small>
                                <h1>{authUser.gender}</h1>
                            </IonLabel>
                        </IonItem>
                        <IonItem className=''>
                            <IonLabel>
                                <small>Phone</small>
                                <h1>{authUser.phone}</h1>
                            </IonLabel>
                        </IonItem>
                        <IonItem className=''>
                            <IonLabel>
                                <small>State</small>
                                <h1>{authUser.state}</h1>
                            </IonLabel>
                        </IonItem>
                    </IonList>
                    <div>
                        {
                            !authUser.verified ? (
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
                    <div>
                        <IonButton
                            fill='clear'
                            mode='ios'
                            color="danger"
                            onClick={() => logOut()}
                        >
                            <IonIcon color='danger' icon={powerOutline} slot='start' />
                            logout
                        </IonButton>
                    </div>
                </section>

            </IonContent>
        </IonPage>
    )
}

export default Profile