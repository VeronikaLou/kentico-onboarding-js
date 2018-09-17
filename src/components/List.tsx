import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Item } from '../containers/Item';
import { NewItem } from '../containers/NewItem';

export interface IListStateProps {
  readonly items: Array<Uuid>;
}

export const List: React.StatelessComponent<IListStateProps> =
  ({items}: IListStateProps): JSX.Element => {
    const renderItems: Array<JSX.Element> = items
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
  items: PropTypes.array.isRequired,
};
