import * as React from 'react';
import * as PropTypes from 'prop-types';
import { ItemLoader } from './ItemLoader';
import { ListItem } from '../../../models/ListItem';

export interface IPlainItemOwnProps {
  readonly index: number;
  readonly id: Uuid;
}

export interface IPlainItemDispatchProps {
  readonly startEditing: () => void;
}

export interface IPlainItemStateProps {
  readonly item: ListItem;
}

type PlainItemProps = IPlainItemOwnProps & IPlainItemDispatchProps & IPlainItemStateProps;

export class PlainItem extends React.PureComponent<PlainItemProps> {
  static displayName = 'PlainItem';
  static propTypes = {
    index: PropTypes.number.isRequired,
    id: PropTypes.string.isRequired,
    startEditing: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired,
  };

  render(): JSX.Element {
    const textClass = `float-right col mt-1 py-1
      ${this.props.item.isUpdating ? 'text-black-50' : 'text-dark'}`;

    return (
      <div
        onClick={this.props.startEditing}
        className={textClass}
      >
        {this.props.index}.&nbsp;{this.props.item.text}
        {this.props.item.isUpdating && <ItemLoader />}
      </div>
    );
  }
}
