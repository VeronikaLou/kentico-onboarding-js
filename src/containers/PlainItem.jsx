import { connect } from 'react-redux';
import { PlainItem as PlainItemComponent } from '../components/PlainItem';
import { changeEditingMode } from '../actions/listActionCreators';

const mapDispatchToProps = (dispatch, ownProps) => ({
  startEditing: () => dispatch(changeEditingMode(ownProps.item.id))
});

export const PlainItem = connect(null, mapDispatchToProps)(PlainItemComponent);
