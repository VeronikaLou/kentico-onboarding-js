import * as React from 'react';
import * as PropTypes from 'prop-types';
import { PlainItem } from '../containers/PlainItem';
import { EditedItem } from '../containers/EditedItem';
import { Uuid } from '../utils/generateId';

export interface IItemOwnProps {
  readonly index: number;
  readonly id: Uuid;
}

export interface IItemStateToProps {
  readonly isEdited: boolean;
}

type ItemProps = IItemOwnProps & IItemStateToProps;

export const Item: React.StatelessComponent<ItemProps> = ({index, id, isEdited}: ItemProps) => (
  <li className="list-group-item">
    {isEdited
      ? (
        <EditedItem
          index={index}
          id={id}
        />
      )
      : (
        <PlainItem
          index={index}
          id={id}
        />
      )}
  </li>
);

Item.displayName = 'Item';

Item.propTypes = {
  index: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
  isEdited: PropTypes.bool.isRequired,
};
