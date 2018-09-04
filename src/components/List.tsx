import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Item } from '../containers/Item';
import { NewItem } from '../containers/NewItem';
import { Uuid } from '../utils/generateId';
import { Seq } from 'immutable';

export interface IListStateToProps {
   readonly items: Seq.Indexed<Uuid>;
}

export const List: React.StatelessComponent<IListStateToProps> = ({ items }: IListStateToProps): JSX.Element => {
  const renderItems = items
    .map((id: Uuid, index: number) => (
      <Item
        key={id}
        id={id}
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
  items: PropTypes.object.isRequired,
};
