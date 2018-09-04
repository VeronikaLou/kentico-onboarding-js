import { connect } from 'react-redux';
import { IListStateToProps, List as ListComponent } from '../components/List';
import { getMemoizedIds } from '../utils/getMemoizedIds';
import { IStoreState } from '../models/IStoreState';

const mapStateToProps = (state: IStoreState): IListStateToProps => ({
  items: getMemoizedIds(state.items.keySeq()),
});

export const List = connect(mapStateToProps)(ListComponent);
