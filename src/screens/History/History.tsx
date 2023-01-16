import { IonCard, IonCardContent, IonCardHeader, IonContent, IonIcon, IonItem, IonList, IonListHeader, IonPage, IonSkeletonText, IonText } from '@ionic/react'
import { dice, timeOutline } from 'ionicons/icons'
import { useContext } from 'react'
import { StakeCollectionType } from '../../@types/collections'
import Header from '../../components/Header'
import NotFound from '../../components/NotFound'
import { CollectionContext, CollectionContextType } from '../../context/CollectionProvider'

import "./History.css"

const History = () => {
    const { UserStakes } = useContext(CollectionContext) as CollectionContextType

    return (
        <IonPage>
            <Header title="History" />
            <IonContent className='ion-padding' fullscreen>
                {
                    !UserStakes.isLoading ? (
                        <>
                            {
                                UserStakes.data?.length < 1 ? (
                                    <NotFound text="You don't have any transactions yet" />
                                ) : (
                                    <>
                                        <IonList lines='none'>
                                            <IonListHeader>
                                                <div className="d-flex justify-content-between aligns-item-center">
                                                    <IonText>Total Stake</IonText>
                                                    <IonIcon icon={timeOutline} color="success" />
                                                </div> 
                                            </IonListHeader>
                                            {
                                                UserStakes && UserStakes.data?.map((stake: StakeCollectionType) => (

                                                    <IonItem key={stake.id}>
                                                        <IonCard className="stake_card">
                                                            <IonCardHeader>
                                                                <div className="d-flex align-items-center">
                                                                    <div className="ion-margin-end">
                                                                        <IonIcon icon={dice} color="success" size='large' />
                                                                    </div>
                                                                    <div>
                                                                        <small className="text-light">{stake.created}</small>
                                                                        <h4 className="text-light">{stake.id}</h4>
                                                                    </div>
                                                                </div>
                                                            </IonCardHeader>
                                                            <IonCardContent>
                                                                <div className="d-flex justify-content-between algin-items-center">
                                                                    <IonText>Stake....</IonText>
                                                                    <IonText>{stake.stake}</IonText>
                                                                </div>
                                                                <div className="d-flex justify-content-between algin-items-center">
                                                                    <IonText>Odds....</IonText>
                                                                    <IonText>{stake.odd}</IonText>
                                                                </div>
                                                                <div className="d-flex justify-content-between algin-items-center">
                                                                    <IonText>Payout....</IonText>
                                                                    <IonText>₦ {stake.payout}</IonText>
                                                                </div>
                                                            </IonCardContent>
                                                        </IonCard>
                                                    </IonItem>
                                                ))
                                            }
                                        </IonList>
                                    </>
                                )
                            }
                        </>
                    ) : (
                        <>
                            <IonSkeletonText animated style={{ height: "10rem" }} className="my-1" />
                            <IonSkeletonText animated style={{ height: "10rem" }} className="my-1" />
                            <IonSkeletonText animated style={{ height: "10rem" }} className="my-1" />
                            <IonSkeletonText animated style={{ height: "10rem" }} className="my-1" />
                        </>
                    )
                }
            </IonContent>
        </IonPage>
    )
}

export default History