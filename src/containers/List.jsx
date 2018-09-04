import { connect } from 'react-redux';
import { List as ListComponent } from '../components/List';
import { getMemoizedItems } from '../utils/getMemoizedIds';

const mapStateToProps = state => ({
  items: getMemoizedItems(state.items.keySeq())
});

export const List = connect(mapStateToProps)(ListComponent);
