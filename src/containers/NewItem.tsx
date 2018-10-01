import { connect } from 'react-redux';
import {
  INewItemDispatchProps,
  NewItem as NewItemComponent,
} from '../components/NewItem';
import { addItem } from '../actions/listActionCreators';
import { IListAction } from '../actions/types/IListAction';
import { Dispatch } from 'redux';
import { ComponentClass } from 'react';

const mapDispatchToProps = (dispatch: Dispatch<IListAction>): INewItemDispatchProps => ({
  addItem: (id: Uuid, text: string) => dispatch(addItem(id, text)),
});

export const NewItem: ComponentClass = connect(
  null,
  mapDispatchToProps,
)(NewItemComponent);
