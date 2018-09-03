import { connect } from 'react-redux';
import { IListDispatchToProps, List as ListComponent } from '../components/List';
import { getMemoizedItems } from '../utils/getMemoizedItems';
import { IStoreState } from '../models/IStoreState';

const mapStateToProps = (state: IStoreState): IListDispatchToProps => ({
  items: getMemoizedItems(state.items.valueSeq()),
});

export const List = connect(mapStateToProps)(ListComponent);
