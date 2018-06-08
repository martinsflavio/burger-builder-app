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
    let user = null, error = null;

    if (this.props.user) {
      user = <p>User Exist.</p>
    }
    if (this.props.error) {
      error = this.props.error.data.error.message;
    }
    return (
      <div className={classes.Auth}>
       <div>
         <h2>
           { this.state.createNewAccount ? "Sign Up" : "Sign In" }
         </h2>
       </div>
        <Form
          controls={objDeepCopy(this.state.controls)}
          updateControlsValue={(prevState) => this.updateControlsValueHandler(prevState)}
          submitHandler={this.submitHandler}
          formIsValid={this.state.formIsValid}
        />
        <div>
          {
            this.state.createNewAccount ?
              <p>Do you have an account?
                <strong onClick={this.switchAuthModeHandler}> Sign In.</strong>
              </p> :
              <p>Don't have an account?
                <strong onClick={this.switchAuthModeHandler}> Create one.</strong>
              </p>
          }
        </div>
        { user }
        { error }
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.auth.user,
    error: state.auth.error
  }
};

const mapDispatchToProps = dispatch => {
  return {
    userAuth: (email, password, mode) => dispatch(action.authStart(email, password, mode))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);