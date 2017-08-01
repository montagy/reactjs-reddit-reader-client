import React from 'react';
import { shallow } from 'enzyme';
import { Button } from '../';

describe('Button', () => {
  it('only text', () => {
    shallow(<Button>Hello</Button>);
  });
});
