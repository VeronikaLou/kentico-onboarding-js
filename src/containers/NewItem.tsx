import { connect } from 'react-redux';
import { NewItem as NewItemComponent } from '../components/NewItem';
import { addItem } from '../actions/listActionCreators';
import { Dispatch } from 'redux';

const mapDispatchToProps = (dispatch: Dispatch) => ({
  addItem: (text: string) => dispatch(addItem(text))
});

export const NewItem = connect(null, mapDispatchToProps)(NewItemComponent);
