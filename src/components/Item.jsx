import React, { PureComponent } from 'react';
import { EditedItem } from './EditedItem';
import { PlainItem } from './PlainItem';

export class Item extends PureComponent {
  render() {
    const { isEdited } = this.props.item;
    const {
      index, saveChanges, cancelEditing, deleteItem, startEditing
    } = this.props;

    return (
      <li className="list-group-item">
        {isEdited
          ? (
            <EditedItem
              index={index}
              item={this.props.item}
              saveChanges={saveChanges}
              cancelEditing={cancelEditing}
              deleteItem={deleteItem}
            />
          )
          : (
            <PlainItem
              startEditing={startEditing}
              index={index}
              item={this.props.item}
            />
          )}
      </li>
    );
  }
}
