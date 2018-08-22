import React from 'react';
import PropTypes from 'prop-types';
import { EditedItem } from './EditedItem';
import { PlainItem } from './PlainItem';

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
  item: PropTypes.shape({
    text: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    isEdited: PropTypes.bool.isRequired
  }),
  saveChanges: PropTypes.func.isRequired,
  changeEditingMode: PropTypes.func.isRequired,
  deleteItem: PropTypes.func.isRequired,
};
