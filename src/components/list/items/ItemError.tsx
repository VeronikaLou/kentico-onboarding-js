import * as React from 'react';
import * as PropTypes from 'prop-types';
import { ListError } from '../../../models/ListError';
import { IListAction } from '../../../actions/types/IListAction';
import { Retry } from '../../icons/retry';
import { Close } from '../../icons/close';

export interface IItemErrorStateProps {
  readonly backupText: string;
}

export interface IItemErrorOwnProps {
  readonly id: Uuid;
  readonly error: ListError;
}

export interface IItemErrorDispatchProps {
  readonly retry: () => void;
  readonly closeError: (backupText: string) => IListAction;
}

type ItemErrorProps = IItemErrorOwnProps & IItemErrorDispatchProps & IItemErrorStateProps;

export class ItemError extends React.PureComponent<ItemErrorProps> {
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
      <div className="alert-danger float-right text-danger font-weight-bold">
        {this.props.error.message}
        <div className="btn-group">
          <button
            onClick={this.props.retry}
            className="btn btn-outline-danger border-0"
          >
            <Retry />
          </button>
          <button
            onClick={this._close}
            className="btn btn-outline-danger border-0"
          >
            <Close />
          </button>
        </div>
      </div>
    );
  }
}
