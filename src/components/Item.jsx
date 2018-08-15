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
  }

  showButtons = () => {
    const { onDelete, id } = this.props;
    return (
      <div>
        <button type="button" className="btn btn-primary" color="primary">Save</button>
        <button type="button" className="btn btn-light" >Cancel</button>
        <button type="button" className="btn btn-danger" onClick={() => onDelete(id)}>Delete</button>
      </div>
    );
  }

  render() {
    const { id, text } = this.props;
    return (
      <span>
        <li className="list-group-item" key={id} /*onClick={this.handleClick}*/> {text} </li>
        { this.state.clicked ? this.showButtons() : null }
      </span>
    );
  }
}
