import { IFetchedItem } from '../models/IFetchedItem';

export const validateGetResponse = (response: Response): Promise<Array<IFetchedItem>> => {
  if (response.status === 200 && response.ok)
    return response.json();
  return Promise.reject(new Error('Invalid response.'));
};
