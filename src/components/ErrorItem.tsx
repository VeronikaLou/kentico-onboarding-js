import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as React from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faRedo, faTimes } from '@fortawesome/free-solid-svg-icons';
import * as PropTypes from 'prop-types';
import { ListError } from '../models/ListError';
import { IListAction } from '../actions/types/IListAction';

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

export class ErrorItem extends React.PureComponent<ErrorItemProps> {
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
    library.add(faRedo);
    library.add(faTimes);

    return (
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
          onClick={this._close}
          className="btn"
        >
          <FontAwesomeIcon icon="times" />
        </span>
      </div>
    );
  }
}
