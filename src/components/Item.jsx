import React, { PureComponent } from 'react';
import { EditedItem } from './EditedItem';
import { PlainItem } from './PlainItem';

export class Item extends PureComponent {
  render() {
    const {
      index, saveChanges, changeEditingMode, deleteItem, item
    } = this.props;

    return (
      <li className="list-group-item">
        {item.isEdited
          ? (
            <EditedItem
              index={index}
              item={item}
              saveChanges={saveChanges}
              cancelEditing={changeEditingMode}
              deleteItem={deleteItem}
            />
          )
          : (
            <PlainItem
              startEditing={changeEditingMode}
              index={index}
              item={item}
            />
          )}
      </li>
    );
  }
}
