import React, { Component } from "react";
import { connect } from 'react-redux';
import * as action from '../../store/actions/index';
import objDeepCopy from "../../utils/objDeepCopy";
import * as classes from './auth.css';

import Form from "../../components/UI/Form/Form";

class Auth extends Component {
  state = {
    controls: {
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Mail Address'
        },
        value: '',
        validation: {
          required: true,
          isEmail: true
        },
        valid: false,
        touched: false
      },
      password: {
        elementType: 'input',
        elementConfig: {
          type: 'password',
          placeholder: 'Password'
        },
        value: '',
        validation: {
          required: true,
          minLength: 6
        },
        valid: false,
        touched: false
      }
    }
  };

  submitHandler = e => {
    let user;
    e.preventDefault();

    console.log('submit Btn Clicked');
    user = this.props.userAuth();
    console.log(user)
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

  render () {
    return (
      <div className={classes.Auth}>
        <Form
          controls={objDeepCopy(this.state.controls)}
          updateControlsValue={(prevState) => this.updateControlsValueHandler(prevState)}
          submitHandler={this.submitHandler}
          formIsValid={this.state.formIsValid}
        />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    userAuth: () => dispatch(action.authStart())
  };
};

export default connect(null, mapDispatchToProps)(Auth);