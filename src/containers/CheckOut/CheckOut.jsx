import React, { Component, Fragment } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import classes from './checkOut.css';
import CheckOutSummary from "../../components/Order/CheckOutSummary/CheckOutSummary";
import ContactData from "./ContactData/ContactData";
import burgerHasIngredients from "../BurgerBuilder/burgerHasIngredients";

class CheckOut extends Component {

  checkOutCancelled = () => this.props.history.goBack();

  checkOutContinued = () => this.props.history.replace('/checkout/contact-data');

  render () {
    let summary;

    if (this.props.ingredients && burgerHasIngredients(this.props.ingredients)) {
      summary = (
        <Fragment>
          <CheckOutSummary
            ingredients={this.props.ingredients}
            checkOutCancelled={this.checkOutCancelled}
            checkOutContinued={this.checkOutContinued}/>
          <Route
            path={`${this.props.match.path}/contact-data`}
            component={ContactData} />
        </Fragment>
      );
    } else {
      summary = (<Redirect to='/'/>);
    }

    return(
      <div className={classes.CheckOut}>
        { summary }
      </div>
    );
  }
}

const mapStateToProps = ({burgerBuilder:{ingredients}}) => {
  return {
    ingredients
  }
};

export default connect(mapStateToProps)(CheckOut);
