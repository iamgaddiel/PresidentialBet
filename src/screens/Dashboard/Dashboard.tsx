import { IonButton, IonCard, IonCardContent, IonContent, IonIcon, IonItem, IonLabel, IonList, IonListHeader, IonNavLink, IonPage, IonRouterLink } from '@ionic/react'
import { addSharp, arrowForwardSharp } from 'ionicons/icons'
import { useContext, useEffect } from 'react'
import Header from '../../components/Header'
import ProfilePreview from '../../components/ProfilePreview'
import { UtilContext, UtilContextValues } from '../../context/utilContext'
import useAuth from '../../hooks/useAuth'

import './Dashboard.css'


const Dashboard = () => {
  const { setShowTabs } = useContext(UtilContext) as UtilContextValues
  const { authUser, pb } = useAuth()

  useEffect(() => {
    setShowTabs(true);
  }, [pb, setShowTabs])

  return (
    <IonPage>
      <Header title={'Dashboard'} />
      <IonContent className='ion-padding'>
        <ProfilePreview firstName={authUser.firstName} state={authUser.state} />

        {/* Dashboard Banner */}
        <section className='mt-4'>
          <IonCard className='text-center bg-warning text-dark py-3'>
            <IonCardContent>
              <small>Current Balance</small>
              <h1 className='h1'>₦200000.00</h1>
              <IonButton className='topup_btn mt-2' fill='outline' shape='round' color='dark'>
                Top Up <IonIcon icon={addSharp} color='dark' />
              </IonButton>
            </IonCardContent>
          </IonCard>
        </section>

        {/* Vote */}
        <section className="mt-4">
          <IonList>
            <IonItem routerDirection='forward' routerLink='/vote'>
              Vote
            </IonItem>
          </IonList>
        </section>

        {/* History */}
        <section className='mt-4'>
          <div className="d-flex justify-content-between align-items-center text-muted">
            <IonLabel>History</IonLabel>
            {/* <IonNavLink>view all <IonIcon icon={arrowForwardSharp} /></IonNavLink> */}
            <IonRouterLink routerDirection='forward' routerLink='/history'>
              view all <IonIcon icon={arrowForwardSharp} />
            </IonRouterLink>
          </div>
        </section>


      </IonContent>
    </IonPage>
  )
}

export default Dashboard