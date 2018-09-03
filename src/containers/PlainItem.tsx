import { connect } from 'react-redux';
import {
  IPlainItemDispatchToProps,
  IPlainItemOwnProps,
  PlainItem as PlainItemComponent,
} from '../components/PlainItem';
import { changeItemEditingMode } from '../actions/listActionCreators';
import { Dispatch } from 'redux';

const mapDispatchToProps = (dispatch: Dispatch, ownProps: IPlainItemOwnProps): IPlainItemDispatchToProps => ({
  startEditing: () => dispatch(changeItemEditingMode(ownProps.item.id)),
});

export const PlainItem = connect(null, mapDispatchToProps)(PlainItemComponent);
