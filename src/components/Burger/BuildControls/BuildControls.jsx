import React, { Component } from 'react';
import BuildControl from './BuildControl/BuildControl';

import classes from './buildControls.css';

class BuildControls extends Component {

  capitalize = str => str.charAt(0).toUpperCase() + str.slice(1);

  render () {
    let price, controlsList;

    controlsList = Object.keys(this.props.ingredients);
    price = this.props.totalPrice.toFixed(2);

    return (
      <div className={classes.BuildControls}>
        <h3>Burger Price: $ {price}</h3>
        {
          controlsList.map((ctrl, id) => (
            <BuildControl
              key={id}
              type={ctrl}
              label={this.capitalize(ctrl)}
              addIngMethod={this.props.addIngMethod}
              removeIngMethod={this.props.removeIngMethod}
              disableIngBtnHandler={this.props.disableIngBtnHandler(ctrl)}
            />
          ))
        }
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
