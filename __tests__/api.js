import fetchReddit from '../src/api';

describe('fetch reddit', () => {
  beforeEach(() => {
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
  });
  it('asyn fetch', async () => {
    const res = await fetchReddit('/r/reddit');
    console.log(res);
    expect(res.ok).toBe(true);
    expect(res.id).toBe(1);
    expect(res.url).toBe(`https://www.reddit.com/r/reddit.json`);
  });
});
