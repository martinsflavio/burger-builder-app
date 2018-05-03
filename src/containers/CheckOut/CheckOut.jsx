import React, { Component, Fragment } from 'react';
import { Route } from 'react-router-dom';
import classes from './checkOut.css';
import CheckOutSummary from "../../components/Order/CheckOutSummary/CheckOutSummary";
import ContactData from "./ContactData/ContactData";

class CheckOut extends Component {
  state = {
    ingredients: null,
    totalPrice: 0
  };

  componentDidMount () {
    let state;

    state = {...this.props.history.location.state};
    this.setState({
     ingredients: state.ingredients,
     totalPrice: state.totalPrice});
  }

  checkOutCancelled = () => {
    this.props.history.goBack();
  };

  checkOutContinued = () => {
    this.props.history.replace('/checkout/contact-data');
  };

  render () {
    return(
      <div className={classes.CheckOut}>
        {
          this.state.ingredients ?
            <Fragment>
              <CheckOutSummary
                ingredients={this.state.ingredients}
                checkOutCancelled={this.checkOutCancelled}
                checkOutContinued={this.checkOutContinued}/>
              <Route
                path={`${this.props.match.path}/contact-data`}
                render={() => (<ContactData order={this.state}/>)} />
            </Fragment>
            : null
        }
      </div>
    );
  }
}

export default CheckOut;
