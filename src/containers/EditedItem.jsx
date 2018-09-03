import { connect } from 'react-redux';
import { EditedItem as EditedItemComponent } from '../components/EditedItem';
import {
  changeEditingMode,
  deleteItem,
  saveChanges
} from '../actions/listActionCreators';

const mapDispatchToProps = (dispatch, ownProps) => ({
  saveChanges: (text) => dispatch(saveChanges(ownProps.item.id, text)),
  deleteItem: () => dispatch(deleteItem(ownProps.item.id)),
  cancelEditing: () => dispatch(changeEditingMode(ownProps.item.id))
});

export const EditedItem = connect(null, mapDispatchToProps)(EditedItemComponent);
