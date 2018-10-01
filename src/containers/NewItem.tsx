import { connect } from 'react-redux';
import {
  INewItemDispatchProps,
  NewItem as NewItemComponent,
} from '../components/NewItem';
import { addItem } from '../actions/listActionCreators';
import { IListAction } from '../actions/types/IListAction';
import { Dispatch } from 'redux';
import { ComponentClass } from 'react';
import { IFetchedItem } from '../models/IFetchedItem';

const mapDispatchToProps = (dispatch: Dispatch<IListAction>): INewItemDispatchProps => ({
  addItem: (item: IFetchedItem) => dispatch(addItem(item)),
});

export const NewItem: ComponentClass = connect(
  null,
  mapDispatchToProps,
)(NewItemComponent);
