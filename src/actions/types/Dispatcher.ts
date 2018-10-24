import { IStore } from '../../store/types/IStore';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';

export type Dispatch<TStore = IStore> = ThunkDispatch<TStore, undefined, Action>;
