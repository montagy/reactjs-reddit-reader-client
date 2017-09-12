import React from 'react';

export default function toggle(Comp) {
  function Toggle({ active }) {
    if (!active) {
      return null;
    }
    return <Comp />
  }
  return Toggle;
}
