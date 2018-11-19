import { connect } from 'react-redux';
import {
  EditedItem as EditedItemComponent,
  IEditedItemDispatchProps,
  IEditedItemMergeProps,
  IEditedItemOwnProps,
  IEditedItemStateProps,
} from '../components/EditedItem';
import { changeItemEditingMode } from '../actions/listActionCreators';
import { ComponentClass } from 'react';
import { Dispatch } from '../actions/types/Dispatcher';
import { IStore } from '../store/types/IStore';
import { deleteItem, putItem } from '../actions/listActions';

const mapStateToProps = (state: IStore, ownProps: IEditedItemOwnProps): IEditedItemStateProps => ({
  text: state.items.get(ownProps.id).text,
});

const mapDispatchToProps = (
  dispatch: Dispatch,
  ownProps: IEditedItemOwnProps,
): IEditedItemDispatchProps => ({
  dispatchSaveChanges: (text: string, backupText: string) => dispatch(putItem(ownProps.id, text, backupText)),
  deleteItem: () => dispatch(deleteItem(ownProps.id)),
  cancelEditing: () => dispatch(changeItemEditingMode(ownProps.id)),
});

const mergeProps = (
  stateProps: IEditedItemStateProps,
  dispatchProps: IEditedItemDispatchProps,
  ownProps: IEditedItemOwnProps
): IEditedItemMergeProps => ({
  saveChanges: (text: string) => dispatchProps.dispatchSaveChanges(text, stateProps.text),
  ...stateProps,
  ...dispatchProps,
  ...ownProps,
});

export const EditedItem: ComponentClass<IEditedItemOwnProps> = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(EditedItemComponent);
