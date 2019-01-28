import { connect } from 'react-redux';
import {
  IListStateProps,
  List as ListComponent,
} from '../../components/list/List';
import { getMemoizedIds } from '../../utils/getMemoizedIds';
import { IStore } from '../../store/types/IStore';
import { ComponentClass } from 'react';

const mapStateToProps = (state: IStore): IListStateProps => ({
  items: getMemoizedIds(state.items.keySeq().toArray()),
});

export const List: ComponentClass = connect(mapStateToProps)(ListComponent);
