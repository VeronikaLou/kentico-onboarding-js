import { IFetchedItem } from '../models/IFetchedItem';
import { validateGetResponse, validatePostResponse } from './responseValidator';
import 'isomorphic-fetch';

describe('Validate get response', () => {
  it('should return json if status code is 200 and ok is true', () => {
    const response = new Response(
      '[]',
      {
        'status': 200,
        'statusText': 'OK',
      });
    const expectedResult: IFetchedItem[] = [];

    return validateGetResponse(response).then(result =>
      expect(result).toEqual(expectedResult));
  });

  it('should throw error if status code is not 200', () => {
    const response = new Response(
      '[]',
      {
        'status': 504,
        'statusText': 'OK',
      });

    return validateGetResponse(response)
      .catch(error => expect(error).toBeTruthy());
  });
});

describe('Validate post response', () => {
  it('should return json if status code is 201', () => {
    const validResponse = new Response(
      '{}',
      {
        'status': 201,
      });
    const expectedResult = {};

    return validatePostResponse(validResponse).then(result =>
      expect(result).toEqual(expectedResult));
  });

  it('should throw error if status code is not 201', () => {
    const invalidResponse = new Response(
      '{}',
      {
        'status': 504,
      });

    return validatePostResponse(invalidResponse).catch(
      error => expect(error).toBeTruthy(),
    );
  });
});
