import React, { PureComponent } from 'react';

export class AddItem extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      text: ''
    };
  }

  handleChange = (event) => {
    this.setState({ text: event.target.value });
  }

  handleClick = () => {
    const { text } = this.state;
    const { onAdd } = this.props;
    onAdd(text);
    this.setState(() => ({ text: '' }));
  }

  render() {
    const { text } = this.state;
    return (
      <li className="list-group-item">
        <div className="input-group" style={{ width: 250 }}>
          <input type="text" className="form-control" value={text} onChange={this.handleChange}/>
          <button
            type="button"
            className="btn btn-outline-secondary btn-sm "
            style={{ width: 50 }}
            onClick={this.handleClick}
            disabled={!text.trim()}
          >Add
          </button>
        </div>
      </li>
    );
  }
}
