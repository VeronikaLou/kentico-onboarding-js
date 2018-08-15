import React, { PureComponent } from 'react';

export class AddItem extends PureComponent {
  render() {
    const { onAdd } = this.props;
    return (
      <li className="list-group-item">
        <input type="text" ref="text"/>
        <button type="button" className="btn btn-light" onClick={() => onAdd(this.refs.text.value)}>Add</button>
      </li>
    );
  }
}
