# react-dom-controller
## How to use
``` javascript
import React from 'react';
import DomController from '@/components/DomController';

class Example extends React.Component {
  state = {
    container: {
      w: '',
      h: '',
    },
  };
  getRect = (param, { index }) => {
    console.log(param);
  };
  render = () => (
    <DomController
      data={{ yourData }}
      defaultPosition={{ left: 50, top: 50 }}
      callback={this.getRect}
    >
      <div className="controlled" />
    </DomController>
  );
}
