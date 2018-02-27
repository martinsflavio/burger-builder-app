import React, { Fragment } from 'react';
import classes from './layout.css';

const Layout = (props) =>  {
  
    return (
      <Fragment>
      Layout
        <div>Tooolbar, SideDrawer, Backdrop</div>

        <main className={ classes.Content }>
          { props.children }
        </main>
      </Fragment>
    );
  
}

export default Layout;
