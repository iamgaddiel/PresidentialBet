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
import { homeOutline, people, personCircleOutline, statsChartOutline, timeOutline } from 'ionicons/icons';

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
import './global.css'
import LandingPage from './screens/LandingPage/LandingPage';
import { useContext } from 'react';
import Login from './screens/Login/Login';
import Register from './screens/Register/Register';
import { UtilContext, UtilContextValues } from './context/utilContext';
import Dashboard from './screens/Dashboard/Dashboard';

// Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import Profile from './screens/Profile/Profile';
import Candidates from './screens/Candidates/Candidates';
import CandidateDetail from './screens/CandidateDetail/CandidateDetail';

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
        <Route exact path="/candidate/:id">
          <CandidateDetail />
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
                  <IonIcon icon={homeOutline}  />
                  <IonLabel>Home</IonLabel>
                </IonTabButton>

                <IonTabButton tab="vote" href="/candidates">
                  <IonIcon icon={people}  />
                  <IonLabel>Candidates</IonLabel>
                </IonTabButton>

                <IonTabButton tab="history" href="/history">
                  <IonIcon icon={timeOutline}  />
                  <IonLabel>History</IonLabel>
                </IonTabButton>

                <IonTabButton tab="stats" href="/stats">
                  <IonIcon icon={statsChartOutline}  />
                  <IonLabel>Stats</IonLabel>
                </IonTabButton>

                <IonTabButton tab="profile" href="/profile">
                  <IonIcon icon={personCircleOutline}   />
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
