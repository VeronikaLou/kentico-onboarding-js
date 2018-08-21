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
          startEditing={changeEditingMode}
          index={index}
          item={item}
        />
      )}
  </li>
);

Item.propTypes = {
  index: PropTypes.number,
  item: PropTypes.shape({
    text: PropTypes.string,
    id: PropTypes.string,
    isEdited: PropTypes.bool
  }),
  saveChanges: PropTypes.func,
  changeEditingMode: PropTypes.func,
  deleteItem: PropTypes.func,
};
