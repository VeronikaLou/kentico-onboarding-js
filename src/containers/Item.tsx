import { IStore } from '../store/types/IStore';
import {
  IItemOwnProps,
  IItemStateProps, Item as ItemComponent,
} from '../components/Item';
import { connect } from 'react-redux';
import { ComponentClass } from 'react';

const mapStateToProps = (state: IStore, ownProps: IItemOwnProps): IItemStateProps => ({
  isEdited: state.items.get(ownProps.id).isEdited,
  error: state.errors.get(state.items.get(ownProps.id).error),
  text: state.items.get(ownProps.id).text,
});

export const Item: ComponentClass<IItemOwnProps> = connect(mapStateToProps)(ItemComponent);
