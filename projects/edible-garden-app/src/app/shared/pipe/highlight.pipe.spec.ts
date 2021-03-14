import { EgHighlightPipe } from './highlight.pipe';

describe('HighlightPipe', () => {
  const pipe = new EgHighlightPipe();

  it('matches a character and wraps it into a span with a class', () => {
    expect(pipe.transform('abc', 'b')).toBe(
      "a<span class='eg-highlight'>b</span>c"
    );
  });
  it('matches multiple characters case-insensitive and wraps it into a span with a class', () => {
    expect(pipe.transform('abc', 'Bc')).toBe(
      "a<span class='eg-highlight'>bc</span>"
    );
  });
  // it('can handle no searchExpr gracefully', () => {
  //   expect(pipe.transform('abc', undefined)).toBe('abc');
  // });
  it('can handle no match gracefully', () => {
    expect(pipe.transform('abc', 'x')).toBe('abc');
  });
  it('does not match for whitespace in searchexpr', () => {
    expect(pipe.transform('abc', 'a b')).toBe('abc');
  });
  it('includes whitespace in matching', () => {
    expect(pipe.transform('a bc', 'a b')).toBe(
      "<span class='eg-highlight'>a b</span>c"
    );
  });
});
