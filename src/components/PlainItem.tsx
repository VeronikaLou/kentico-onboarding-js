import * as React from 'react';
import * as PropTypes from 'prop-types';
import { ListItem } from '../models/ListItem';

export interface IPlainItemProps {
  readonly index: string;
  readonly item: ListItem;
  readonly startEditing: () => void;
}

export const PlainItem: React.StatelessComponent<IPlainItemProps> = ({
  index, item: { text }, startEditing
}: IPlainItemProps) => (
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
