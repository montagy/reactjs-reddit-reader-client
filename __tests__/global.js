import global from '../src/global';

describe('Singleton', () => {
  it('only once', () => {
    global.storage = 3;
    expect(global.storage).toBe(3);
  });
  it('getSize should be 3', () => {
    const g = require('../src/global').default;
    expect(g.storage).toBe(3);
  });
});
