import { HrefPipe } from './href.pipe';

describe('HrefPipe', () => {
  let pipe: HrefPipe;

  beforeEach(() => {
    pipe = new HrefPipe();
  });

  it('should be created', () => {
    expect(pipe).toBeTruthy();
  });

  it('should not transform value if it starts with http(s)://', () => {
    const value = 'http://foo.bar';
    const piped = pipe.transform(value);

    expect(piped).toEqual(value);
  });

  it('should append http:// to value if it doesn\'t start with http(s)://', () => {
    const value = 'foo.bar';
    const piped = pipe.transform(value);

    expect(piped).toEqual(`http://${value}`);
  });
});
