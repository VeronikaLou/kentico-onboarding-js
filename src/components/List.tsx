import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Item } from '../containers/Item';
import { NewItem } from '../containers/NewItem';
import { RingLoader } from 'react-spinners';
import { css } from 'emotion';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faRedo } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export interface IListStateProps {
  readonly items: Array<Uuid>;
  readonly isFetching: boolean;
  readonly fetchingItemsFail: boolean;
}

export interface IListDispatchProps {
  readonly initItems: () => void;
}

type IList = IListDispatchProps & IListStateProps;

const loader = css`
    margin: 0 auto;
 `;

export class List extends React.PureComponent<IList> {
  static displayName = 'List';

  static propTypes = {
    items: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
    fetchingItemsFail: PropTypes.bool.isRequired,
  };

  componentDidMount = () => {
    this.props.initItems();
  };

  render(): JSX.Element {
    library.add(faRedo);

    if (this.props.fetchingItemsFail)
      return (
        <h5
          className={'text-center text-danger font-weight-bold'}
        >Loading items failed
          <span
            onClick={this.props.initItems}
            className="btn"
          >
            <FontAwesomeIcon icon="redo" />
          </span>
        </h5>
      );

    else if (this.props.isFetching) {
      return (
        <RingLoader
          className={loader}
          size={150}
          color={'#007bff'}
        />);
    }

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
