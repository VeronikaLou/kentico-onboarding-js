import React, { PureComponent } from 'react';

export class PlainItem extends PureComponent {
  _startEditing = () => {
    this.props.startEditing(this.props.item.id);
  };

  render() {
    const { index, item: { text } } = this.props;
    return (
      <div onClick={ this._startEditing }> {index}. {text} </div>
    );
  }
}
