import * as React from 'react';
import * as PropTypes from 'prop-types';
import { ListItem } from '../models/ListItem';

export interface IPlainItemProps {
  readonly index: string;
  readonly item: ListItem;
}

interface IDispatchToProps {
  readonly startEditing: () => void;
}

type PlainItemProps = IPlainItemProps & IDispatchToProps;

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
