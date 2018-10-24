import * as React from 'react';
import * as PropTypes from 'prop-types';
import { PlainItem } from '../containers/PlainItem';
import { EditedItem } from '../containers/EditedItem';
import { ListError } from '../models/ListError';

export interface IItemOwnProps {
  readonly index: number;
  readonly id: Uuid;
}

export interface IItemStateProps {
  readonly isEdited: boolean;
  readonly error: ListError;
  readonly text: string;
}

type ItemProps = IItemOwnProps & IItemStateProps;

export const Item: React.StatelessComponent<ItemProps> =
  ({index, id, isEdited, error, text}: ItemProps): JSX.Element => {
    const renderItem = isEdited
      ? (
        <EditedItem
          index={index}
          id={id}
          text={text}
        />
      )
      : (
        <PlainItem
          index={index}
          id={id}
          error={error}
        />
      );

    return (
      <li className="list-group-item">
        {renderItem}
      </li>
    );
  };

Item.displayName = 'Item';

Item.propTypes = {
  index: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
  isEdited: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired,
};
