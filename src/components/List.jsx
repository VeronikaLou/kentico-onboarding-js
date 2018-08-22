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
    const newItem = new ListItem({ id: generateId(), text });
    const items = this.state.items
      .set(newItem.id, newItem);
    this.setState(() => ({ items }));
  };

  _saveChanges = (id, text) => {
    const item = {
      text,
      isEdited: false
    };
    const items = this.state.items
      .mergeIn([id], item);
    this.setState(() => ({ items }));
  };

  _deleteItem = (id) => {
    const items = this.state.items
      .delete(id);
    this.setState(() => ({ items }));
  };

  _changeEditingMode = (id) => {
    const items = this.state.items
      .updateIn([id, 'isEdited'], isEdited => !isEdited);
    this.setState(() => ({ items }));
  };

  render() {
    return (
      <div className="row">
        <div className="col-sm-12 col-md-offset-2 col-md-8">
          <ul className="list-group">
            {this.state.items.entrySeq()
              .map(([id, item], index) => (
                <Item
                  key={id}
                  item={item}
                  index={index + 1}
                  deleteItem={this._deleteItem}
                  saveChanges={this._saveChanges}
                  changeEditingMode={this._changeEditingMode}
                />
              ))}
            <NewItem addItem={this._addItem} />
          </ul>
        </div>
      </div>
    );
  }
}
