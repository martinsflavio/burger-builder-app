import React, { Component } from 'react';
import classes from './buildControls.css';
import BuildControl from './BuildControl/BuildControl';

class BuildControls extends Component {

  capitalize = str => str.charAt(0).toUpperCase() + str.slice(1);

  controlBuilder = controlsObj => {
    let controlsElementArray, controlsArray;

    controlsArray = Object.keys(controlsObj);

    controlsElementArray =  controlsArray.map((ctrl, id) => (
      <BuildControl
        key={id}
        type={ctrl}
        label={this.capitalize(ctrl)}
        addIngMethod={this.props.addIngMethod}
        removeIngMethod={this.props.removeIngMethod}
        disableIngBtnHandler={this.props.disableIngBtnHandler(ctrl)}
      />
    ));
    return controlsElementArray;
  };

  render () {
    let price;

    price = this.props.totalPrice.toFixed(2);

    return (
      <div className={classes.BuildControls}>
        <h3>Burger Price: $ {price}</h3>
        {this.controlBuilder(this.props.ingredients)}
        <button
          className={classes.OrderButton}
          disabled={!this.props.disableCheckoutBtnHandler}
          onClick={this.props.purchasingHandler}
        >Order Now</button>
      </div>
    );
  }
}

export default BuildControls;
