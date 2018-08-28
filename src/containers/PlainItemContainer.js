import { connect } from 'react-redux';
import { PlainItem as PlainItemComponent } from '../components/PlainItem';
import { changeEditingMode } from '../actions/actionCreators';

const mapDispatchToProps = dispatch => ({
  startEditing: id => dispatch(changeEditingMode(id))
});

export const PlainItem = connect(null, mapDispatchToProps)(PlainItemComponent);
