import * as React from 'react';
import { ChangeEvent } from 'react';
import * as classNames from 'classnames';
import *as PropTypes from 'prop-types';
import { isInputValid } from '../utils/isInputValid';
import { ILoadedItem } from '../models/ILoadedItem';

export interface INewItemDispatchProps {
  readonly addItem: (id: Uuid, text: string) => void;
}

interface INewItemState {
  readonly text: string;
  readonly isFocused: boolean;
}

export class NewItem extends React.PureComponent<INewItemDispatchProps, INewItemState> {
  static displayName = 'NewItem';

  static propTypes = {
    addItem: PropTypes.func.isRequired,
  };

  state = {
    text: '',
    isFocused: false,
  };

  _changeInput = (event: ChangeEvent<HTMLInputElement>): void => {
    event.persist();
    this.setState(() => ({text: event.target.value}));
  };

  _addItem = (): void => {
    const item = {id: '00000000-0000-0000-0000-000000000003', text: this.state.text};

    fetch('v1/List/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(item),
    })
      .then(response => response.json())
      .then((loadedItem: ILoadedItem) => this.props.addItem(loadedItem.id, loadedItem.text))
      .then(() => this.setState(() => ({text: ''})));
  };

  _changeFocus = (): void => this.setState(prevState => ({isFocused: !prevState.isFocused}));

  render(): JSX.Element {
    const {text, isFocused} = this.state;
    const isValid: boolean = isInputValid(text);
    const inputClass: string = classNames('form-control', {
      'is-invalid': isFocused && !isValid,
    });
    const addButtonTitle: string | undefined = !isValid ? 'Insert text.' : undefined;

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
