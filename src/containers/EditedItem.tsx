import { connect } from 'react-redux';
import {
  EditedItem as EditedItemComponent,
  IEditedItemDispatchToProps,
  IEditedItemOwnProps, IEditedItemStateToProps,
} from '../components/EditedItem';
import {
  changeItemEditingMode,
  deleteItem,
  saveItemChanges,
} from '../actions/listActionCreators';
import { Dispatch } from 'redux';
import { IStoreState } from '../models/IStoreState';

const mapStateToProps = (state: IStoreState, ownProps: IEditedItemOwnProps): IEditedItemStateToProps => ({
  text: state.items.get(ownProps.id).text,
});

const mapDispatchToProps = (dispatch: Dispatch, ownProps: IEditedItemOwnProps): IEditedItemDispatchToProps => ({
  saveChanges: (text: string) => dispatch(saveItemChanges(ownProps.id, text)),
  deleteItem: () => dispatch(deleteItem(ownProps.id)),
  cancelEditing: () => dispatch(changeItemEditingMode(ownProps.id)),
});

export const EditedItem = connect(mapStateToProps, mapDispatchToProps)(EditedItemComponent);
