import { connect } from 'react-redux';
import { NewItem as NewItemComponent } from '../components/NewItem';
import { addItem } from '../actions/actionCreators';

const mapDispatchToProps = dispatch => ({
  addItem: text => dispatch(addItem(text))
});

export const NewItem = connect(null, mapDispatchToProps)(NewItemComponent);
