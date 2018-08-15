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
    if (text.trim() !== '') {
      const { onAdd } = this.props;
      onAdd(text);
      this.setState(() => ({ text: '' }));
    }
  }

  render() {
    const { text } = this.state;
    console.log(text);
    return (
      <li className="list-group-item">
        <input type="text" className="form-control" value={text} onChange={this.handleChange}/>
        <button type="button" className="btn btn-light btn btn-outline-secondary btn-sm" onClick={this.handleClick}>Add</button>
      </li>
    );
  }
}
