import { connect } from 'react-redux';
import { IListStateToProps, List as ListComponent } from '../components/List';
import { getMemoizedItems } from '../utils/getMemoizedItems';
import { IStoreState } from '../models/IStoreState';

const mapStateToProps = (state: IStoreState): IListStateToProps => ({
  items: getMemoizedItems(state.items.keySeq()),
});

export const List = connect(mapStateToProps)(ListComponent);
