/* eslint-disable react/no-unused-state, arrow-parens */
import React from 'react';
import PropTypes from 'prop-types';
import { CLASSNAME, HANDLE_DOTS } from './constants';
import { getRect, getPosition } from './resizeHandle';
import './style';

class DomController extends React.Component {
  static propTypes = {
    defaultPosition: PropTypes.object,
    defaultSize: PropTypes.object,
    minConstraints: PropTypes.object,
    children: PropTypes.element,
    callback: PropTypes.func,
    data: PropTypes.object,
  };
  static defaultProps = {
    data: {},
    defaultPosition: { left: 60, top: 80 },
    defaultSize: { width: 200, height: 100 },
    minConstraints: { width: 100, height: 100 },
  };
  state = {
    // drag
    controlPosition: {},
    startDragPosition: {},
    dragging: false,
    // resize
    controlSize: {},
    startResizeRect: {},
    startResizeRectPosition: {},
    startResizeMousePosition: {},
    resizing: false,
    dir: {
      name: CLASSNAME.DIR.EMPTY,
    },
  };
  componentDidMount() {
    this.init();
  }
  componentWillUnmount() {
    this.removeEvent();
  }
  getValue = () => {
    const {
      props: { callback, data },
      state: { controlPosition, controlSize },
    } = this;
    callback && callback({
      x: controlPosition.left,
      y: controlPosition.top,
      width: controlSize.width,
      height: controlSize.height,
    }, data);
  };
  init = () => {
    const { defaultPosition, defaultSize } = this.props;
    this.setState({
      controlPosition: defaultPosition,
      controlSize: defaultSize,
    }, () => {
      this.initEvent();
    });
  };
  initEvent = () => {
    window.addEventListener('mousemove', this.initMouseMoveEvent);
    window.addEventListener('mouseup', this.handleUp);
  };
  initMouseMoveEvent = (e) => {
    const { dragging, resizing } = this.state;
    if (dragging) this.dragging(e);
    if (resizing) this.resizing(e);
    if (dragging || resizing) this.getValue();
  };
  removeEvent = () => {
    window.removeEventListener('mousemove', this.initMouseMoveEvent);
    window.removeEventListener('mouseup', this.handleUp);
  };
  handleCilck = (e) => {
    e.preventDefault();
  };
  handleDown = (e) => {
    e.stopPropagation();
    e.persist();
    const { className, dataset: { x, y } } = e.currentTarget;
    const coordinates = { x: e.clientX, y: e.clientY };
    if (className.indexOf(CLASSNAME.CONTROLLER) > -1) {
      this.startDrag(coordinates);
    } else {
      this.startResize({
        ...coordinates,
        dir: {
          name: className.replace(`${CLASSNAME.DOT} `, ''),
          x,
          y,
        },
      });
    }
  };
  handleUp = () => {
    this.endDrag();
    this.endResize();
    // this.getValue();
  };
  startDrag = ({ x, y }) => {
    this.setState(({ controlPosition }) => ({
      startDragPosition: {
        x: x - controlPosition.left,
        y: y - controlPosition.top,
      },
      dragging: true,
    }));
  };
  dragging = (e) => {
    const { dragging } = this.state;
    if (dragging) {
      this.setState(({ startDragPosition }) => ({
        controlPosition: {
          left: e.clientX - startDragPosition.x,
          top: e.clientY - startDragPosition.y,
        },
      }));
    }
  };
  endDrag = () => {
    const { dragging } = this.state;
    if (dragging) {
      this.setState(() => ({
        dragging: false,
      }));
    }
  };
  startResize = ({ x, y, dir }) => {
    this.setState(({ controlSize, controlPosition }) => ({
      resizing: true,
      startResizeMousePosition: { x, y },
      startResizeRect: controlSize,
      startResizeRectPosition: controlPosition,
      dir,
    }));
  };
  resizing = (e) => {
    const { resizing } = this.state;
    if (resizing) {
      const {
        state: {
          startResizeRect,
          startResizeRectPosition,
          startResizeMousePosition,
          dir,
          controlSize,
        },
        props: { minConstraints },
      } = this;
      const coords = {
        x: e.clientX - startResizeMousePosition.x,
        y: e.clientY - startResizeMousePosition.y,
      };
      const params = {
        rect: startResizeRect,
        rectPos: startResizeRectPosition,
        coords,
        minConstraints,
        dir,
      };
      const rect = getRect(params);
      const position = getPosition(params);
      this.setState(({ controlPosition }) => ({
        controlSize: {
          ...controlSize,
          ...rect,
        },
        controlPosition: {
          ...controlPosition,
          ...position,
        },
      }));
    }
  };
  endResize = () => {
    this.setState({
      resizing: false,
    });
  };
  render = () => (
    <div
      className={`${CLASSNAME.CONTROLLER} ${(this.state.dragging || this.state.resizing) ? 'selected' : ''}`}
      style={{
        ...this.state.controlPosition,
        ...this.state.controlSize,
      }}
      onClick={this.handleCilck}
      onMouseDown={this.handleDown}
    >
      {React.cloneElement(this.props.children, { className: 'controlled' })}
      {HANDLE_DOTS.map(item => (
        <div
          key={item.className}
          className={`${CLASSNAME.DOT} ${item.className}`}
          onMouseDown={this.handleDown}
          data-x={item.x || 1}
          data-y={item.y || 1}
        />
      ))}
    </div>
  );
}

export default DomController;
