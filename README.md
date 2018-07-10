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
    textareaValue: '',
  };
  getRect = (param, { index }) => {
    const {
      container: { w, h },
      textareaValue,
    } = this.state;
    const {
      x, y, width, height,
    } = param;
    this.position = {
      data: `27:${(index + 1)},${(x / w).toFixed(2)},${(y / h).toFixed(2)},${(width / w).toFixed(2)},${(height / h).toFixed(2)},${textareaValue}`,
    };
  };
  render = () => (
    <DomController
      data={{ yourData }}
      defaultPosition={{ left: 50, top: 50 }}
      callback={this.getRect}
    >
      <textarea className="controlled" />
    </DomController>
  );
}
