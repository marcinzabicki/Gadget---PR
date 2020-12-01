import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './components/Home/Main';
import Dashboards from './components/Dashboards/Main';
import Inbox from './components/Inbox/Main';
import Products from './components/Products/Main';
import Invoices from './components/Invoices/Main';
import Header from './components/Header';
import Nav from './components/Nav';
import Machine from "./components/Dashboards/Machine";
const App = () => {
  return (
    <>
      <Header />
      <BrowserRouter>
        <div className="content-wrapper">
          <Nav />
          <section className="content">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/dashboards" component={Dashboards} />
              <Route exact path="/inbox" component={Inbox} />
              <Route path="/products" component={Products} />
              <Route exact path="/invoices" component={Invoices} />
              <Route path="/dashboards/:machineId">
                <Machine />
              </Route>
            </Switch>
          </section>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
