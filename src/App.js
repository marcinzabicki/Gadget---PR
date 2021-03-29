import { BrowserRouter, Route } from "react-router-dom";
import Home from "./components/Home/Main";
import Dashboards from "./components/Dashboards/Main";
import ServiceDetails from './components/ServiceDetails/Main';
import SignalRProvider from "./utils/signalr-context";
import Header from "./components/Header";
const App = () => {
  return (
    <SignalRProvider>
      <Header />
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
