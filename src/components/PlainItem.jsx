import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { ListItem } from '../models/ListItem';

export class PlainItem extends PureComponent {
  static displayName = 'PlainItem';

  static propTypes = {
    index: PropTypes.number.isRequired,
    item: PropTypes.instanceOf(ListItem).isRequired,
    startEditing: PropTypes.func.isRequired,
  };

  render() {
    const { index, item: { text } } = this.props;

    return (
      <div onClick={this.props.startEditing}>
        {index}.&nbsp;{text}
      </div>
    );
  }
}
