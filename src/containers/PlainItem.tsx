import { connect } from 'react-redux';
import { PlainItem as PlainItemComponent } from '../components/PlainItem';
import { changeItemEditingMode } from '../actions/listActionCreators';

const mapStateToProps = (state, ownProps) => ({
  text: state.items.get(ownProps.id).text,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  startEditing: () => dispatch(changeItemEditingMode(ownProps.id))
});

export const PlainItem = connect(mapStateToProps, mapDispatchToProps)(PlainItemComponent);
