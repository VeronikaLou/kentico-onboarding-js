import { Retry } from '../icons/retry';
import * as React from 'react';
import * as PropTypes from 'prop-types';

export interface ListErrorProps {
  readonly retry: () => void;
}

export const ListError: React.StatelessComponent<ListErrorProps> =
  ({retry}: ListErrorProps): JSX.Element => (
    <h5 className={'text-center text-danger font-weight-bold'}>
      Loading items failed
      <span
        onClick={retry}
        className="btn"
      >
        <Retry />
      </span>
    </h5>);

ListError.displayName = 'ListError';

ListError.propTypes = {
  retry: PropTypes.func.isRequired,
};
