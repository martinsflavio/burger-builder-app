import React, { Component } from "react";
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as action from '../../store/actions/index';
import objDeepCopy from "../../utils/objDeepCopy";
import * as classes from './auth.css';

import Form from "../../components/UI/Form/Form";
import Spinner from  "../../components/UI/Spinner/Spinner";

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
    },
    createNewAccount: false
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

  submitHandler = (e) => {
    let email, password, createNewAccount;
    e.preventDefault();

    email = this.state.controls.email.value;
    password = this.state.controls.password.value;
    createNewAccount = this.state.createNewAccount;

    this.props.userAuth(email, password, createNewAccount);
  };

  switchAuthModeHandler = () => {
    let prevState = this.state.createNewAccount;

   this.setState({createNewAccount: !prevState});
  };

  render () {
    let authElements, redirect = null, errorMessage = null;

    if (this.props.user) {
      redirect = (<Redirect to="/"/>);
    }

    if (this.props.error) {
      errorMessage = this.props.error.message;
    }

    authElements = (
      <div>
        <div>
          <h2>{ this.state.createNewAccount ? "Sign Up" : "Log In" }</h2>
          <h2>{ errorMessage }</h2>
        </div>
        <div>
          <Form
            controls={objDeepCopy(this.state.controls)}
            updateControlsValue={(prevState) => this.updateControlsValueHandler(prevState)}
            submitHandler={this.submitHandler}
            formIsValid={this.state.formIsValid}
          />
        </div>
        <div>
          {
            this.state.createNewAccount ?
              <p>Click
                <strong onClick={this.switchAuthModeHandler}> HERE </strong>
                to log in with a existent account.
              </p> :
              <p>Don't have an account?
                <strong onClick={this.switchAuthModeHandler}> Create one.</strong>
              </p>
          }
        </div>
      </div>
    );

    if (this.props.loading) {
      authElements = (<Spinner/>);
    }

    return (
      <div className={classes.Auth}>
        { redirect }
        { authElements }
      </div>
    );
  }
}

const mapStateToProps = ({auth:           {user, error},
                         apiConnection:   {loading}}) => {
  return {
    user,
    error,
    loading
  }
};

const mapDispatchToProps = dispatch => {
  return {
    userAuth: (email, password, mode) => dispatch(action.authStart(email, password, mode))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);