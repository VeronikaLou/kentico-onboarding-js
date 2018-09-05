import { connect } from 'react-redux';
import { EditedItem as EditedItemComponent } from '../components/EditedItem';
import {
  changeItemEditingMode,
  deleteItem,
  saveItemChanges
} from '../actions/listActionCreators';

const mapStateToProps = (state, ownProps) => ({
  text: state.items.get(ownProps.id).text,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  saveChanges: (text) => dispatch(saveItemChanges(ownProps.id, text)),
  deleteItem: () => dispatch(deleteItem(ownProps.id)),
  cancelEditing: () => dispatch(changeItemEditingMode(ownProps.id))
});

export const EditedItem = connect(mapStateToProps, mapDispatchToProps)(EditedItemComponent);
