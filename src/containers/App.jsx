import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import AsyncComponent from "../hoc/asyncComponent/asyncComponent";
import * as action from '../store/actions/index';

import Layout from '../hoc/Layout/Layout';
import BurgerBuilder from '../containers/BurgerBuilder/BurgerBuilder';
import Logout from "./Auth/Logout/Logout";

const asyncCheckout = AsyncComponent(() => import("./CheckOut/CheckOut"));
const asyncOrders = AsyncComponent(() => import("./Orders/Orders"));
const asyncCheckoutConfirmation = AsyncComponent(() => import("./CheckOut/CheckOutConfirmation/CheckOutConfirmation"));
const asyncAuth = AsyncComponent(() => import("./Auth/Auth"));


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
          <Route path="/orders"       component={asyncOrders}/>
          <Route path="/checkout"     component={asyncCheckout} />
          <Route path="/confirmation" component={asyncCheckoutConfirmation}/>
          <Redirect to="/"/>
        </Switch>
      );
    } else {
      routes = (
        <Switch>
          <Route path="/" exact       component={BurgerBuilder} />
          <Route path="/auth"         component={asyncAuth}/>
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
