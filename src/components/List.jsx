import React from 'react';
import PropTypes from 'prop-types';
import { Item } from '../containers/Item';
import { NewItem } from '../containers/NewItem';

export const List = ({ items }) => {
  const renderItems = items
    .map((id, index) => (
      <Item
        key={id}
        item={id}
        index={index + 1}
      />
    ));

  return (
    <div className="row">
      <div className="col-sm-12 col-md-offset-2 col-md-8">
        <ul className="list-group">
          {renderItems}
          <NewItem />
        </ul>
      </div>
    </div>
  );
};

List.displayName = 'List';

List.propTypes = {
  items: PropTypes.array.isRequired
};
