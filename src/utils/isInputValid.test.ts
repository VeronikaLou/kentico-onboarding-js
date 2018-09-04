import { isInputValid } from './isInputValid';

describe('Input validation', () => {
  [
    'I am valid input.',
    '    I  a  m      v a l .../// i d .,,123456 too    ',
  ].forEach(input =>
    it(`${input} should be valid`, () => {
      const result = isInputValid(input);

      expect(result).toBeTruthy();
    }));

  [
    '            ',
    '',
  ].forEach(input =>
    it(`${input} shouldn't be valid`, () => {
      const result = isInputValid(input);

      expect(result).toBeFalsy();
    }));
});
