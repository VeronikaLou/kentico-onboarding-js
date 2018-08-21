import React, { PureComponent } from 'react';
import { Item } from './Item';
import { NewItem } from './NewItem';
import { generateId } from '../utils/generateId';
import { createItems } from '../utils/createItems';

export class List extends PureComponent {
  static displayName = 'List';

  state = { items: createItems() };

  _addItem = (text) => {
    const newItem = {
      id: generateId(),
      text,
      isEdited: false
    };

    this.setState(prevState => ({
      items: [...prevState.items, newItem]
    }));
  };

  _saveChanges = (id, text) => {
    const items = this.state.items.map(item => ((item.id === id)
      ? ({
        id: item.id,
        text,
        isEdited: false
      })
      : item));
    this.setState(() => ({ items }));
  };

  _deleteItem = (id) =>
    this.setState(prevState => ({
      items: prevState.items.filter(item => item.id !== id)
    }));

  _changeEditingMode = (id) => {
    const items = this.state.items.map(item => ((item.id === id)
      ? ({
        id: item.id,
        text: item.text,
        isEdited: !item.isEdited
      })
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
