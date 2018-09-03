import { connect } from 'react-redux';
import { PlainItem as PlainItemComponent } from '../components/PlainItem';
import { changeItemEditingMode } from '../actions/listActionCreators';

const mapDispatchToProps = (dispatch, ownProps) => ({
  startEditing: () => dispatch(changeItemEditingMode(ownProps.item.id))
});

export const PlainItem = connect(null, mapDispatchToProps)(PlainItemComponent);
