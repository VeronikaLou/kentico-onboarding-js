import * as React from 'react';
import * as PropTypes from 'prop-types';
import { PulseLoader } from 'react-spinners';
import { ListError } from '../models/ListError';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faRedo, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export interface IPlainItemOwnProps {
  readonly index: number;
  readonly id: Uuid;
  readonly error: ListError;
}

export interface IPlainItemDispatchProps {
  readonly startEditing: () => void;
  readonly retry: () => void;
  readonly closeError: () => void;
}

export interface IPlainItemStateProps {
  readonly text: string;
  readonly isUpdating: boolean;
}

type PlainItemProps = IPlainItemOwnProps & IPlainItemDispatchProps & IPlainItemStateProps;

export class PlainItem extends React.PureComponent<PlainItemProps> {
  static displayName = 'PlainItem';
  static propTypes = {
    index: PropTypes.number.isRequired,
    id: PropTypes.string.isRequired,
    startEditing: PropTypes.func.isRequired,
    text: PropTypes.string.isRequired,
    isUpdating: PropTypes.bool.isRequired,
    error: PropTypes.object,
    retry: PropTypes.func,
    close: PropTypes.func,
  };

  _showLoader = (): JSX.Element | null =>
    this.props.isUpdating
      ? (
        <PulseLoader
          color={'#007bff'}
          size={10}
          className={'float-right'}
        />
      )
      : null;

  _showError = (): JSX.Element | null =>
    !this.props.error
      ? null
      : (
        <div
          className={'float-right text-danger font-weight-bold'}
        >{this.props.error.message}
          <span
            onClick={this.props.retry}
            className="btn"
          >
            <FontAwesomeIcon icon="redo" />
          </span>
          <span
            onClick={this.props.closeError}
            className="btn"
          >
            <FontAwesomeIcon icon="times" />
          </span>
        </div>
      );

  _startEditing = (): void => {
    if (!this.props.error)
      return this.props.startEditing();
  };

  render(): JSX.Element {
    library.add(faRedo);
    library.add(faTimes);
    const textClass = 'float-right col ' +
      (this.props.isUpdating || this.props.error
        ? 'text-black-50'
        : 'text-dark');

    return (
      <div
        onClick={this._startEditing}
        className={textClass}
      >
        {this.props.index}.&nbsp;{this.props.text}
        {this._showLoader()}
        {this._showError()}
      </div>
    );
  }
}
