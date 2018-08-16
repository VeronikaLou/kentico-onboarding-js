import React, { PureComponent } from 'react';
import { Item } from './Item';
import { AddItem } from './AddItem';
import { generateId } from '../utils/generateId';
import { initItems } from '../utils/initItems';

export class List extends PureComponent {
  state = { items: initItems() };

  addItem = (text) => {
    const newItem = {
      id: generateId(),
      text
    };
    this.setState(prevState => ({
      items: [...prevState.items, newItem]
    }));
  };

  saveChanges = (id, text) => {
    const items = this.state.items.map(item => ((item.id === id)
      ? ({ id: item.id, text })
      : item));
    this.setState(() => ({ items }));
  };

  deleteItem = (id) => {
    this.setState(prevState => ({
      items: prevState.items.filter(item => item.id !== id)
    }));
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
                deleteItem={this.deleteItem}
                saveChanges={this.saveChanges}
              />
            ))}
            <AddItem addItem={this.addItem} />
          </ul>
        </div>
      </div>
    );
  }
}
