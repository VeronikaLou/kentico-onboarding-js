import * as React from 'react';
import * as classNames from 'classnames';
import * as PropTypes from 'prop-types';
import { isInputValid } from '../utils/isInputValid';
import { IListAction } from '../actions/types/IListAction';

export interface IEditedItemOwnProps {
  readonly index: number;
  readonly id: Uuid;
}

export interface IEditedItemStateProps {
  readonly text: string;
}

export interface IEditedItemDispatchProps {
  readonly dispatchSaveChanges: (text: string, backupText: string) => Promise<IListAction>;
  readonly cancelEditing: () => void;
  readonly deleteItem: () => void;
}

export interface IEditedItemState {
  readonly text: string;
}

export interface IEditedItemMergeProps extends IEditedItemOwnProps, IEditedItemDispatchProps, IEditedItemStateProps {
  readonly saveChanges: (text: string) => void;
}

export class EditedItem extends React.PureComponent<IEditedItemMergeProps, IEditedItemState> {
  static displayName = 'EditedItem';

  static propTypes = {
    index: PropTypes.number.isRequired,
    id: PropTypes.string.isRequired,
    saveChanges: PropTypes.func.isRequired,
    cancelEditing: PropTypes.func.isRequired,
    deleteItem: PropTypes.func.isRequired,
    dispatchSaveChanges: PropTypes.func,
    text: PropTypes.string.isRequired,
  };

  state = {
    text: this.props.text,
  };

  _editText = (event: React.ChangeEvent<HTMLInputElement>): void => {
    event.persist();
    this.setState(() => ({text: event.target.value}));
  };

  _saveChanges = (): void => this.props.saveChanges(this.state.text);

  _showButtons = (): JSX.Element => {
    const isValid: boolean = isInputValid(this.state.text);
    const saveButtonTitle: string | undefined = !isValid ? 'Insert text.' : undefined;

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
    const inputClass: string = classNames('form-control', {
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
