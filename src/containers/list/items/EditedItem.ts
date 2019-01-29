import { connect } from 'react-redux';
import {
  EditedItem as EditedItemComponent,
  IEditedItemDispatchProps,
  IEditedItemOwnProps,
  IEditedItemStateProps,
} from '../../../components/list/items/EditedItem';
import {
  changeItemEditingMode,
  saveItemChanges,
} from '../../../actions/listActionCreators';
import { IStore } from '../../../store/types/IStore';
import { ComponentClass } from 'react';
import { deleteItem } from '../../../actions/listActions';
import { Dispatch } from '../../../actions/types/Dispatcher';

const mapStateToProps = (state: IStore, ownProps: IEditedItemOwnProps): IEditedItemStateProps => ({
  text: state.items.get(ownProps.id).text,
});

const mapDispatchToProps = (
  dispatch: Dispatch,
  ownProps: IEditedItemOwnProps,
): IEditedItemDispatchProps => ({
  saveChanges: (text: string) => dispatch(saveItemChanges(ownProps.id, text)),
  deleteItem: () => dispatch(deleteItem(ownProps.id)),
  cancelEditing: () => dispatch(changeItemEditingMode(ownProps.id)),
});

export const EditedItem: ComponentClass<IEditedItemOwnProps> = connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditedItemComponent);
