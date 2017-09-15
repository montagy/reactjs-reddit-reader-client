import fetchReddit, { raceTimeout, fetchAllReddits, isValidReddit } from './';

const timeResolve = time =>
  new Promise(resolve => {
    setTimeout(function() {
      resolve(time);
    }, time);
  });
describe('Api', () => {
  const mockXHR = {
    open: jest.fn(),
    send: jest.fn(),
  };
  beforeEach(() => {
    window.XMLHttpRequest = jest.fn(() => mockXHR);
  });
  it('fetch reddit success', () => {
    expect.assertions(1);
    const result = fetchReddit({});
    mockXHR.status = 200;
    mockXHR.readyState = 4;
    mockXHR.responseText = JSON.stringify('hello');
    mockXHR.onreadystatechange();
    return result.then(res => {
      expect(res).toBe('hello');
    });
  });
  it('fetch reddit timeout', () => {
    expect.assertions(2);
    const result = fetchReddit(1);
    mockXHR.ontimeout();
    return result.catch(e => {
      expect(e.toString()).toMatch('Error: 网络链接超时，请检查网络或者设置更长的超时时间');
      expect(e.code).toBe(998);
    });
  });
  it('fetch reddit onerror', () => {
    expect.assertions(2);
    const result = fetchReddit(1);
    mockXHR.onerror();
    return result.catch(e => {
      expect(e.toString()).toMatch('Error: 网络链接错误');
      expect(e.code).toBe(999);
    });
  });
  it('race timtout', () => {
    return raceTimeout([timeResolve(100), timeResolve(200)], 300).then(time => {
      expect(time).toBe(100);
    });
  });
  it('race fail', () => {
    expect.assertions(1);
    return raceTimeout([timeResolve(300), timeResolve(200)], 100).catch(e => {
      expect(e).toBe('timeout: 100ms');
    });
  });
  it('race empty will fail', () => {
    expect.assertions(1);
    return raceTimeout([], 100).catch(e => {
      expect(e).toBe('timeout: 100ms');
    });
  });
  it('fetch a list of reddits', () => {
    fetchAllReddits(['a', 'b', 'c']);
    expect(window.XMLHttpRequest.mock.calls.length).toBe(3);
  });
  it('promise all waiting for all', () => {
    expect.assertions(1);
    return Promise.all([
      Promise.resolve('a'),
      Promise.resolve('b'),
      Promise.resolve('c'),
    ]).then(res => {
      expect(res.join('')).toBe('abc');
    });
  });
  it('is valid sub reddit', () => {
    expect.assertions(1);
    const result = isValidReddit('valid');
    mockXHR.readyState = 4;
    mockXHR.status = 302;
    mockXHR.onreadystatechange();
    return result.catch(res => {
      expect(res).toBe(false);
    });
  });
});
