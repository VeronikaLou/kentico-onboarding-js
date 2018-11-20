import * as React from 'react';
import * as PropTypes from 'prop-types';
import { ListError } from '../models/ListError';
import { IListAction } from '../actions/types/IListAction';
import { Retry } from '../icons/retry';
import { Close } from '../icons/close';

export interface IErrorItemStateProps {
  readonly backupText: string;
}

export interface IErrorItemOwnProps {
  readonly id: Uuid;
  readonly error: ListError;
}

export interface IErrorItemDispatchProps {
  readonly retry: () => void;
  readonly closeError: (backupText: string) => IListAction;
}

type ErrorItemProps = IErrorItemOwnProps & IErrorItemDispatchProps & IErrorItemStateProps;

export class ItemError extends React.PureComponent<ErrorItemProps> {
  static displayName = 'ErrorItem';
  static propTypes = {
    error: PropTypes.object.isRequired,
    retry: PropTypes.func.isRequired,
    closeError: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
    backupText: PropTypes.string.isRequired,
  };

  _close = () => {
    this.props.closeError(this.props.backupText);
  };

  render(): JSX.Element {
    return (
      <div
        className={'float-right text-danger font-weight-bold'}
      >{this.props.error.message}
        <span
          onClick={this.props.retry}
          className="btn"
        >
          <Retry />
        </span>
        <span
          onClick={this._close}
          className="btn"
        >
          <Close />
        </span>
      </div>
    );
  }
}
