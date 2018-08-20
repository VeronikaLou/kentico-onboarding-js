import React, { PureComponent } from 'react';

export class PlainItem extends PureComponent {
  startEditing = () => {
    this.props.startEditing(this.props.item.id);
  };

  render() {
    const { index } = this.props;
    const { text } = this.props.item;
    return (
      <div onClick={ this.startEditing }> {index}. {text} </div>
    );
  }
}
