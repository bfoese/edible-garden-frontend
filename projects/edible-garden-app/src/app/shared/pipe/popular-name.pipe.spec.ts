import { PopularNamePipe } from './popular-name.pipe';

describe('PopularNamePipe', () => {
  const pipe = new PopularNamePipe();

  it('transforms "Möhre;Karotte;Rüebli" to "Möhre"', () => {
    expect(pipe.transform('Möhre;Karotte')).toBe('Möhre');
  });

  it('transforms "Erbse" to "Erbse"', () => {
    expect(pipe.transform('Erbse')).toBe('Erbse');
  });

  it('transforms "Lauch;Porree" to "Lauch"', () => {
    expect(pipe.transform('Lauch;Porree')).toBe('Lauch');
  });

  it('handles empty and null gracefully', () => {
    expect(pipe.transform('')).toBe('');
    expect(pipe.transform(null)).toBe(null);
  });
});
