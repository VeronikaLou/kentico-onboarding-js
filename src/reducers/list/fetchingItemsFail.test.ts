import { fetchingItemsFail } from './fetchingItemsFail';
import { itemsFetchFail, requestItems } from '../../actions/thunks/getItemsFactory';

describe('Fetching items fail', () => {
  const trueFalse = [true, false];

  trueFalse.forEach(initialState => {
    it('should return true when receive items fail', () => {
      const receiveFail = itemsFetchFail();

      const result = fetchingItemsFail(initialState, receiveFail);

      expect(result).toBeTruthy();
    });
  });

  trueFalse.forEach(initialState => {
    it('should return false when request items', () => {
      const request = requestItems();

      const result = fetchingItemsFail(initialState, request);

      expect(result).toBeFalsy();
    });
  });
});
