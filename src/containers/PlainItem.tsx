import { connect } from 'react-redux';
import {
  IPlainItemDispatchToProps,
  IPlainItemOwnProps, IPlainStateToProps,
  PlainItem as PlainItemComponent,
} from '../components/PlainItem';
import { changeItemEditingMode } from '../actions/listActionCreators';
import { Dispatch } from 'redux';
import { IStoreState } from '../models/IStoreState';

const mapStateToProps = (state: IStoreState, ownProps: IPlainItemOwnProps): IPlainStateToProps => ({
  text: state.items.get(ownProps.id).text,
});

const mapDispatchToProps = (dispatch: Dispatch, ownProps: IPlainItemOwnProps): IPlainItemDispatchToProps => ({
  startEditing: () => dispatch(changeItemEditingMode(ownProps.id)),
});

export const PlainItem = connect(mapStateToProps, mapDispatchToProps)(PlainItemComponent);
