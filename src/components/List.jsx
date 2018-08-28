import React, { PureComponent } from 'react';
import { Item } from './Item';
import { NewItem } from '../containers/NewItemContainer';

export class List extends PureComponent {
  static displayName = 'List';

  render() {
    const renderItems = this.props.items
      .map(([id, item], index) => (
        <Item
          key={id}
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
  }
}
