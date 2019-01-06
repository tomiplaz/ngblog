import { HeadPipe } from './head.pipe';

fdescribe('HeadPipe', () => {
  let pipe: HeadPipe;

  beforeEach(() => {
    pipe = new HeadPipe();
  });

  it('should be created', () => {
    expect(pipe).toBeTruthy();
  });

  it('should not transform value if it is undefined', () => {
    const value = undefined;
    const piped = pipe.transform(value);

    expect(piped).toBeUndefined();
  });

  it('should not transform value if it is not too long (no arguments)', () => {
    const value = 'foobarbaz';
    const piped = pipe.transform(value);

    expect(piped).toEqual(value);
  });

  it('should not transform value if it is not too long (n argument)', () => {
    const n = 12;
    const value = 'foobarbaz';
    const piped = pipe.transform(value, n);

    expect(piped).toEqual(value);
  });

  it('should not transform value if it is not too long (n and extra arguments)', () => {
    const n = 12;
    const extra = 5;
    const value = 'foobarbaz';
    const piped = pipe.transform(value, n, extra);

    expect(piped).toEqual(value);
  });

  it('should transform value if it is too long (no arguments)', () => {
    const value = 'foobarbazbatfaz';
    const piped = pipe.transform(value);

    expect(piped).toEqual('foobarbazb...');
  });

  it('should transform value if it is too long (n argument)', () => {
    const n = 5;
    const value = 'foobarbaz';
    const piped = pipe.transform(value, n);

    expect(piped).toEqual('fooba...');
  });

  it('should transform value if it is too long (n and extra argument)', () => {
    const n = 6;
    const extra = 2;
    const value = 'foobarbaz';
    const piped = pipe.transform(value, n, extra);

    expect(piped).toEqual('foobar...');
  });
});
