import { connect } from 'react-redux';
import {
  IPlainItemDispatchProps,
  IPlainItemMergeProps,
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
import { ListError } from '../models/ListError';

const mapStateToProps = (state: IStore, ownProps: IPlainItemOwnProps): IPlainItemStateProps => ({
  text: state.items.get(ownProps.id).text,
  isUpdating: state.items.get(ownProps.id).isUpdating,
  backupText: state.items.get(ownProps.id).backupText,
  error: state.errors.get(state.items.get(ownProps.id).error),
});

const mapDispatchToProps = (
  dispatch: Dispatch<IStore>,
  ownProps: IPlainItemOwnProps,
): IPlainItemDispatchProps => ({
  startEditing: () => dispatch(changeItemEditingMode(ownProps.id)),
  dispatchRetry: (error: ListError) => dispatch(retry(error)),
  dispatchCloseError: (error: ListError, backupText: string) => dispatch(closeError(error, backupText)),
});

const mergeProps = (
  stateProps: IPlainItemStateProps,
  dispatchProps: IPlainItemDispatchProps,
  ownProps: IPlainItemOwnProps
): IPlainItemMergeProps => ({
  closeError: () => dispatchProps.dispatchCloseError(stateProps.error, stateProps.backupText),
  retry: () => dispatchProps.dispatchRetry(stateProps.error),
  ...ownProps,
  ...stateProps,
  ...dispatchProps,
});

export const PlainItem: ComponentClass<IPlainItemOwnProps> = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(PlainItemComponent);
