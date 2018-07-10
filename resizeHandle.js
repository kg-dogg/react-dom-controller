import { CLASSNAME } from './constants';

export const getRect = ({
  rect, coords, dir, minConstraints,
}) => {
  const width = Math.max(minConstraints.width, rect.width + (coords.x * dir.x));
  const height = Math.max(minConstraints.height, rect.height + (coords.y * dir.y));

  switch (dir.name) {
  case CLASSNAME.DIR.LEFT:
  case CLASSNAME.DIR.RIGHT:
    return { width };
  case CLASSNAME.DIR.TOP:
  case CLASSNAME.DIR.BOTTOM:
    return { height };
  case CLASSNAME.DIR.TOP_LEFT:
  case CLASSNAME.DIR.TOP_RIGHT:
  case CLASSNAME.DIR.BOTTOM_LEFT:
  case CLASSNAME.DIR.BOTTOM_RIGHT:
    return { width, height };
  default:
    return {};
  }
};

export const getPosition = ({
  rectPos, coords, dir, minConstraints, rect,
}) => {
  const moveLimit = {
    x: rect.width - minConstraints.width,
    y: rect.height - minConstraints.height,
  };
  const left = rectPos.left - (Math.min(coords.x, moveLimit.x) * dir.x);
  const top = rectPos.top - (Math.min(coords.y, moveLimit.y) * dir.y);
  switch (dir.name) {
  case CLASSNAME.DIR.LEFT:
  case CLASSNAME.DIR.BOTTOM_LEFT:
    return { left };
  case CLASSNAME.DIR.TOP:
  case CLASSNAME.DIR.TOP_RIGHT:
    return { top };
  case CLASSNAME.DIR.TOP_LEFT:
    return { left, top };
  case CLASSNAME.DIR.RIGHT:
  case CLASSNAME.DIR.BOTTOM:
  case CLASSNAME.DIR.BOTTOM_RIGHT:
  default:
    return {};
  }
};
