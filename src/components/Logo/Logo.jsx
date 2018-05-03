import React from 'react';
import classes from './logo.css';
import burgerLogo from '../../assets/images/burger-logo.png';

const Logo = (props) => (
  <div className={classes.Logo}>
    <img src={burgerLogo} alt="MyBurger" />
  </div>
);

export default Logo;
