import React, { Component } from 'react';
import Layout from '../components/Layout/Layout';
import BurgerBuilder from '../containers/BurgerBuilder/BurgerBuilder';

class App extends Component {
  render() {
    return (
      <Layout>
        <p>App</p>
        <BurgerBuilder />
      </Layout>
    );
  }
}

export default App;
