import React, { Component } from 'react';
import classes from './form.css';
import Button from "../Button/Button";
import Input from "./Input/Input";

class Form extends Component {

  inputChangeHandler = (e, input, inputsObj) => {
    let inputValue;

    inputValue = e.target.value;
    inputsObj[input.id].value = inputValue;

    this.props.changeInput(inputsObj);
  };

  render () {
    let inputsArray = [], inputsObj;

    inputsObj = this.props.orderForm;

    for (let key in inputsObj) {
      if (inputsObj.hasOwnProperty(key)) {
        inputsArray.push({element: inputsObj[key], id: key});
      }
    }

    return (
      <div className={classes.Form}>
        <h4>Enter your Contact Data</h4>
        <form onSubmit={this.props.submitOrderHandler}>
          {
            inputsArray.map(input => (
              <Input
                key={input.id}
                elementType={input.element.elementType}
                elementConfig={input.element.elementConfig}
                value={input.element.value}
                changed={(e) => this.inputChangeHandler(e, input, inputsObj)}
              />
            ))
          }
          <Button btnType="Success">Order</Button>
        </form>
      </div>
    );
  }
}

export default Form;
