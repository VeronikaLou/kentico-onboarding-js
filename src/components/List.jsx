import React, { PureComponent } from 'react';
import { Item } from './Item';
import { NewItem } from './NewItem';
import { generateId } from '../utils/generateId';
import { createItems } from '../utils/itemsCreator';
import { ListItem } from '../models/ListItem';

export class List extends PureComponent {
  static displayName = 'List';

  state = {
    items: createItems()
  };

  _addItem = (text) => {
    const newItem = new ListItem({
      id: generateId(),
      text
    });
    this.setState(prevState => ({
      items: prevState.items
        .set(newItem.id, newItem)
    }));
  };

  _saveChanges = (id, text) =>
    this.setState(prevState => ({
      items: prevState.items
        .mergeIn([id], {
          text,
          isEdited: false
        })
    }));

  _deleteItem = (id) =>
    this.setState(prevState => ({
      items: prevState.items
        .delete(id)
    }));

  _changeEditingMode = (id) =>
    this.setState(prevState => ({
      items: prevState.items
        .updateIn([id, 'isEdited'], isEdited => !isEdited)
    }));

  render() {
    const renderItems = this.state.items.entrySeq()
      .map(([id, item], index) => (
        <Item
          key={id}
          item={item}
          index={index + 1}
          deleteItem={this._deleteItem}
          saveChanges={this._saveChanges}
          changeEditingMode={this._changeEditingMode}
        />
      ));

    return (
      <div className="row">
        <div className="col-sm-12 col-md-offset-2 col-md-8">
          <ul className="list-group">
            {renderItems}
            <NewItem addItem={this._addItem} />
          </ul>
        </div>
      </div>
    );
  }
}
