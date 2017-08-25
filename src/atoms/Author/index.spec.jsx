import React from 'react';
import renderer from 'react-test-renderer';
import Author from './';

describe('Author', () => {
  it('mount success', () => {
    const comp = renderer
      .create(<Author name="test" time={new Date().getTime()} />)
      .toJSON();
    expect(comp).toMatchSnapshot();
  });
});
