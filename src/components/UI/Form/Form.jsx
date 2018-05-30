import React, { Component } from 'react';
import classes from './form.css';

import Button from "../Button/Button";
import Input from "./Input/Input";

class Form extends Component {

  transformObjToArray = obj => {
    let output = [];

    if (obj === null || obj === undefined || typeof obj !== "object") {
      return output;
    } else {
      for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
          output.push({element: obj[key], id: key});
        }
      }
      return output;
    }
  };

  checkValidity = (value, rules) => {
    let isValid = true;
    if (!rules) {
      return true;
    }

    if (rules.required) {
      isValid = value.trim() !== '' && isValid;
    }

    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid
    }

    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid
    }

    if (rules.isEmail) {
      const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
      isValid = pattern.test(value) && isValid
    }

    if (rules.isNumeric) {
      const pattern = /^\d+$/;
      isValid = pattern.test(value) && isValid
    }

    return isValid;
  };

  validateForm = controls => {
    let output = true;
    for (let input in controls) {
      if (controls.hasOwnProperty(input)) {
        if (!controls[input].valid) {
          output = false;
        }

      }
    }
    return output;
  };

  inputChangeHandler = (e, inputObj, controls) => {
    let {id} = inputObj, formIsValid, newState;
    controls[id].value = e.target.value;
    controls[id].valid = this.checkValidity(controls[id].value, controls[id].validation);
    controls[id].touched = true;
    formIsValid = this.validateForm(controls);

    newState = {
      controls,
      formIsValid
    };

    this.props.updateControlsValue(newState)
  };

  render () {
    let inputsArray;

    inputsArray = this.transformObjToArray(this.props.controls);

    return (
      <div className={classes.Form}>
        <h4>{this.props.children}</h4>
        <form onSubmit={this.props.submitHandler}>
          {
            inputsArray.map(input => (
              <Input
                key={input.id}
                elementType={input.element.elementType}
                elementConfig={input.element.elementConfig}
                value={input.element.value}
                isValid={input.element.valid}
                touched={input.element.touched}
                changed={(e) => this.inputChangeHandler(e, input, this.props.controls)}
              />
            ))
          }
          <Button btnType="Success" disable={!this.props.formIsValid}>Submit</Button>
        </form>
      </div>
    );
  }
}

export default Form;
