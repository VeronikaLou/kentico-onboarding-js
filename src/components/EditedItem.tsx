import * as React from 'react';
import * as classNames from 'classnames';
import * as PropTypes from 'prop-types';
import { isInputValid } from '../utils/isInputValid';
import { ListItem } from '../models/ListItem';

export interface IEditedItemOwnProps {
  readonly index: string;
  readonly item: ListItem;
}

export interface IEditedItemDispatchToProps {
  readonly saveChanges: (text: string) => void;
  readonly cancelEditing: () => void;
  readonly deleteItem: () => void;
}

type EditedItemProps = IEditedItemOwnProps & IEditedItemDispatchToProps;

export class EditedItem extends React.PureComponent<EditedItemProps> {
  static displayName = 'EditedItem';

  static propTypes = {
    index: PropTypes.number.isRequired,
    item: PropTypes.instanceOf(ListItem).isRequired,
    saveChanges: PropTypes.func.isRequired,
    cancelEditing: PropTypes.func.isRequired,
    deleteItem: PropTypes.func.isRequired,
  };

  state = {
    text: this.props.item.text,
  };

  _editText = (event: React.ChangeEvent<HTMLInputElement>): void => {
    event.persist();
    this.setState(() => ({text: event.target.value}));
  };

  _saveChanges = (): void => this.props.saveChanges(this.state.text);

  _showButtons = (): JSX.Element => {
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
          onClick={this.props.cancelEditing}
        >
          Cancel
        </button>
        <button
          className="btn btn-danger"
          type="button"
          onClick={this.props.deleteItem}
        >
          Delete
        </button>
      </div>
    );
  };

  render(): JSX.Element {
    const {index} = this.props;
    const {text} = this.state;
    const inputClass = classNames('form-control', {
      'is-invalid': !isInputValid(text),
    });

    return (
      <div className="input-group col-sm-8">
        <div className="input-group-prepend">
          <span className="input-group-text">{index}.</span>
        </div>
        <input
          className={inputClass}
          type="text"
          value={text}
          onChange={this._editText}
        />
        {this._showButtons()}
      </div>
    );
  }
}
