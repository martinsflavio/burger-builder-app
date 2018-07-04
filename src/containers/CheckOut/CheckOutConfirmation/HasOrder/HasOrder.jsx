import React, { Component } from "react";
import { withRouter } from 'react-router-dom';
import Button from "../../../../components/UI/Button/Button";
import Burger from "../../../../components/Burger/Burger";

class HasOrder  extends Component {

  render () {
    return (
      <div>
        <h3>Order Confirmation</h3>
        <Burger ingredients={this.props.confirmedOrder.ingredients}/>
        <div>
          <h3>TotalPrice:<span> $ {this.props.confirmedOrder.totalPrice.toFixed(2)}</span></h3>
          <h4>Order protocol: <span>{this.props.id}</span></h4>
          <Button clicked={() => this.props.history.push("/orders")}>See my Orders</Button>
          <Button clicked={() => this.props.history.go("/")}>Build another Burger</Button>
        </div>
      </div>
    );
  }
}

export default withRouter(HasOrder);
