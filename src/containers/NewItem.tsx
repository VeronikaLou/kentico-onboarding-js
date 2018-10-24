import { connect } from 'react-redux';
import {
  INewItemDispatchProps,
  NewItem as NewItemComponent,
} from '../components/NewItem';
import { fetchAddItem } from '../actions/fetchAddItem';

import { ComponentClass } from 'react';
import { Dispatch } from '../actions/types/Dispatcher';
import { IStore } from '../store/types/IStore';

const mapDispatchToProps = (dispatch: Dispatch<IStore>): INewItemDispatchProps => ({
  addItem: (text: string) => dispatch(fetchAddItem(text)),
});

export const NewItem: ComponentClass = connect(
  null,
  mapDispatchToProps,
)(NewItemComponent);
