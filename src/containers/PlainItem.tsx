import { connect } from 'react-redux';
import {
  IPlainItemDispatchProps,
  IPlainItemOwnProps,
  IPlainItemStateProps,
  PlainItem as PlainItemComponent,
} from '../components/PlainItem';
import { changeItemEditingMode } from '../actions/listActionCreators';
import { Dispatch } from 'redux';
import { IStore } from '../models/IStore';
import { IListAction } from '../actions/IListAction';
import { ComponentClass } from 'react';

const mapStateToProps = (state: IStore, ownProps: IPlainItemOwnProps): IPlainItemStateProps => ({
  text: state.items.get(ownProps.id).text,
});

const mapDispatchToProps = (
  dispatch: Dispatch<IListAction>,
  ownProps: IPlainItemOwnProps,
): IPlainItemDispatchProps => ({
  startEditing: () => dispatch(changeItemEditingMode(ownProps.id)),
});

export const PlainItem: ComponentClass<IPlainItemOwnProps> = connect(
  mapStateToProps,
  mapDispatchToProps,
)(PlainItemComponent);
