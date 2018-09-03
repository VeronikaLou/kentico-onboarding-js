import { connect } from 'react-redux';
import { List as ListComponent } from '../components/List';
import { getMemoizedIds } from '../utils/getMemoizedIds';

const mapStateToProps = state => ({
  items: getMemoizedIds(state.items.keySeq())
});

export const List = connect(mapStateToProps)(ListComponent);
