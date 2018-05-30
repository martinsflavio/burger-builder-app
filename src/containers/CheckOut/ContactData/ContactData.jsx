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
    controls: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Name'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Street'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      zipCode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'ZIP Code'
        },
        value: '',
        validation: {
          required: true,
          minLength: 5,
          maxLength: 5,
          isNumeric: true
        },
        valid: false,
        touched: false
      },
      country: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Country'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Your E-Mail'
        },
        value: '',
        validation: {
          required: true,
          isEmail: true
        },
        valid: false,
        touched: false
      },
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [
            {value: 'fastest', displayValue: 'Fastest'},
            {value: 'cheapest', displayValue: 'Cheapest'}
          ]
        },
        value: 'fastest',
        validation: {},
        valid: true
      }
    },
    formIsValid: false
  };

  componentDidUpdate () {
    if (this.props.postSucceedId) {
      this.props.history.push('/confirmation');
    }
  }

  submitHandler = e => {
    let updatedControls, controls;

    e.preventDefault();

    controls = objDeepCopy(this.state.controls);

    updatedControls = {
      costumer: {},
      ingredients: this.props.ingredients,
      totalPrice: this.props.totalPrice
    };

    for (let costumerData in controls) {
      if (controls.hasOwnProperty(costumerData)) {
        updatedControls.costumer[costumerData] = controls[costumerData].value;
      }
    }

    this.props.postOrder(updatedControls);
  };

  updateControlsValueHandler = (newState) => {
    let state, updatedState;

    state = objDeepCopy(this.state);
    updatedState = {
      ...state,
      ...newState
    };

    this.setState(updatedState);
  };

  //TODO DEVELOPER: Add Validations to the form
  render () {

    return (
      <div className={classes.ContactData}>
        <Form
          controls={objDeepCopy(this.state.controls)}
          updateControlsValue={(prevState) => this.updateControlsValueHandler(prevState)}
          submitOrderHandler={this.submitHandler}
          formIsValid={this.state.formIsValid}
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
