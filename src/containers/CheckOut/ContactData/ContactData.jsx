import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from '../../../utils/axiosAPI';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import classes from './contactData.css';
import Spinner from '../../../components/UI/Spinner/Spinner';
import objDeepCopyUtil from "../../../utils/objDeepCopy";
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
        value: ''
      }
    },
    loading: false,
    error: null
  };

  submitOrderHandler = async (e) => {
    let orderObj, orderRequest, orderResponse, orderForm;

    e.preventDefault();

    // Initializing variables
    orderObj = this.props.order;
    orderForm = objDeepCopyUtil(this.state.orderForm);
    orderRequest = {
      costumer: {},
      ingredients: orderObj.ingredients,
      totalPrice: orderObj.totalPrice
    };

    //Transforming ingredients Obj
    for (let costumerData in orderForm) {
      if (orderForm.hasOwnProperty(costumerData)) {
        orderRequest.costumer[costumerData] = orderForm[costumerData].value;
      }
    }

    this.setState({loading: true});
    orderResponse = await axios.post('/orders.json', orderRequest);

    //Local Error Handler
    if (orderResponse instanceof  Error) {
      this.setState({error: 'Server connection Fail!', loading: false});
    } else {
      this.setState({loading: false});
      this.props.history.push('/');
    }
  };

  changeInputHandler = (newFormObj) => {
    this.setState({orderForm: objDeepCopyUtil(newFormObj)})
  };

  render () {

    return (
      <div className={classes.ContactData}>
        {
          this.state.loading ?
            <Spinner />
              :
            <Form
              orderForm={objDeepCopyUtil(this.state.orderForm)}
              changeInput={this.changeInputHandler}
              submitOrderHandler={this.submitOrderHandler}
            />
        }
      </div>
    );
  }
}

export default withErrorHandler(withRouter(ContactData), axios);
