import { connect } from 'react-redux';
import {
  IPlainItemDispatchProps,
  IPlainItemOwnProps,
  IPlainItemStateProps,
  PlainItem as PlainItemComponent,
} from '../../../components/list/items/PlainItem';
import { changeItemEditingMode } from '../../../actions/listActionCreators';
import { Dispatch } from 'redux';
import { IStore } from '../../../store/types/IStore';
import { IListAction } from '../../../actions/types/IListAction';
import { ComponentClass } from 'react';

const mapStateToProps = (state: IStore, ownProps: IPlainItemOwnProps): IPlainItemStateProps => ({
  item: state.items.get(ownProps.id),
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
