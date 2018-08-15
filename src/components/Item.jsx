import React, { PureComponent } from 'react';

export class Item extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isClicked: false,
      text: props.text
    };
  }

  handleClick = () => {
    this.setState(prevState => ({ isClicked: !prevState.isClicked }));
  };

  handleCancel = () => {
    this.setState((() => ({ isClicked: false })));
  }

  handleEditText = (event) => {
    this.setState({ text: event.target.value });
  }

  handleSave = () => {
    const { onEdit, id } = this.props;
    const { text } = this.state;
    onEdit(id, text);
    this.setState((() => ({ isClicked: false })));
  }

  editInput = (text) => {
    return (
      <div className="input-group" style={{ width: 420 }}>
        <input type="text" defaultValue={text} className="form-control" onChange={this.handleEditText}/>
        {this.state.isClicked ? this.showButtons() : undefined}
      </div>
    );
  }

  showButtons = () => {
    const { onDelete, id } = this.props;
    return (
      <span>
        <button type="button" className="btn btn-primary" color="primary" onClick={this.handleSave} disabled={!this.state.text.trim()}>Save</button>
        <button type="button" className="btn btn-light" onClick={this.handleCancel}>Cancel</button>
        <button type="button" className="btn btn-danger" onClick={() => onDelete(id)}>Delete</button>
      </span>
    );
  }

  render() {
    const { text } = this.props;
    const { isClicked } = this.state;
    return (
      <li className="list-group-item" >
        {isClicked ? this.editInput(text) : (<a onClick={this.handleClick}> {text} </a>)}
      </li>
    );
  }
}
