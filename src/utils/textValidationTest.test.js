import { isInputValid } from './textValidation';

describe('Input validation', () => {
  it('checks if valid string passes', () => {
    const input = 'Iam valid input.';

    const result = isInputValid(input);

    expect(result).toBeTruthy();
  });

  it('checks if string surrounded by white spaces passes', () => {
    const input = '    I  a  m      v a l .../// i d .,,123456 too    ';

    const result = isInputValid(input);

    expect(result).toBeTruthy();
  });

  it('checks if empty string doesn\'t pass', () => {
    const input = '';

    const result = isInputValid(input);

    expect(result).toBeFalsy();
  });

  it('checks if string which contains only white spaces doesn\'t pass', () => {
    const input = '            ';

    const result = isInputValid(input);

    expect(result).toBeFalsy();
  });
});
