import React from 'react';
import classes from './toolbar.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../../Navigation/NavigationItems/NavigationItems';
import DrawerToogle from '../SideDrawer/DrawerToogle/DrawerToogle';

const Toolbar = (props) => (
  <header className={classes.Toolbar}>
    <DrawerToogle clicked={props.sideDrawerToogleclicked} />
    <div className={classes.Logo}>
      <Logo />
    </div>
    <nav className={classes.DesktopOnly}>
      <NavigationItems />
    </nav>
  </header>
);

export default Toolbar;
