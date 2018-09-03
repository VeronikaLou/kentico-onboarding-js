import React from 'react';
import PropTypes from 'prop-types';
import { ListItem } from '../models/ListItem.tsx';

export const PlainItem = ({
  index, item: { text }, startEditing
}) => (
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
