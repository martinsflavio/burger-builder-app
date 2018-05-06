import React, { Component, Fragment } from 'react';
import classes from './form.css';
import Button from "../Button/Button";
import Input from "./Input/Input";

class Form extends Component {
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
        value: ''
      }
    },
    loading: false,
    error: null
  };



  render () {

    return (
      <Fragment>
        <h4>Enter your Contact Data</h4>
        <form onSubmit={this.props.submitOrderHandler}>
          {this.props.formElementArray.map(formElement => (
            <Input
              key={formElement.id}
              elementType={formElement.config.elementType}
              elementConfig={formElement.config.elementConfig}
              value={formElement.config.value}
              changed={(e) => this.props.inputChangedHandler(e, formElement.id)}
            />
          ))}
          <Button btnType="Success">Order</Button>
        </form>
      </Fragment>
    );
  }
}

export default Form;
