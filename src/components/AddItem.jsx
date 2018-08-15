import React, { PureComponent } from 'react';

export class AddItem extends PureComponent {
  constructor() {
    super();
    this.state = {
      text: ""
    };
  }
  
  render() {
    const { onAdd } = this.props;
    return (
      <li className="list-group-item">
        <input type="text" className="form-control" ref="text"/>
        <button type="button" className="btn btn-light btn btn-outline-secondary btn-sm" onClick={() => onAdd(this.refs.text.value)}>Add</button>
      </li>
    );
  }
}
