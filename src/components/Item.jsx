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
    this.setState(() => ({ isClicked: true }));
  };

  handleCancel = () => {
    this.setState((() => ({ isClicked: false })));
  }

  handleEditText = (event) => {
    this.setState({ text: event.target.value });
  }

  handleSave = () => {
    const { onSave, id } = this.props;
    const { text } = this.state;
    onSave(id, text);
    this.setState((() => ({ isClicked: false })));
  }

  editInput = () => {
    const { text, index } = this.props;
    return (
      <div className="input-group" style={{ width: 420 }}>
        {index + 1}.
        <input type="text" defaultValue={text} className="form-control" onChange={this.handleEditText}/>
        {this.showButtons()}
      </div>
    );
  }

  showButtons = () => {
    const { onDelete, id } = this.props;
    return (
      <span>
        <button type="button" className="btn btn-primary" onClick={this.handleSave} disabled={!this.state.text.trim()}>Save</button>
        <button type="button" className="btn btn-light" onClick={this.handleCancel}>Cancel</button>
        <button type="button" className="btn btn-danger" onClick={() => onDelete(id)}>Delete</button>
      </span>
    );
  }

  render() {
    const { text, index } = this.props;
    const { isClicked } = this.state;
    return (
      <li className="list-group-item">
        {isClicked ? this.editInput() : (<a onClick={this.handleClick}> {index + 1}. {text} </a>)}
      </li>
    );
  }
}
