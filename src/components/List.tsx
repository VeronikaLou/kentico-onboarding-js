import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Item } from '../containers/Item';
import { NewItem } from '../containers/NewItem';
import { ListItem } from '../models/ListItem';
import { OrderedMap } from 'immutable';
import { ILoadedItem } from '../models/ILoadedItem';
import {
  RingLoader,
} from 'react-spinners';
import { css } from 'emotion';


export interface IListStateProps {
  readonly items: Array<Uuid>;
  readonly isFetching: boolean;
}

export interface IListDispatchProps {
  readonly receiveItems: (items: OrderedMap<Uuid, ListItem>) => void;
  readonly requestItems: () => void;
}

type IList = IListDispatchProps & IListStateProps;

const loader = css`
    display: block;
    margin: 0 auto;
    border-color: red;
`;

export class List extends React.PureComponent<IList> {
  static displayName = 'List';

  static propTypes = {
    items: PropTypes.array.isRequired,
    receiveItems: PropTypes.func.isRequired,
  };

  componentDidMount = () => {
    this.props.requestItems();
    fetch('/v1/List')
      .then(response => response.json())
      .then((json: Array<ILoadedItem>) => json
        .map((item: ILoadedItem) => [item.id, new ListItem(item)]))
      .then(items => this.props.receiveItems(OrderedMap<Uuid, ListItem>(items)));
  };

  render(): JSX.Element {
    const renderItems: Array<JSX.Element> = this.props.items
      .map((id: Uuid, index: number) => (
        <Item
          key={id}
          id={id}
          index={index + 1}
        />
      ));

    if (this.props.isFetching)
      return <RingLoader className={loader} size={150} color={'#188DC0'}/>;

    return (
      <div className="row">
        <div className="col-sm-12 col-md-offset-2 col-md-8">
          <ul className="list-group">
            {renderItems}
            <NewItem />
          </ul>
        </div>
      </div>
    );
  }
}
