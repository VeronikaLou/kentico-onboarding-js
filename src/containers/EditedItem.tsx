import { connect } from 'react-redux';
import {
  EditedItem as EditedItemComponent,
  IEditedItemDispatchProps,
  IEditedItemOwnProps,
  IEditedItemStateProps,
} from '../components/EditedItem';
import {
  changeItemEditingMode,
  fetchDeleteItem,
  fetchSaveItem,
} from '../actions/listActionCreators';
import { Dispatch } from 'redux';
import { IStore } from '../store/types/IStore';
import { IListAction } from '../actions/types/IListAction';
import { ComponentClass } from 'react';

const mapStateToProps = (state: IStore, ownProps: IEditedItemOwnProps): IEditedItemStateProps => ({
  text: state.items.get(ownProps.id).text,
});

const mapDispatchToProps = (
  dispatch: Dispatch<IListAction>,
  ownProps: IEditedItemOwnProps,
): IEditedItemDispatchProps => ({
  saveChanges: (text: string) => dispatch(fetchSaveItem(ownProps.id, text)),
  deleteItem: () => dispatch(fetchDeleteItem(ownProps.id)),
  cancelEditing: () => dispatch(changeItemEditingMode(ownProps.id)),
});

export const EditedItem: ComponentClass<IEditedItemOwnProps> = connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditedItemComponent);
