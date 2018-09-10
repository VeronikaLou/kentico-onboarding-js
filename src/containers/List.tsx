import { connect } from 'react-redux';
import { IListStateProps, List as ListComponent } from '../components/List';
import { getMemoizedIds } from '../utils/getMemoizedIds';
import { IStore } from '../models/IStore';
import { ComponentClass } from 'react';

const mapStateToProps = (state: IStore): IListStateProps => ({
  items: getMemoizedIds(state.items.keySeq()),
});

export const List: ComponentClass = connect(mapStateToProps)(ListComponent);
