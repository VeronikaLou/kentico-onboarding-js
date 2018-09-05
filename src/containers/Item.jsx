import { connect } from 'react-redux';
import { Item as ItemComponent } from '../components/Item';

const mapStateToProps = (state, ownProps) => ({
  isEdited: state.items.get(ownProps.id).isEdited,
});

export const Item = connect(mapStateToProps)(ItemComponent);
