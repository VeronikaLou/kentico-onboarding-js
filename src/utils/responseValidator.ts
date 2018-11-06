import { IFetchedItem } from '../models/IFetchedItem';

export const validateGetResponse = (response: Response): Promise<Array<IFetchedItem>> => {
  if (response.status === 200 && response.ok)
    return response.json();
  return Promise.reject(Error('Invalid response.'));
};

const validateResponse = (expectedStatusCode: number) =>
  (response: Response): Promise<IFetchedItem> => {
    if (response.status === expectedStatusCode && response.ok)
      return response.json();
    return Promise.reject(Error('Invalid response.'));
  };

export const validateDeleteResponse = (response: Response): void => {
  if (!response.ok || response.status !== 204) {
    throw 'Invalid response.';
  }
};

export const validatePostResponse = validateResponse(201);
export const validatePutResponse = validateResponse(200);
