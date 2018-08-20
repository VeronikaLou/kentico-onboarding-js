import React, { PureComponent } from 'react';
import classNames from 'classnames/bind';
import { isInputValid } from '../utils/textValidation';

export class NewItem extends PureComponent {
  state = {
    text: '',
    isFocused: false
  };

  changeInput = (event) => {
    this.setState({ text: event.target.value });
  };

  addItem = () => {
    this.props.addItem(this.state.text);
    this.setState(() => ({ text: '' }));
  };

  changeFocus = () => {
    this.setState(prevState => ({ isFocused: !prevState.isFocused }));
  };

  render() {
    const { text, isFocused } = this.state;
    const isValid = isInputValid(text);
    const inputClass = classNames('form-control', {
      'is-invalid': isFocused && !isValid
    });

    return (
      <li className="list-group-item">
        <div className="input-group col-sm-5">
          <input
            type="text"
            className={inputClass}
            value={text}
            onChange={this.changeInput}
            onFocus={this.changeFocus}
            onBlur={this.changeFocus}
          />
          <button
            type="button"
            className="btn btn-outline-secondary btn-sm"
            onClick={this.addItem}
            disabled={!isValid}
            title={!isValid ? 'Insert text.' : ''}
          >
            Add
          </button>
        </div>
      </li>
    );
  }
}
