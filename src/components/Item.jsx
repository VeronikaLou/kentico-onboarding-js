import React from 'react';
import PropTypes from 'prop-types';
import { ListItem } from '../models/ListItem';
import { PlainItem } from '../containers/PlainItemContainer';
import { EditedItem } from '../containers/ItemEditedContainer';

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
