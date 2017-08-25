import fetchReddit from './';

describe('Api', () => {
  const mockXHR = {
    open: jest.fn(),
    send: jest.fn(),
  };
  beforeEach(() => {
    window.XMLHttpRequest = jest.fn(() => mockXHR);
  });
  it('fetch success', () => {
    expect.assertions(1);
    const result = fetchReddit(1);
    mockXHR.status = 200;
    mockXHR.readyState = 4;
    mockXHR.responseText = JSON.stringify('hello');
    mockXHR.onreadystatechange();
    return result.then(res => {
      expect(res).toBe('hello');
    });
  });
  it('fetch timeout', () => {
    expect.assertions(1);
    const result = fetchReddit(1);
    mockXHR.ontimeout();
    return result.catch(e => {
      expect(e.toString()).toMatch('Error: 网络链接超时，请检查网络或者设置更长的超时时间');
    });
  });
});
