import React from 'react';
import PropTypes from 'prop-types';
import { EditedItem } from './EditedItem';
import { ListItem } from '../models/ListItem';
import { PlainItem } from '../containers/PlainItemContainer';

export const Item = ({
  index, item
}) => (
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
