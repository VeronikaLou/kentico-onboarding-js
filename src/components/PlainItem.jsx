import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export class PlainItem extends PureComponent {
  static propTypes = {
    index: PropTypes.number,
    item: PropTypes.shape({
      text: PropTypes.string,
      id: PropTypes.string,
    }),
    startEditing: PropTypes.func,
  };

  _startEditing = () => this.props.startEditing(this.props.item.id);

  render() {
    const { index, item: { text } } = this.props;

    return (
      <div onClick={ this._startEditing }> {index}. {text} </div>
    );
  }
}
