import React, { Fragment } from 'react';
import classes from './SideDrawer.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../../Navigation/NavigationItems/NavigationItems';
import Backdrop from '../../UI/BackDrop/BackDrop';

const SideDrawer = (props) => {
  let attachedClasses;
  attachedClasses = [classes.SideDrawer, classes.Close];

  if (props.open) { attachedClasses = [classes.SideDrawer, classes.Open] }

  return (
    <Fragment>
      <Backdrop show={props.open} clicked={props.closed} /> {/*Passing boolean props doesn't require a prop declaration*/}
      <div className={attachedClasses.join(' ')}>
        <div className={classes.Logo}>
          <Logo />
        </div>
        <nav>
          <NavigationItems />
        </nav>
      </div>
    </Fragment>
  );
};

export default SideDrawer;
