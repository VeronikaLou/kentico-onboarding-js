import * as React from 'react';
import * as PropTypes from 'prop-types';
import { ListItem } from '../models/ListItem';
import { PlainItem } from '../containers/PlainItem';
import { EditedItem } from '../containers/EditedItem';

interface IItemProps {
  readonly index: string;
  readonly item: ListItem;
}

export const Item: React.StatelessComponent<IItemProps> = ({index, item}: IItemProps) => (
  <li className="list-group-item">
    {item.isEdited
      ? (
        <EditedItem
          index={index}
          item={item}
        />
      )
      : (
        <PlainItem
          index={index}
          item={item}
        />
      )}
  </li>
);

Item.displayName = 'Item';

Item.propTypes = {
  index: PropTypes.number.isRequired,
  item: PropTypes.instanceOf(ListItem).isRequired,
};
