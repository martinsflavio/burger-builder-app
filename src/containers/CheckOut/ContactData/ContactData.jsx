import React, {Component, Fragment} from 'react';
import { withRouter } from 'react-router-dom';
import axios from '../../../utils/axiosAPI';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import classes from './contactData.css';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from "../../../components/UI/Form/Input/Input";
import objDeepCopyUtil from "../../../utils/objDeepCopy";

//TODO: Extract  <Form /> logic into it's own component such as the following Example:
/*
<ContactData >
  <Form>
    <Input />
  <Form />
<ContactData />
*/

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

  orderHandler = async (e) => {
    let orderObj, orderRequest, orderResponse, orderForm;

    // Initializing variables
    e.preventDefault();
    orderObj = this.props.order;
    orderForm = {...this.state.orderForm};
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

  inputChangedHandler = (e, elementId) => {
    let updatedOrderForm, inputValue;

    inputValue = e.target.value;
    updatedOrderForm = objDeepCopyUtil(this.state.orderForm);

    updatedOrderForm[elementId].value = inputValue;

    this.setState({orderForm: updatedOrderForm});
  };

  render () {
    let form = null, formElementArray = [], inputArray = [];

    for (let key in this.state.orderForm) {
     if (this.state.orderForm.hasOwnProperty(key)) {
       formElementArray.push({id: key, config: this.state.orderForm[key]});
     }
    }

    if (this.state.loading) {
      form = <Spinner/>
    } else {
      inputArray = formElementArray.map(formElement => (
        <Input
          key={formElement.id}
          elementType={formElement.config.elementType}
          elementConfig={formElement.config.elementConfig}
          value={formElement.config.value}
          changed={(e) => this.inputChangedHandler(e, formElement.id)}
        />
      ));

      form = (
        <Fragment>
          <h4>Enter your Contact Data</h4>
          <form onSubmit={this.orderHandler}>
            { inputArray }
            <Button btnType="Success">Order</Button>
          </form>
        </Fragment>
      );
    }

    return (
      <div className={classes.ContactData}>
        { form }
      </div>
    );
  }
}

export default withErrorHandler(withRouter(ContactData), axios);
