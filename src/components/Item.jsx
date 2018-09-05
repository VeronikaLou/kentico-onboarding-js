import React from 'react';
import PropTypes from 'prop-types';
import { PlainItem } from '../containers/PlainItem';
import { EditedItem } from '../containers/EditedItem';

export const Item = ({
  index, id, isEdited
}) => (
  <li className="list-group-item">
    {isEdited
      ? (
        <EditedItem
          index={index}
          id={id}
        />
      )
      : (
        <PlainItem
          index={index}
          id={id}
        />
      )}
  </li>
);

Item.displayName = 'Item';

Item.propTypes = {
  index: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
  isEdited: PropTypes.bool.isRequired
};
