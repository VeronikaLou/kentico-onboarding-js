import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export class PlainItem extends PureComponent {
  static displayName = 'PlainItem';

  static propTypes = {
    index: PropTypes.number.isRequired,
    item: PropTypes.shape({
      text: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
    }),
    startEditing: PropTypes.func.isRequired,
  };

  _startEditing = () => this.props.startEditing(this.props.item.id);

  render() {
    const { index, item: { text } } = this.props;

    return (
      <div onClick={this._startEditing}>
        {index}.&nbsp;{text}
      </div>
    );
  }
}
