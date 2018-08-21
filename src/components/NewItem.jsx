import React, { PureComponent } from 'react';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import { isInputValid } from '../utils/isInputValid';

export class NewItem extends PureComponent {
  static propTypes = {
    addItem: PropTypes.func
  };

  state = {
    text: '',
    isFocused: false
  };

  _changeInput = (event) => this.setState({ text: event.target.value });

  _addItem = () => {
    this.props.addItem(this.state.text);
    this.setState(() => ({ text: '' }));
  };

  _changeFocus = () => this.setState(prevState => ({ isFocused: !prevState.isFocused }));

  render() {
    const { text, isFocused } = this.state;
    const isValid = isInputValid(text);
    const inputClass = classNames('form-control', {
      'is-invalid': isFocused && !isValid
    });
    const addButtonTitle = !isValid ? 'Insert text.' : undefined;

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
          <div className="input-group-append">
            <button
              type="button"
              className="btn btn-outline-secondary btn-sm"
              id="button-addon2"
              onClick={this._addItem}
              disabled={!isValid}
              title={addButtonTitle}
            >
              Add
            </button>
          </div>
        </div>
      </li>
    );
  }
}
