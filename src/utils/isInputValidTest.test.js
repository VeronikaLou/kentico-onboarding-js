import { isInputValid } from './isInputValid';

describe('Input validation', () => {
  [
    'I am valid input.',
    '    I  a  m      v a l .../// i d .,,123456 too    '
  ].forEach(input =>
    it(`${input} should pass`, () => {
      const result = isInputValid(input);

      expect(result).toBeTruthy();
    }));

  [
    '            ',
    '',
    0,
    null,
    undefined
  ].forEach(input =>
    it(`${input} shouldn't pass`, () => {
      const result = isInputValid(input);

      expect(result).toBeFalsy();
    }));
});
