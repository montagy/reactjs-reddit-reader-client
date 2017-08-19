import RedditsInDisk from '../src/global';

describe('Singleton', () => {
  beforeEach(() => {
    global.localStorage = {
      getItem: jest.fn().mockReturnValue('get item'),
      setItem: jest.fn().mockReturnValue('set item'),
    };
  })
  it('instance of RedditsInDisk', () => {
    const r = new RedditsInDisk();
    expect(r instanceof RedditsInDisk).toBe(true);
  });
});
