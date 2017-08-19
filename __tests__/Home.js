import React from 'react';
import renderer from 'react-test-renderer';
import App from '../src/App.jsx';
describe('Home', () => {
  beforeEach(() => {
    global.localStorage = jest.fn().mockReturnValue({
      getItem: jest.fn(),
      setItem: jest.fn(),
    });
    global.fetch = jest.fn().mockImplementation(url => {
      return new Promise((resolve, reject) => {
        resolve({
          json: function() {
            return {
              url,
              id: 1,
              ok: true,
            };
          },
        });
      });
    });
  })
  it('snapshot', () => {
    const tree = renderer
      .create(
        <App />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
