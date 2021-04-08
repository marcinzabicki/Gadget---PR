import React, {useState, useEffect} from 'react'
import { BrowserRouter, Route } from "react-router-dom";
import Home from "./components/Home/Main";
import Dashboards from "./components/Dashboards/Main";
import ServiceDetails from './components/ServiceDetails/Main';
import SignalRProvider from "./utils/signalr-context";
import Header from "./components/Header";
import LoginModal from '../src/components/Common/Modals/LoginModal'
import InMemoryJwt from '../src/utils/Authentication/InMemoryJwt'
const App = () => {
  
  const [displayLogin, setDisplayLogin] = useState(true);
    useEffect(async ()=>{
     let refreshed = await InMemoryJwt.getTokenRefreshed();
      setDisplayLogin(refreshed === null);
  },[]);

  if(displayLogin){
    return <LoginModal
    setDisplayLogin={setDisplayLogin}
            />
  }
  return (
    <SignalRProvider>
      <Header setDisplayLogin={setDisplayLogin} />
      <BrowserRouter>
        <div className="content-wrapper">
          <section className="content">
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/:machineName">
              <Dashboards />
            </Route>
            <Route path="/:machineName/:serviceName">
              <ServiceDetails />
            </Route>
          </section>
        </div>
      </BrowserRouter>
    </SignalRProvider>
  );
};

export default App;
