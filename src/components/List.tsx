import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Item } from '../containers/Item';
import { NewItem } from '../containers/NewItem';
import { ListLoader } from './Loaders/ListLoader';
import { Retry } from '../icons/retry';

export interface IListStateProps {
  readonly items: Array<Uuid>;
  readonly isFetching: boolean;
  readonly fetchingItemsFail: boolean;
}

export interface IListDispatchProps {
  readonly initItems: () => void;
}

type ListProps = IListDispatchProps & IListStateProps;

export class List extends React.PureComponent<ListProps> {
  static displayName = 'List';

  static propTypes = {
    items: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
    fetchingItemsFail: PropTypes.bool.isRequired,
    initItems: PropTypes.func.isRequired,
  };

  componentDidMount = () => {
    this.props.initItems();
  };

  _showLoader = (): JSX.Element => <ListLoader />;

  _showError = (): JSX.Element => (
    <h5
      className={'text-center text-danger font-weight-bold'}
    >Loading items failed
      <span
        onClick={this.props.initItems}
        className="btn"
      >
        <Retry/>
      </span>
    </h5>
  );

  render(): JSX.Element {
    if (this.props.fetchingItemsFail)
      return this._showError();

    else if (this.props.isFetching)
      return this._showLoader();

    const renderItems: Array<JSX.Element> = this.props.items
      .map((id: Uuid, index: number) => (
        <Item
          key={id}
          id={id}
          index={index + 1}
        />
      ));

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
