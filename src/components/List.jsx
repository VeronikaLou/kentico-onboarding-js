import React, { PureComponent } from 'react';
import { Item } from './Item';
import { NewItem } from './NewItem';
import { generateId } from '../utils/generateId';
import {
  createItem,
  createItems
} from '../utils/itemsCreator';

export class List extends PureComponent {
  static displayName = 'List';

  state = {
    items: createItems()
  };

  _addItem = (text) => {
    this.setState(prevState => ({
      items: [
        ...prevState.items,
        createItem(generateId(), text)
      ]
    }));
  };

  _saveChanges = (id, text) => {
    const items = this.state.items.map(item => ((item.id === id)
      ? createItem(id, text)
      : item));
    this.setState(() => ({ items }));
  };

  _deleteItem = (id) =>
    this.setState(prevState => ({
      items: prevState.items
        .filter(item => item.id !== id)
    }));

  _changeEditingMode = (id) => {
    const items = this.state.items.map(item => ((item.id === id)
      ? createItem(id, item.text, !item.isEdited)
      : item));
    this.setState(() => ({ items }));
  };

  render() {
    return (
      <div className="row">
        <div className="col-sm-12 col-md-offset-2 col-md-8">
          <ul className="list-group">
            {this.state.items.map((item, index) => (
              <Item
                key={item.id}
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
