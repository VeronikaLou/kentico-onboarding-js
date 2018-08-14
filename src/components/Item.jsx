import React, { PureComponent } from 'react';

export class Item extends PureComponent {
  render() {
    const { id, text, onDelete } = this.props;
    return (
      <div>
        <span key={id}>{text}</span>
        <button type="button" className="btn btn-primary" color="primary">Save</button>
        <button type="button" className="btn">Cancel</button>
        <button type="button" className="btn btn-danger" onClick={() => onDelete(id)}>Delete</button>
      </div>
    );
  }
}
