import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
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

    let routes = null;

    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/" exact       component={BurgerBuilder} />
          <Route path="/logout"       component={Logout}/>
          <Route path="/orders"       component={Orders}/>
          <Route path="/checkout"     component={CheckOut} />
          <Route path="/confirmation" component={CheckoutConfirmation}/>
          <Redirect to="/"/>
        </Switch>
      );
    } else {
      routes = (
        <Switch>
          <Route path="/" exact       component={BurgerBuilder} />
          <Route path="/auth"         component={Auth}/>
          <Redirect to="/"/>
        </Switch>
      );
    }

    return (
      <Layout>
        { routes }
      </Layout>
    );
  }
}

const mapStateToProps =({auth:{user}}) => {
  return {
    isAuthenticated: user !== null
  }
};

const mapDispatchToProps = dispatch => {
  return {
    checkAuthState: () => dispatch(action.checkAuthState())
  }
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(App)
);
