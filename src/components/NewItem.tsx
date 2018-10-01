import * as React from 'react';
import { ChangeEvent } from 'react';
import * as classNames from 'classnames';
import *as PropTypes from 'prop-types';
import { isInputValid } from '../utils/isInputValid';
import { IFetchedItem } from '../models/IFetchedItem';

export interface INewItemDispatchProps {
  readonly addItem: (item: IFetchedItem) => void;
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
    fetch('v1/List/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({text: this.state.text}),
    })
      .then(response => response.json())
      .then((fetchedItem: IFetchedItem) => this.props.addItem(fetchedItem))
      .then(() => this.setState(() => ({text: ''})))
      .catch(error => alert(error));
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
