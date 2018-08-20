import { isInputValid } from './textValidation';

export const getInputClasses = (text) => {
  return 'form-control'  + (!isInputValid(text) ? ' is-invalid' : '');
};
