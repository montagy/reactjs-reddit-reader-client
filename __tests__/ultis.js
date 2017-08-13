import { hoursAgo } from '../src/utils.js';

describe('how many Hours Ago', () => {
  it('now should be 0', () => {
    var now = new Date().getTime();
    expect(hoursAgo(now)).toBe(0);
  });
});
