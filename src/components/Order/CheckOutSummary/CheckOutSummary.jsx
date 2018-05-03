import React from 'react';
import classes from './checkOutSummary.css';
import Burger from "../../Burger/Burger";
import Button from "../../UI/Button/Button";


const CheckOutSummary = (props) => {

  return (
    <div className={classes.CheckOutSummary}>
      <h1>We hope it tastes well!</h1>
      <div className={classes.BurgerSummary}>
        <Burger ingredients={props.ingredients}/>
      </div>
      <Button btnType="Danger" clicked={props.checkOutCancelled} >Cancel</Button>
      <Button btnType="Success" clicked={props.checkOutContinued} >Continue</Button>
    </div>
  );
};

export default CheckOutSummary;
