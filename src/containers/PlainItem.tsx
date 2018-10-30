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
import { retry } from '../actions/retry';
import { closeError } from '../actions/closeError';

const mapStateToProps = (state: IStore, ownProps: IPlainItemOwnProps): IPlainItemStateProps => ({
  text: state.items.get(ownProps.id).text,
  isUpdating: state.items.get(ownProps.id).isUpdating,
});

const mapDispatchToProps = (
  dispatch: Dispatch<IStore>,
  ownProps: IPlainItemOwnProps,
): IPlainItemDispatchProps => ({
  startEditing: () => dispatch(changeItemEditingMode(ownProps.id)),
  retry: () => dispatch(retry(ownProps.error)),
  closeError: () => dispatch(closeError(ownProps.error)),
});

export const PlainItem: ComponentClass<IPlainItemOwnProps> = connect(
  mapStateToProps,
  mapDispatchToProps,
)(PlainItemComponent);
