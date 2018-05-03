import React, {Component, Fragment} from 'react';
import { withRouter } from 'react-router-dom';
import axios from '../../../utils/axiosAPI';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import classes from './contactData.css';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';

class ContactData extends Component {
  state = {
    costumer: {
      name: 'Flavio',
      Address: {
        street: '4711 Callan #3',
        zipCode: '94015',
        country: 'usa'
      },
      email: 'flaviodosreismartins@gmail.com'
    },
    deliveryMethod: 'express',
    loading: false,
    orderSuccess: false,
    error: null
  };

  orderHandler = async (e) => {
    let orderRequest, orderResponse;
    e.preventDefault();
    this.setState({loading: true});

    orderRequest = {
      order: this.props.order,
      costumer: this.state.costumer
    };

    orderResponse = await axios.post('/orders.json', orderRequest);

    if (orderResponse instanceof  Error) {
      this.setState({error: 'Server connection Fail!', loading: false});
    } else {
      this.setState({orderSuccess: true, loading: false});

      this.props.history.push('/', orderRequest);
    }
  };

  render () {
    let form;

    if (this.state.loading) {
      form = <Spinner/>
    } else {
      form = (
        <Fragment>
          <h4>Enter your Contact Data</h4>
          <form>
            <input type="text" name="name" placeholder="Your Name" />
            <input type="email" name="email" placeholder="Your Email" />
            <input type="text" name="street" placeholder="Your Street" />
            <input type="text" name="zipcode" placeholder="Your ZipCode" />
            <Button btnType="Success" clicked={this.orderHandler}>Order</Button>
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
