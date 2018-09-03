import { connect } from 'react-redux';
import { EditedItem as EditedItemComponent } from '../components/EditedItem';
import {
  changeItemEditingMode,
  deleteItem,
  saveItemChanges
} from '../actions/listActionCreators';

const mapDispatchToProps = (dispatch, ownProps) => ({
  saveChanges: (text) => dispatch(saveItemChanges(ownProps.item.id, text)),
  deleteItem: () => dispatch(deleteItem(ownProps.item.id)),
  cancelEditing: () => dispatch(changeItemEditingMode(ownProps.item.id))
});

export const EditedItem = connect(null, mapDispatchToProps)(EditedItemComponent);
