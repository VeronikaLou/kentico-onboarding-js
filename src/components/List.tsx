import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Item } from './Item';
import { NewItem } from '../containers/NewItem';
import { OrderedMap } from 'immutable';
import { Uuid } from '../utils/generateId';
import { ListItem } from '../models/ListItem';

export interface IListDispatchToProps {
   readonly items: OrderedMap<Uuid, ListItem>;
}

export const List: React.StatelessComponent<IListDispatchToProps> = ({ items }: IListDispatchToProps) => {
  const renderItems = items
    .map((item: ListItem, index: string) => (
      <Item
        key={item.id}
        item={item}
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
