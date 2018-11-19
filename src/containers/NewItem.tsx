import { connect } from 'react-redux';
import {
  INewItemDispatchProps,
  NewItem as NewItemComponent,
} from '../components/NewItem';
import { ComponentClass } from 'react';
import { Dispatch } from '../actions/types/Dispatcher';
import { IStore } from '../store/types/IStore';
import { postItem } from '../actions/listActions';

const mapDispatchToProps = (dispatch: Dispatch<IStore>): INewItemDispatchProps => ({
  addItem: (text: string) => dispatch(postItem(text)),
});

export const NewItem: ComponentClass = connect(
  null,
  mapDispatchToProps,
)(NewItemComponent);
