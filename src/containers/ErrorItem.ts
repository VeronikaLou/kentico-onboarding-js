import { IStore } from '../store/types/IStore';
import { Dispatch } from '../actions/types/Dispatcher';
import { retry } from '../actions/listActions';
import { closeError } from '../actions/thunks/closeError';
import {
  ErrorItem as ErrorItemComponent,
  IErrorItemDispatchProps,
  IErrorItemOwnProps,
  IErrorItemStateProps,
} from '../components/ErrorItem';
import { ComponentClass } from 'react';
import { connect } from 'react-redux';

const mapStateToProps = (state: IStore, ownProps: IErrorItemOwnProps): IErrorItemStateProps => ({
  backupText: state.items.get(ownProps.id).backupText,
});

const mapDispatchToProps = (dispatch: Dispatch<IStore>, ownProps: IErrorItemOwnProps):
  IErrorItemDispatchProps => ({
  retry: () => dispatch(retry(ownProps.error)),
  closeError: (backupText: string) => dispatch(closeError(ownProps.error, backupText)),
});

export const ErrorItem: ComponentClass<IErrorItemOwnProps> = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ErrorItemComponent);
