import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { closeCircleOutline, ellipse, home, homeOutline, people, personCircleOutline, square, statsChartOutline, thumbsUpOutline, timeOutline, triangle } from 'ionicons/icons';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import LandingPage from './pages/LandingPage';
import { useContext, useState } from 'react';
import Login from './pages/Login';
import Register from './pages/Register';
import { UtilContext, UtilContextValues } from './context/utilContext';
import Dashboard from './pages/Dashboard';

// Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import Profile from './pages/Profile';
import Candidates from './pages/Candidates';

setupIonicReact();

const App: React.FC = () => {
  const { showTabs } = useContext(UtilContext) as UtilContextValues

  return (
    <IonApp >
      <IonReactRouter>

        <Route exact path="/home">
          <LandingPage />
        </Route>
        <Route exact path="/">
          <Redirect to="/home" />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/register">
          <Register />
        </Route>
        <Route exact path="/dashboard">
          <Dashboard />
        </Route>

        {
          showTabs ? (
            <IonTabs>
              <IonRouterOutlet>
                <Route exact path="/dashboard">
                  <Dashboard />
                </Route>
                <Route exact path="/profile">
                  <Profile />
                </Route>
                <Route exact path="/candidates">
                  <Candidates />
                </Route>

              </IonRouterOutlet>
              <IonTabBar slot="bottom">

                <IonTabButton tab="dashboard" href="/dashboard">
                  <IonIcon icon={homeOutline} color='warning' />
                  <IonLabel>Home</IonLabel>
                </IonTabButton>

                <IonTabButton tab="vote" href="/candidates">
                  <IonIcon icon={people} color='warning' />
                  <IonLabel>Candidates</IonLabel>
                </IonTabButton>

                <IonTabButton tab="history" href="/history">
                  <IonIcon icon={timeOutline} color='warning' />
                  <IonLabel>History</IonLabel>
                </IonTabButton>

                <IonTabButton tab="stats" href="/stats">
                  <IonIcon icon={statsChartOutline} color='warning' />
                  <IonLabel>Stats</IonLabel>
                </IonTabButton>

                <IonTabButton tab="profile" href="/profile">
                  <IonIcon icon={personCircleOutline}  color='warning' />
                  <IonLabel >Profile</IonLabel>
                </IonTabButton>


              </IonTabBar>
            </IonTabs>
          ) : null
        }
      </IonReactRouter>
    </IonApp>
  )
}

export default App;
