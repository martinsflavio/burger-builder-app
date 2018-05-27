import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as action from '../../../store/actions/index';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import objDeepCopy from "../../../utils/objDeepCopy";
import axios from '../../../utils/axiosAPI';
import classes from './contactData.css';

import Form from "../../../components/UI/Form/Form";

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Name'
        },
        value: ''
      },
      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Street'
        },
        value: ''
      },
      zipCode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'ZIP Code'
        },
        value: ''
      },
      country: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Country'
        },
        value: ''
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'example@something.com'
        },
        value: ''
      },
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [
            {value: 'express', displayValue: 'Express'},
            {value: 'standard', displayValue: 'Standard'}
          ]
        },
        value: 'Standard'
      }
    }
  };

  componentDidUpdate () {
    if (this.props.postSucceedId) {
      this.props.history.push('/confirmation');
    }
  }

  submitOrderHandler = (e) => {
    let orderRequest, orderForm;

    e.preventDefault();

    // Initializing variables
    orderForm = objDeepCopy(this.state.orderForm);
    // Injecting order data into orderRequest obj
    orderRequest = {
      costumer: {},
      ingredients: this.props.ingredients,
      totalPrice: this.props.totalPrice
    };

    //Injecting costumer data from Form to orderRequest Obj
    for (let costumerData in orderForm) {
      if (orderForm.hasOwnProperty(costumerData)) {
        orderRequest.costumer[costumerData] = orderForm[costumerData].value;
      }
    }

    this.props.postOrder(orderRequest);
  };

  changeInputHandler = orderForm => this.setState({orderForm: objDeepCopy(orderForm)});

  //TODO DEVELOPER: Add Validations to the form
  render () {
    return (
      <div className={classes.ContactData}>
        <Form
          orderForm={objDeepCopy(this.state.orderForm)}
          changeInput={(prevState) => this.changeInputHandler(prevState)}
          submitOrderHandler={this.submitOrderHandler}
        />
      </div>
    );
  }
}

const mapStateToProps = ({burgerBuilder:  {ingredients, totalPrice},
                          orders:         {postSucceedId, error}}) => {
  return {
    ingredients,
    totalPrice,
    postSucceedId,
    error
  }
};

const mapDispatchToProps = dispatch => {
  return {
    postOrder: (order) => dispatch(action.postOrder(order)),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(
  withErrorHandler(withRouter(ContactData), axios)
);
