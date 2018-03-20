import React, { Fragment } from 'react';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import classes from './layout.css';

const Layout = (props) =>  {
  
    return (
      <Fragment>
      Layout
        <Toolbar />

        <main className={ classes.Content }>
          { props.children }
        </main>
      </Fragment>
    );
  
}

export default Layout;
