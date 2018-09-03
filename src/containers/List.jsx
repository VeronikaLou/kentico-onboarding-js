import { connect } from 'react-redux';
import { memoizee } from 'memoizee';
import { List as ListComponent } from '../components/List';

const mapStateToProps = state => ({
  items: state.items.valueSeq()
});

export const List = connect(mapStateToProps)(ListComponent);
