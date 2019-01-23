import { connect } from 'react-redux';
import {
  EditedItem as EditedItemComponent,
  EditedItemProps,
  IEditedItemOwnProps,
  IEditedItemStateProps,
} from '../../../components/list/items/EditedItem';
import { changeItemEditingMode } from '../../../actions/listActionCreators';
import { ComponentClass } from 'react';
import { Dispatch } from '../../../actions/types/Dispatcher';
import { IStore } from '../../../store/types/IStore';
import { deleteItem, putItem } from '../../../actions/listActions';
import { IListAction } from '../../../actions/types/IListAction';

interface IEditedItemTempProps {
  readonly dispatchSaveChanges: (text: string, backupText: string) => Promise<IListAction>;
  readonly cancelEditing: () => void;
  readonly deleteItem: () => void;
}

const mapStateToProps = (state: IStore, ownProps: IEditedItemOwnProps): IEditedItemStateProps => ({
  text: state.items.get(ownProps.id).text,
});

const mapDispatchToProps = (
  dispatch: Dispatch,
  ownProps: IEditedItemOwnProps,
): IEditedItemTempProps => ({
  dispatchSaveChanges: (text: string, backupText: string) => dispatch(putItem(ownProps.id, text, backupText)),
  deleteItem: () => dispatch(deleteItem(ownProps.id)),
  cancelEditing: () => dispatch(changeItemEditingMode(ownProps.id)),
});

const mergeProps = (
  stateProps: IEditedItemStateProps,
  dispatchProps: IEditedItemTempProps,
  ownProps: IEditedItemOwnProps,
): EditedItemProps => ({
  saveChanges: (text: string) => dispatchProps.dispatchSaveChanges(text, stateProps.text),
  deleteItem: dispatchProps.deleteItem,
  cancelEditing: dispatchProps.cancelEditing,
  ...stateProps,
  ...ownProps,
});

export const EditedItem: ComponentClass<IEditedItemOwnProps> = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(EditedItemComponent);
