import React from 'react';
import PropTypes from 'prop-types';

export const PlainItem = ({
  index, text, startEditing
}) => (
  <div onClick={startEditing}>
    {index}.&nbsp;{text}
  </div>
);

PlainItem.displayName = 'PlainItem';

PlainItem.propTypes = {
  index: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
  startEditing: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
};
