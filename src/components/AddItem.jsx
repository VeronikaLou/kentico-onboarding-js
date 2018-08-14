import React, { PureComponent } from 'react';

export class AddItem extends PureComponent {
  render() {
    const { onAdd } = this.props;
    return (
      <form>
        <input type="text" ref="text"/>
        <button type="button" onClick={() => onAdd(this.refs.text.value)}>Add</button>
      </form>
    );
  }
}
