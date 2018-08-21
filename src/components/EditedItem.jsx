import React, { PureComponent } from 'react';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import { isInputValid } from '../utils/isInputValid';

export class EditedItem extends PureComponent {
  static displayName = 'EditedItem';

  static propTypes = {
    index: PropTypes.number.isRequired,
    item: PropTypes.shape({
      text: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
    }),
    saveChanges: PropTypes.func.isRequired,
    cancelEditing: PropTypes.func.isRequired,
    deleteItem: PropTypes.func.isRequired,
  };

  state = {
    text: this.props.item.text,
  };

  _editText = (event) => this.setState({ text: event.target.value });

  _deleteItem = () => this.props.deleteItem(this.props.item.id);

  _saveChanges = () => this.props.saveChanges(this.props.item.id, this.state.text);

  _cancelEditing = () => this.props.cancelEditing(this.props.item.id);

  _showButtons = () => {
    const isValid = isInputValid(this.state.text);
    const saveButtonTitle = !isValid ? 'Insert text.' : undefined;

    return (
      <div
        className="input-group-append"
        id="button-addon4"
      >
        <button
          className="btn btn-primary"
          type="button"
          onClick={this._saveChanges}
          disabled={!isValid}
          title={saveButtonTitle}
        >
          Save
        </button>
        <button
          className="btn btn-outline-secondary"
          type="button"
          onClick={this._cancelEditing}
        >
          Cancel
        </button>
        <button
          className="btn btn-danger"
          type="button"
          onClick={this._deleteItem}
        >
          Delete
        </button>
      </div>
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
          className={inputClass}
          type="text"
          defaultValue={text}
          onChange={this._editText}
        />
        {this._showButtons()}
      </div>
    );
  }
}
