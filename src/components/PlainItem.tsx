import * as React from 'react';
import * as PropTypes from 'prop-types';
import { ListItem } from '../models/ListItem';

export interface IPlainItemOwnProps {
  readonly index: string;
  readonly item: ListItem;
}

export interface IPlainItemDispatchToProps {
  readonly startEditing: () => void;
}

type PlainItemProps = IPlainItemOwnProps & IPlainItemDispatchToProps;

export const PlainItem: React.StatelessComponent<PlainItemProps> = ({
  index, item: { text }, startEditing,
}: PlainItemProps) => (
  <div onClick={startEditing}>
    {index}.&nbsp;{text}
  </div>
);

PlainItem.displayName = 'PlainItem';

PlainItem.propTypes = {
  index: PropTypes.number.isRequired,
  item: PropTypes.instanceOf(ListItem).isRequired,
  startEditing: PropTypes.func.isRequired,
};
