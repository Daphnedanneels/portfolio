'use strict';
import React from 'react';
// import {Link} from 'react-router';
// import {basename} from '../globals';

export default class App extends React.Component {
  constructor(props, context) {
    super(props, context);

  }

  render(){

    let {children} = this.props;

    return (
      <div className="container">
        {children}
      </div>
    );
  }
}
