import { getInputClasses } from './inputClasses';

describe('Input classes', () => {
  it('check if adds is-invalid', () => {
    const text = '         ';

    const classes = getInputClasses(text);
    const result = classes.includes('is-invalid');

    expect(result).toBeTruthy();
  });

  it('check if doesn\'t add is-invalid', () => {
    const text = 'i am is correct input';

    const classes = getInputClasses(text);
    const result = classes.includes('is-invalid');

    expect(result).toBeFalsy();
  });
});
