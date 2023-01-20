import { Network } from '@capacitor/network';
import { Redirect, Route } from 'react-router-dom';
import {
  IonAlert,
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonToast,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { barChartOutline, homeOutline, people, personCircleOutline, pieChartOutline, statsChartOutline, timeOutline } from 'ionicons/icons';

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
import { useContext, useState } from 'react';
import Login from './screens/Login/Login';
import Register from './screens/Register/Register';
import { UtilContext, UtilContextValues } from './context/utilContext';
import Dashboard from './screens/Dashboard/Dashboard';

// Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import Profile from './screens/Profile/Profile';
import User from './screens/User/User';
import Accounts from './screens/Accounts/Accounts';
import Wallet from './screens/Wallet';
import History from './screens/History';
import Stats from './screens/Stats/Stats';
import ForgotPassword from './screens/ForgotPassword';

// ReactQuery
import { QueryClient, QueryClientProvider } from 'react-query'
import CollectionProvider from './context/CollectionProvider';


setupIonicReact();

const App: React.FC = () => {


  const { showTabs } = useContext(UtilContext) as UtilContextValues
  const queryClient = new QueryClient()
  const [isOpen, setIsOpen] = useState(false)


  Network.addListener('networkStatusChange', status => {
    if (!status.connected) {
      setIsOpen(true)
    }
    setIsOpen(false)
  });


  return (
    <QueryClientProvider client={queryClient}>
      <CollectionProvider>
        <IonApp >
          <IonAlert isOpen={isOpen}
            message="Hmm... you don't seem to be connected the internet"
            onDidDismiss={() => setIsOpen(false)}
            // position="top"
            // color="danger"
          />
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
            <Route exact path="/accounts">
              <Accounts />
            </Route>
            <Route exact path="/wallet">
              <Wallet />
            </Route>
            <Route exact path="/history">
              <History />
            </Route>
            <Route exact path="/stats">
              <Stats />
            duration={}
            </Route>
            <Route exact path="/forgot-password">
              <ForgotPassword />
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
                    <Route exact path="/user">
                      <User />
                    </Route>
                    <Route exact path="/forgot-password">
                      <ForgotPassword />
                    </Route>
                    <Route exact path="/history">
                      <History />
                    </Route>
                    <Route exact path="/stats">
                      <Stats />
                    </Route>
                    <Route exact path="/accounts">
                      <Accounts />
                    </Route>
                    <Route exact path="/wallet">
                      <Wallet />
                    </Route>
                  </IonRouterOutlet>

                  <IonTabBar slot="bottom" translucent>
                    <IonTabButton tab="dashboard" href="/dashboard">
                      <IonIcon icon={homeOutline} size='large' />
                      <IonLabel>Home</IonLabel>
                    </IonTabButton>

                    <IonTabButton tab="history" href="/history">
                      <IonIcon icon={timeOutline} size='large' />
                      <IonLabel>History</IonLabel>
                    </IonTabButton>

                    <IonTabButton tab="stats" href="/stats">
                      <IonIcon icon={statsChartOutline} size='large' />
                      <IonLabel>Stats</IonLabel>
                    </IonTabButton>

                    <IonTabButton tab="user" href="/user">
                      <IonIcon icon={personCircleOutline} size='large' />
                      <IonLabel >Me</IonLabel>
                    </IonTabButton>

                  </IonTabBar>
                </IonTabs>
              ) : null
            }
          </IonReactRouter>
        </IonApp>
      </CollectionProvider>
    </QueryClientProvider>
  )
}

export default App;
