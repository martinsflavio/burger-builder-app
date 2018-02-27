import React from 'react';
import BuildControl from './BuildControl/BuildControl';

import classes from './buildControls.css';

const controls = [
  {label: 'Salad', type: 'salad'},
  {label: 'Bacon', type: 'bacon'},
  {label: 'Meat', type: 'meat'}
];

const BuildControls = (props) => (
  <div className={ classes.BuildControls }>
    {
      controls.map(ctrl => (
        <BuildControl 
          key={ ctrl.label }
          type={ ctrl.label }
          label={ ctrl.label }/>
      ))
    }
  </div>
)

export default BuildControls;
