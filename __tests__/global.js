import global from '../src/global';

describe('Singleton', () => {
  it('only once', () => {
    global.setSize(3);
    expect(global.getSize()).toBe(3);
  });
  it('getSize should be 3', () => {
    const g = require('../src/global').default;
    expect(g.getSize()).toBe(3);
  });
});
