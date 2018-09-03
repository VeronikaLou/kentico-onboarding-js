import { connect } from 'react-redux';
import {
  EditedItem as EditedItemComponent,
  IEditedItemDispatchToProps,
  IEditedItemOwnProps,
} from '../components/EditedItem';
import {
  changeItemEditingMode,
  deleteItem,
  saveItemChanges,
} from '../actions/listActionCreators';
import { Dispatch } from 'redux';

const mapDispatchToProps = (dispatch: Dispatch, ownProps: IEditedItemOwnProps): IEditedItemDispatchToProps => ({
  saveChanges: (text: string) => dispatch(saveItemChanges(ownProps.item.id, text)),
  deleteItem: () => dispatch(deleteItem(ownProps.item.id)),
  cancelEditing: () => dispatch(changeItemEditingMode(ownProps.item.id)),
});

export const EditedItem = connect(null, mapDispatchToProps)(EditedItemComponent);
