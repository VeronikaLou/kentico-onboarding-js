import React, { PureComponent } from 'react';
import classNames from 'classnames/bind';
import { isInputValid } from '../utils/textValidation';

export class NewItem extends PureComponent {
  state = {
    text: '',
    isFocused: false
  };

  _changeInput = (event) =>
    this.setState({ text: event.target.value });

  _addItem = () => {
    this.props.addItem(this.state.text);
    this.setState(() => ({ text: '' }));
  };

  _changeFocus = () =>
    this.setState(prevState => ({ isFocused: !prevState.isFocused }));

  render() {
    const { text, isFocused } = this.state;
    const isValid = isInputValid(text);
    const inputClass = classNames('form-control', {
      'is-invalid': isFocused && !isValid
    });
    const title = !isValid ? 'Insert text.' : undefined;

    return (
      <li className="list-group-item">
        <div className="input-group col-sm-5">
          <input
            type="text"
            className={inputClass}
            value={text}
            onChange={this._changeInput}
            onFocus={this._changeFocus}
            onBlur={this._changeFocus}
          />
          <button
            type="button"
            className="btn btn-outline-secondary btn-sm"
            onClick={this._addItem}
            disabled={!isValid}
            title={title}
          >
            Add
          </button>
        </div>
      </li>
    );
  }
}
