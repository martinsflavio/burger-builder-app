import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../../utils/axiosAPI';
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
    let orderRequest, orderResponse, orderForm;

    e.preventDefault();

    // Initializing variables
    orderForm = objDeepCopyUtil(this.state.orderForm);
    orderRequest = {
      costumer: {},
      ingredients: this.props.ings,
      totalPrice: this.props.totalPrice
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

  changeInputHandler = orderForm => {
    this.setState({orderForm: objDeepCopyUtil(orderForm)})
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
              changeInput={(prevState) => this.changeInputHandler(prevState)}
              submitOrderHandler={this.submitOrderHandler}
            />
        }
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ings: state.ingredients,
    totalPrice: state.totalPrice
  }
};

export default connect(mapStateToProps)(
  withErrorHandler(withRouter(ContactData), axios)
);
