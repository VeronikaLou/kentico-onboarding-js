import * as React from 'react';
import * as PropTypes from 'prop-types';
import { PulseLoader } from 'react-spinners';
import { ListError } from '../models/ListError';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faRedo, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IListAction } from '../actions/types/IListAction';

export interface IPlainItemOwnProps {
  readonly index: number;
  readonly id: Uuid;
}

export interface IPlainItemDispatchProps {
  readonly startEditing: () => void;
  readonly dispatchCloseError: (error: ListError, backupText: string) => IListAction | undefined;
  readonly dispatchRetry: (error: ListError) => IListAction;
}

export interface IPlainItemStateProps {
  readonly text: string;
  readonly isUpdating: boolean;
  readonly backupText: string;
  readonly error: ListError;
}

export interface IPlainItemMergeProps extends IPlainItemOwnProps, IPlainItemDispatchProps, IPlainItemStateProps {
  readonly closeError: () => void;
  readonly retry: () => void;
}

export class PlainItem extends React.PureComponent<IPlainItemMergeProps> {
  static displayName = 'PlainItem';
  static propTypes = {
    index: PropTypes.number.isRequired,
    id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    isUpdating: PropTypes.bool.isRequired,
    backupText: PropTypes.string.isRequired,
    error: PropTypes.object,
    startEditing: PropTypes.func.isRequired,
    dispatchRetry: PropTypes.func,
    dispatchCloseError: PropTypes.func,
    retry: PropTypes.func,
    closeError: PropTypes.func,
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
