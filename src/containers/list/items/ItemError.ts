import { IStore } from '../../../store/types/IStore';
import { Dispatch } from '../../../actions/types/Dispatcher';
import { retry } from '../../../actions/listActions';
import { closeError } from '../../../actions/thunks/closeError';
import {
  ItemError as ItemErrorComponent,
  IItemErrorDispatchProps,
  IItemErrorOwnProps,
  IItemErrorStateProps,
} from '../../../components/list/items/ItemError';
import { ComponentClass } from 'react';
import { connect } from 'react-redux';

const mapStateToProps = (state: IStore, ownProps: IItemErrorOwnProps): IItemErrorStateProps => ({
  backupText: state.items.get(ownProps.id).backupText,
});

const mapDispatchToProps = (dispatch: Dispatch<IStore>, ownProps: IItemErrorOwnProps):
  IItemErrorDispatchProps => ({
  retry: () => dispatch(retry(ownProps.error)),
  closeError: (backupText: string) => dispatch(closeError(ownProps.error, backupText)),
});

export const ItemError: ComponentClass<IItemErrorOwnProps> = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ItemErrorComponent);
