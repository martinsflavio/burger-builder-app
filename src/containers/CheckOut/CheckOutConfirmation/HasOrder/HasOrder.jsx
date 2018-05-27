import React from "react";
import Button from "../../../../components/UI/Button/Button";
import Burger from "../../../../components/Burger/Burger";

const HasOrder = (props) => {
  return (
    <div>
      <h3>Order Confirmation</h3>
      <Burger ingredients={props.confirmedOrder.ingredients}/>
      <div>
        <h3>TotalPrice:<span> $ {props.confirmedOrder.totalPrice.toFixed(2)}</span></h3>
        <h4>Order protocol: <span>{props.id}</span></h4>
        <Button btnType="Success" clicked={() => props.redirectTo("/orders")}>See my Orders</Button>
        <Button btnType="Success" clicked={() => props.redirectTo("/")}>Build another Burger</Button>
      </div>
    </div>
  );
};

export default HasOrder;