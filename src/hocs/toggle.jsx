import React from 'react';

/*
mount a component if active, or null
*/
export function toggle(Comp) {
  function Toggle({ active }) {
    if (!active) {
      return null;
    }
    return <Comp />
  }
  return Toggle;
}

/*
mount a component with some active props, or mount primary
*/
export function toggleWith(Comp, props) {
  return function ToggleWith({ active, ...rest }) {
    if (!active) {
      return <Comp {...rest} />;
    }
    return <Comp {...rest} {...props} />;
  };
}
