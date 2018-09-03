import { connect } from 'react-redux';
import { List as ListComponent } from '../components/List';
import { getMemoizedItems } from '../utils/getMemoizedItems';
import { IStoreState } from '../utils/IStoreState';

const mapStateToProps = (state: IStoreState) => ({
  items: getMemoizedItems(state.items.valueSeq())
});

export const List = connect(mapStateToProps)(ListComponent);
