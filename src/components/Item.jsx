import React, { PureComponent } from 'react';

export class Item extends PureComponent {
  state = {
    isClicked: false,
    text: this.props.item.text,
  };

  handleClick = () => {
    this.setState(() => ({ isClicked: true }));
  };

  handleCancel = () => {
    this.setState(() => ({ isClicked: false }));
  };

  handleEditText = (event) => {
    this.setState({ text: event.target.value });
  };

  handleSave = () => {
    const {  id } = this.props.item;
    const { saveChanges } = this.props;
    const { text } = this.state;
    saveChanges(id, text);
    this.setState(() => ({ isClicked: false }));
  };

  editInput = () => {
    const { index } = this.props;
    const { text } = this.props.item;

    return (
      <div className="input-group col-sm-8">
        <div className="input-group-prepend">
          <span className="input-group-text">{index}.</span>
        </div>
        <input
          type="text"
          defaultValue={text}
          className="form-control"
          onChange={this.handleEditText}
        />
        {this.showButtons()}
      </div>
    );
  };

  showButtons = () => {
    const { deleteItem } = this.props;
    const { id } = this.props.item;
    return (
      <span>
        <button
          type="button"
          className="btn btn-primary"
          onClick={this.handleSave}
          disabled={!this.state.text.trim()}
        >
          Save
        </button>
        <button
          type="button"
          className="btn btn-outline-secondary"
          onClick={this.handleCancel}
        >
          Cancel
        </button>
        <button
          type="button"
          className="btn btn-danger"
          onClick={() => deleteItem(id)}
        >
          Delete
        </button>
      </span>
    );
  };

  render() {
    const { index } = this.props;
    const { isClicked } = this.state;
    const { text } = this.props.item;

    return (
      <li className="list-group-item">
        {isClicked
          ? this.editInput()
          : (<div onClick={this.handleClick}> {index}. {text} </div>)}
      </li>
    );
  }
}
