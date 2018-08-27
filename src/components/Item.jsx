import React from 'react';
import PropTypes from 'prop-types';
import { EditedItem } from './EditedItem';
import { PlainItem } from './PlainItem';
import { ListItem } from '../models/ListItem';

export const Item = ({
  index, saveChanges, changeEditingMode, deleteItem, item
}) => (
  <li className="list-group-item">
    {item.isEdited
      ? (
        <EditedItem
          index={index}
          item={item}
          saveChanges={saveChanges}
          cancelEditing={changeEditingMode}
          deleteItem={deleteItem}
        />
      )
      : (
        <PlainItem
          index={index}
          item={item}
          startEditing={changeEditingMode}
        />
      )}
  </li>
);

Item.displayName = 'Item';

Item.propTypes = {
  index: PropTypes.number.isRequired,
  item: PropTypes.instanceOf(ListItem).isRequired,
  saveChanges: PropTypes.func.isRequired,
  changeEditingMode: PropTypes.func.isRequired,
  deleteItem: PropTypes.func.isRequired,
};
