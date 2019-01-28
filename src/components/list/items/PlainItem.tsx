import * as React from 'react';
import * as PropTypes from 'prop-types';

export interface IPlainItemOwnProps {
  readonly index: number;
  readonly id: Uuid;
}

export interface IPlainItemDispatchProps {
  readonly startEditing: () => void;
}

export interface IPlainItemStateProps {
  readonly text: string;
}

type PlainItemProps = IPlainItemOwnProps & IPlainItemDispatchProps & IPlainItemStateProps;

export const PlainItem: React.StatelessComponent<PlainItemProps> = (
  {
    index, text, startEditing,
  }: PlainItemProps): JSX.Element =>
  (
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
