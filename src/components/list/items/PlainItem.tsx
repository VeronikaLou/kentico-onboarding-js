import * as React from 'react';
import * as PropTypes from 'prop-types';
import { ListError } from '../../../models/ListError';
import { ItemError } from '../../../containers/list/items/ItemError';
import { ItemLoader } from './ItemLoader';

export interface IPlainItemOwnProps {
  readonly index: number;
  readonly id: Uuid;
}

export interface IPlainItemDispatchProps {
  readonly startEditing: () => void;
}

export interface IPlainItemStateProps {
  readonly text: string;
  readonly isUpdating: boolean;
  readonly error?: ListError;
}

type PlainItemProps = IPlainItemDispatchProps & IPlainItemOwnProps & IPlainItemStateProps;

export class PlainItem extends React.PureComponent<PlainItemProps> {
  static displayName = 'PlainItem';
  static propTypes = {
    index: PropTypes.number.isRequired,
    id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    isUpdating: PropTypes.bool.isRequired,
    error: PropTypes.object,
    startEditing: PropTypes.func.isRequired,
  };

  _showError = (): JSX.Element | null =>
    this.props.error
      ? (
        <ItemError
          id={this.props.id}
          error={this.props.error}
        />
      )
      : null;

  render(): JSX.Element {
    const textClass = `float-right col
      ${this.props.isUpdating || this.props.error ? 'text-black-50' : 'text-dark'}`;

    return (
      <div
        onClick={this.props.error ? undefined : this.props.startEditing}
        className={textClass}
      >
        {this.props.index}.&nbsp;{this.props.text}
        {this.props.isUpdating && <ItemLoader />}
        {this._showError()}
      </div>
    );
  }
}
