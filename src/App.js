import { BrowserRouter, Route } from "react-router-dom";
import Home from "./components/Home/Main";
import Dashboards from "./components/Dashboards/Main";
import SignalRProvider from "./utils/signalr-context";
// import Inbox from './components/Inbox/Main';
// import Products from './components/Products/Main';
// import Invoices from './components/Invoices/Main';
import Header from "./components/Header";
// import Nav from './components/Nav';
const App = () => {
  return (
    <SignalRProvider>
      <Header />
      <BrowserRouter>
        <div className="content-wrapper">
          {/* <Nav /> */}
          <section className="content">
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/:machineName">
              <Dashboards />
            </Route>
            <Route path="/:machineName/:serviceName">
              <Home />
            </Route>
            {/* <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/dashboards" component={Dashboards} />
              <Route exact path="/inbox" component={Inbox} />
              <Route path="/products" component={Products} />
              <Route exact path="/invoices" component={Invoices} />
            </Switch> */}
          </section>
        </div>
      </BrowserRouter>
    </SignalRProvider>
  );
};

export default App;
