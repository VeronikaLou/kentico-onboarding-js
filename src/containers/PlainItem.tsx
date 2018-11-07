import { connect } from 'react-redux';
import {
  IPlainItemDispatchProps,
  IPlainItemOwnProps,
  IPlainItemStateProps,
  PlainItem as PlainItemComponent,
} from '../components/PlainItem';
import { changeItemEditingMode } from '../actions/listActionCreators';
import { IStore } from '../store/types/IStore';
import { ComponentClass } from 'react';
import { Dispatch } from '../actions/types/Dispatcher';
import { ListError } from '../models/ListError';

const mapStateToProps = (state: IStore, ownProps: IPlainItemOwnProps): IPlainItemStateProps => ({
  text: state.items.get(ownProps.id).text,
  isUpdating: state.items.get(ownProps.id).isUpdating,
  error: state.errors.valueSeq().find((error: ListError) => error.itemId === ownProps.id),
});

const mapDispatchToProps = (dispatch: Dispatch<IStore>, ownProps: IPlainItemOwnProps)
  : IPlainItemDispatchProps => ({
  startEditing: () => dispatch(changeItemEditingMode(ownProps.id)),
});

export const PlainItem: ComponentClass<IPlainItemOwnProps> = connect(
  mapStateToProps,
  mapDispatchToProps,
)(PlainItemComponent);
