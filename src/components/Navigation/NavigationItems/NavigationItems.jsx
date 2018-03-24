import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem';
import classes from './navigationItems.css';

const NavigationItems = (props) => (
  <ul className={classes.NavigationItems}>
    <NavigationItem link="/" active >Burger Builder</NavigationItem>
    <NavigationItem link="/"  >Checkout</NavigationItem>
  </ul>
);

export default NavigationItems;
