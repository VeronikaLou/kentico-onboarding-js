import { connect } from 'react-redux';
import { IPlainItemProps, PlainItem as PlainItemComponent } from '../components/PlainItem';
import { changeItemEditingMode } from '../actions/listActionCreators';
import { Dispatch } from 'redux';

const mapDispatchToProps = (dispatch: Dispatch, ownProps: IPlainItemProps) => ({
  startEditing: () => dispatch(changeItemEditingMode(ownProps.item.id))
});

export const PlainItem = connect(null, mapDispatchToProps)(PlainItemComponent);
