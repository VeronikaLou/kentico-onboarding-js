import React, { PureComponent } from 'react';
import classNames from 'classnames/bind';
import { isInputValid } from '../utils/textValidation';

export class EditedItem extends PureComponent {
  state = {
    text: this.props.item.text,
  };

  editText = (event) => {
    this.setState({ text: event.target.value });
  };

  deleteItem = () => {
    this.props.deleteItem(this.props.item.id);
  };

  saveChanges = () => {
    this.props.saveChanges(this.props.item.id, this.state.text);
  };

  cancelEditing = () => {
    this.props.cancelEditing(this.props.item.id);
  };

  showButtons = () => {
    const isValid = isInputValid(this.state.text);

    return (
      <span>
        <button
          type="button"
          className="btn btn-primary"
          onClick={this.saveChanges}
          disabled={!isValid}
          title={!isValid ? 'Insert text.' : ''}
        >
          Save
        </button>
        <button
          type="button"
          className="btn btn-outline-secondary"
          onClick={this.cancelEditing}
        >
          Cancel
        </button>
        <button
          type="button"
          className="btn btn-danger"
          onClick={this.deleteItem}
        >
          Delete
        </button>
      </span>
    );
  };

  render() {
    const { index } = this.props;
    const { text } = this.props.item;
    const inputClass = classNames('form-control', {
      'is-invalid': !isInputValid(this.state.text)
    });

    return (
      <div className="input-group col-sm-8">
        <div className="input-group-prepend">
          <span className="input-group-text">{index}.</span>
        </div>
        <input
          type="text"
          defaultValue={text}
          className={inputClass}
          onChange={this.editText}
        />
        {this.showButtons()}
      </div>
    );
  }
}
