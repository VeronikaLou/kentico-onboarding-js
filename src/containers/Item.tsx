import { IStoreState } from '../models/IStoreState';
import { IItemOwnProps, IItemStateToProps, Item as ItemComponent } from '../components/Item';
import { connect } from 'react-redux';

const mapStateToProps = (state: IStoreState, ownProps: IItemOwnProps): IItemStateToProps => ({
  isEdited: state.items.get(ownProps.id).isEdited,
});

export const Item = connect(mapStateToProps)(ItemComponent);
