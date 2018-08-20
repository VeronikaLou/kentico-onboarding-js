import React, { PureComponent } from 'react';
import { EditedItem } from './EditedItem';
import { PlainItem } from './PlainItem';

export class Item extends PureComponent {
  render() {
    const { isEdited } = this.props.item;
    const {
      index, saveChanges, changeEditingMode, deleteItem
    } = this.props;

    return (
      <li className="list-group-item">
        {isEdited
          ? (
            <EditedItem
              index={index}
              item={this.props.item}
              saveChanges={saveChanges}
              cancelEditing={changeEditingMode}
              deleteItem={deleteItem}
            />
          )
          : (
            <PlainItem
              startEditing={changeEditingMode}
              index={index}
              item={this.props.item}
            />
          )}
      </li>
    );
  }
}
