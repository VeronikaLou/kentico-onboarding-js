import React, { PureComponent } from 'react';
import { isInputValid } from '../utils/textValidation';
import { getInputClasses } from '../utils/inputClasses';

export class EditedItem extends PureComponent {
  state = {
    text: this.props.item.text,
  };

  editText = (event) => {
    this.setState({ text: event.target.value });
  };

  showButtons = () => {
    const {
      deleteItem, cancelEditing, saveChanges
    } = this.props;
    const { id } = this.props.item;
    const isValid = isInputValid(this.state.text);

    return (
      <span>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => saveChanges(id, this.state.text)}
          disabled={!isValid}
          title={!isValid ? 'Insert text.' : ''}
        >
          Save
        </button>
        <button
          type="button"
          className="btn btn-outline-secondary"
          onClick={() => cancelEditing(id)}
        >
          Cancel
        </button>
        <button
          type="button"
          className="btn btn-danger"
          onClick={() => deleteItem(id)}
        >
          Delete
        </button>
      </span>
    );
  };

  render() {
    const { index } = this.props;
    const { text } = this.props.item;

    return (
      <div className="input-group col-sm-8">
        <div className="input-group-prepend">
          <span className="input-group-text">{index}.</span>
        </div>
        <input
          type="text"
          defaultValue={text}
          className={getInputClasses(this.state.text)}
          onChange={this.editText}
        />
        {this.showButtons()}
      </div>
    );
  }
}
