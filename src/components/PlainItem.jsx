import React, { PureComponent } from 'react';

export class PlainItem extends PureComponent {
  render() {
    const {
      index, startEditing
    } = this.props;
    const { text, id } = this.props.item;
    return (
      <div onClick={() => startEditing(id)}> {index}. {text} </div>
    );
  }
}
