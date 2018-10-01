import { connect } from 'react-redux';
import {
  IListDispatchProps,
  IListStateProps,
  List as ListComponent,
} from '../components/List';
import { getMemoizedIds } from '../utils/getMemoizedIds';
import { IStore } from '../store/types/IStore';
import { ComponentClass } from 'react';
import { Dispatch } from 'redux';
import { IListAction } from '../actions/types/IListAction';
import { ListItem } from '../models/ListItem';
import {
  receiveItems,
  requestItems,
} from '../actions/listActionCreators';
import { OrderedMap } from 'immutable';

const mapStateToProps = (state: IStore): IListStateProps => ({
  items: getMemoizedIds(state.items.keySeq().toArray()),
  isFetching: state.isFetching,
});

const mapDispatchToProps = (dispatch: Dispatch<IListAction>): IListDispatchProps => ({
  receiveItems: (items: OrderedMap<Uuid, ListItem>) => dispatch(receiveItems(items)),
  requestItems: () => dispatch(requestItems()),
});

export const List: ComponentClass = connect(mapStateToProps, mapDispatchToProps)(ListComponent);
