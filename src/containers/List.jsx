import { connect } from 'react-redux';
import { List as ListComponent } from '../components/List';
import { getMemoizedItems } from '../utils/getMemoizedItems';

const mapStateToProps = state => ({
  items: getMemoizedItems(state.items.valueSeq())
});

export const List = connect(mapStateToProps)(ListComponent);
