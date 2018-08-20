import React, { PureComponent } from 'react';
import { Item } from './Item';
import { NewItem } from './NewItem';
import { generateId } from '../utils/generateId';
import { initItems } from '../utils/initItems';

export class List extends PureComponent {
  state = { items: initItems() };

  addItem = (text) => {
    const newItem = {
      id: generateId(),
      text,
      isEdited: false
    };
    this.setState(prevState => ({
      items: [...prevState.items, newItem]
    }));
  };

  saveChanges = (id, text) => {
    const items = this.state.items.map(item => ((item.id === id)
      ? ({
        id: item.id,
        text,
        isEdited: false
      })
      : item));
    this.setState(() => ({ items }));
  };

  deleteItem = (id) => {
    this.setState(prevState => ({
      items: prevState.items.filter(item => item.id !== id)
    }));
  };

  changeEditingMode = (id) => {
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
                deleteItem={this.deleteItem}
                saveChanges={this.saveChanges}
                changeEditingMode={this.changeEditingMode}
              />
            ))}
            <NewItem addItem={this.addItem} />
          </ul>
        </div>
      </div>
    );
  }
}
