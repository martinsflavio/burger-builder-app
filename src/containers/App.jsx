import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Layout from '../hoc/Layout/Layout';
import BurgerBuilder from '../containers/BurgerBuilder/BurgerBuilder';
import CheckOut from "./CheckOut/CheckOut";
import Orders from "./Orders/Orders";
import CheckoutConfirmation from "./CheckOut/CheckOutConfirmation/CheckOutConfirmation";
import Auth from "./Auth/Auth";

class App extends Component {

  render() {
    return (
      <Layout>
        <Switch>
          <Route path="/" exact       component={BurgerBuilder} />
          <Route path="/auth"         component={Auth}/>
          <Route path="/orders"       component={Orders}/>
          <Route path="/checkout"     component={CheckOut} />
          <Route path="/confirmation" component={CheckoutConfirmation}/>
        </Switch>
      </Layout>
    );
  }
}

export default App;
