import { isInputValid } from './textValidation';

describe('Input validation', () => {
  it('check validation correctly - valid input 1', () => {
    const input = 'Iam valid input.';

    const result = isInputValid(input);

    expect(result).toBeTruthy();
  });

  it('check validation correctly - valid input 2', () => {
    const input = '    I  a  m      v a l .../// i d .,,123456 too';

    const result = isInputValid(input);

    expect(result).toBeTruthy();
  });

  it('check validation correctly - invalid input 1', () => {
    const input = '';

    const result = isInputValid(input);

    expect(result).toBeFalsy();
  });

  it('check validation correctly - invalid input 2', () => {
    const input = '            ';

    const result = isInputValid(input);

    expect(result).toBeFalsy();
  });
});
