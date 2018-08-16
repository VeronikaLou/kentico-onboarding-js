import React, { PureComponent } from 'react';
import { isInputValid } from '../utils/textValidation';

export class AddItem extends PureComponent {
  state = { text: '' };

  changeInput = (event) => {
    this.setState({ text: event.target.value });
  };

  addItem = () => {
    const { text } = this.state;
    const { addItem } = this.props;
    addItem(text);
    this.setState(() => ({ text: '' }));
  };

  render() {
    const { text } = this.state;
    const isValid = isInputValid(text);
    const inputClass = 'form-control' + (!isValid ? ' is-invalid' : '');

    return (
      <li className="list-group-item">
        <div className="input-group col-sm-5">
          <input
            type="text"
            className={inputClass}
            value={text}
            onChange={this.changeInput}
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
