import React, { PureComponent } from 'react';

export class Item extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      clicked: false,
    };
  }

  handleClick = () => {
    this.setState({ clicked: true });
  };

  handleCancel = () => {
    this.setState((() => ({ clicked: false })));
  }

  showButtons = () => {
    const { onDelete, id } = this.props;
    return (
      <span>
        <button type="button" className="btn btn-primary btn-sm" color="primary">Save</button>
        <button type="button" className="btn btn-light btn-sm" onClick={this.handleCancel}>Cancel</button>
        <button type="button" className="btn btn-danger btn-sm" onClick={() => onDelete(id)}>Delete</button>
      </span>
    );
  }

  render() {
    const { text } = this.props;

    return (
      <li className="list-group-item" >
        <a onClick={this.handleClick}> {text} </a>
        {this.state.clicked ? this.showButtons() : undefined}
      </li>
    );
  }
}
