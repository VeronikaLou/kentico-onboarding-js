import { IStore } from '../models/IStore';
import { IItemOwnProps, IItemStateProps, Item as ItemComponent } from '../components/Item';
import { connect } from 'react-redux';
import { ComponentClass } from 'react';

const mapStateToProps = (state: IStore, ownProps: IItemOwnProps): IItemStateProps => ({
  isEdited: state.items.get(ownProps.id).isEdited,
});

export const Item: ComponentClass<IItemOwnProps> = connect(mapStateToProps)(ItemComponent);
