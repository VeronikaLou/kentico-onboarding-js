import { connect } from 'react-redux';
import memoizee from 'memoizee';
import { List as ListComponent } from '../components/List';

const memoize = memoizee(x => x.toArray());

const mapStateToProps = state => ({
  items: memoize(state.items.valueSeq())
});

export const List = connect(mapStateToProps)(ListComponent);
