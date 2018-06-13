import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as action from '../store/actions/index';

import Layout from '../hoc/Layout/Layout';
import BurgerBuilder from '../containers/BurgerBuilder/BurgerBuilder';
import CheckOut from "./CheckOut/CheckOut";
import Orders from "./Orders/Orders";
import CheckoutConfirmation from "./CheckOut/CheckOutConfirmation/CheckOutConfirmation";
import Auth from "./Auth/Auth";
import Logout from "./Auth/Logout/Logout";

class App extends Component {

  componentDidMount () {
    this.props.checkAuthState();
  }

  render() {
    return (
      <Layout>
        <Switch>
          <Route path="/" exact       component={BurgerBuilder} />
          <Route path="/auth"         component={Auth}/>
          <Route path="/logout"       component={Logout}/>
          <Route path="/orders"       component={Orders}/>
          <Route path="/checkout"     component={CheckOut} />
          <Route path="/confirmation" component={CheckoutConfirmation}/>
        </Switch>
      </Layout>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    checkAuthState: () => dispatch(action.checkAuthState())
  }
};

export default withRouter(
  connect(null, mapDispatchToProps)(App)
);
