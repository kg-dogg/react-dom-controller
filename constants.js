export const CLASSNAME = {
  CONTROLLER: 'controller',
  DOT: 'dot',
  DIR: {
    EMPTY: '',
    TOP: 'top',
    RIGHT: 'right',
    BOTTOM: 'bottom',
    LEFT: 'left',
    TOP_LEFT: 'top-left',
    TOP_RIGHT: 'top-right',
    BOTTOM_LEFT: 'bottom-left',
    BOTTOM_RIGHT: 'bottom-right',
  },
};

export const HANDLE_DOTS = [
  { className: CLASSNAME.DIR.TOP, y: -1 },
  { className: CLASSNAME.DIR.RIGHT },
  { className: CLASSNAME.DIR.BOTTOM },
  { className: CLASSNAME.DIR.LEFT, x: -1 },
  { className: CLASSNAME.DIR.TOP_LEFT, x: -1, y: -1 },
  { className: CLASSNAME.DIR.TOP_RIGHT, y: -1 },
  { className: CLASSNAME.DIR.BOTTOM_LEFT, x: -1 },
  { className: CLASSNAME.DIR.BOTTOM_RIGHT },
];
