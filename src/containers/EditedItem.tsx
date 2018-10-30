import { connect } from 'react-redux';
import {
  EditedItem as EditedItemComponent,
  IEditedItemDispatchProps,
  IEditedItemOwnProps,
} from '../components/EditedItem';
import { changeItemEditingMode } from '../actions/listActionCreators';
import { ComponentClass } from 'react';
import { putItem } from '../actions/putItem';
import { fetchDeleteItem } from '../actions/fetchDeleteItem';
import { Dispatch } from '../actions/types/Dispatcher';

const mapDispatchToProps = (
  dispatch: Dispatch,
  ownProps: IEditedItemOwnProps,
): IEditedItemDispatchProps => ({
  saveChanges: (text: string) => dispatch(putItem(ownProps.id, text, ownProps.text)),
  deleteItem: () => dispatch(fetchDeleteItem(ownProps.id)),
  cancelEditing: () => dispatch(changeItemEditingMode(ownProps.id)),
});

export const EditedItem: ComponentClass<IEditedItemOwnProps> = connect(
  null,
  mapDispatchToProps,
)(EditedItemComponent);
