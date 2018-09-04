import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Uuid } from '../utils/generateId';

export interface IPlainItemOwnProps {
  readonly index: number;
  readonly id: Uuid;
}

export interface IPlainItemDispatchToProps {
  readonly startEditing: () => void;
}

export interface IPlainStateToProps {
  readonly text: string;
}

type PlainItemProps = IPlainItemOwnProps & IPlainItemDispatchToProps & IPlainStateToProps;

export const PlainItem: React.StatelessComponent<PlainItemProps> = ({
  index, text , startEditing,
}: PlainItemProps): JSX.Element => (
  <div onClick={startEditing}>
    {index}.&nbsp;{text}
  </div>
);

PlainItem.displayName = 'PlainItem';

PlainItem.propTypes = {
  index: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
  startEditing: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
};
