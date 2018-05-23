import React, { Component, Fragment } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import classes from './checkOut.css';
import CheckOutSummary from "../../components/Order/CheckOutSummary/CheckOutSummary";
import ContactData from "./ContactData/ContactData";

class CheckOut extends Component {

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
          this.props.ings ?
            <Fragment>
              <CheckOutSummary
                ingredients={this.props.ings}
                checkOutCancelled={this.checkOutCancelled}
                checkOutContinued={this.checkOutContinued}/>
              <Route
                path={`${this.props.match.path}/contact-data`}
                component={ContactData} />
            </Fragment>
            : null
        }
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ings: state.ingredients
  }
};

export default connect(mapStateToProps)(CheckOut);
